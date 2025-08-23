import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef, useEffect, useState } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Wrench, Car, Bike, ArrowRight, Shield, Clock, 
  Search, MapPin, Calendar, CheckCircle, ArrowLeft,
  User, Hash, Globe, ToggleLeft, ToggleRight, Star,
  ShoppingCart, X, ChevronLeft, ChevronRight
} from 'lucide-react';

// Components  
import { BookingServiceCard } from '@/components/ServiceCard';
import { ComboServiceCard } from '@/components/ComboServiceCard';
import { BookingSummary } from '@/components/BookingSummary';
import { SlotPicker } from '@/components/SlotPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';

// Data & Store
import { BIKE_SERVICES, CAR_SERVICES, ServiceData } from '@/data/bookingServices';
import { useBookingStore } from '@/store/booking';
import { apiRequest } from '@/lib/queryClient';
import { CustomerData } from '@/lib/validators';

// City-aware routing
import { 
  NCR_CITIES, 
  VEHICLES, 
  CITY_DISPLAY_NAMES, 
  VEHICLE_DISPLAY_NAMES, 
  isValidRoute, 
  generateSEOMetadata, 
  DEFAULT_CITY,
  type NCRCity,
  type VehicleType
} from '@shared/config/serviceAreas';

export default function ServicesDynamic() {
  const [, params] = useRoute('/services/:vehicle/:city');
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Extract and validate params
  const vehicleParam = params?.vehicle as VehicleType;
  const cityParam = params?.city as NCRCity;
  
  // Redirect if invalid route
  useEffect(() => {
    if (params && (!isValidRoute(vehicleParam, cityParam))) {
      setLocation('/services');
      return;
    }
  }, [params, vehicleParam, cityParam, setLocation]);

  // Fallback to defaults if no params
  const currentVehicle = vehicleParam || 'bike';
  const currentCity = cityParam || DEFAULT_CITY;

  // Set SEO metadata
  useEffect(() => {
    if (params && isValidRoute(vehicleParam, cityParam)) {
      const metadata = generateSEOMetadata(vehicleParam, cityParam);
      document.title = metadata.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', metadata.description);
    }
  }, [params, vehicleParam, cityParam]);

  const {
    selectedVehicle,
    setSelectedVehicle,
    selectedServices,
    toggleService,
    searchQuery,
    setSearchQuery,
    currentStep,
    setCurrentStep,
    selectedSlot,
    customer,
    clearBooking,
    getSubtotal,
    showSummary,
    setShowSummary
  } = useBookingStore();

  // Sync store with URL params
  useEffect(() => {
    if (params && isValidRoute(vehicleParam, cityParam)) {
      setSelectedVehicle(vehicleParam);
    }
  }, [vehicleParam, setSelectedVehicle, params]);

  const shouldReduceMotion = useReducedMotion();
  
  // Scroll enhancements
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Smooth scroll progress with spring
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const orbsY = useTransform(scrollY, [0, 1000], [0, -200]);

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Enhanced toggle service with user feedback
  const handleToggleService = (service: ServiceData) => {
    const isCurrentlySelected = selectedServices.some(s => s.id === service.id);
    const hasComboSelected = selectedServices.some(s => s.type === 'combo');
    const hasIndividualSelected = selectedServices.some(s => s.type === 'individual' || !s.type);
    
    if (!isCurrentlySelected) {
      if (service.type === 'combo') {
        if (hasComboSelected) {
          const currentCombo = selectedServices.find(s => s.type === 'combo');
          toast({
            title: 'Service Package Replaced',
            description: `${currentCombo?.name} has been replaced with ${service.name}. Only one package can be selected.`,
            duration: 3000,
          });
        } else if (hasIndividualSelected) {
          const individualCount = selectedServices.filter(s => s.type === 'individual' || !s.type).length;
          toast({
            title: 'Individual Services Cleared',
            description: `${individualCount} individual service${individualCount > 1 ? 's' : ''} cleared. Packages include everything needed.`,
            duration: 3000,
          });
        }
      } else if (hasComboSelected) {
        const currentCombo = selectedServices.find(s => s.type === 'combo');
        toast({
          title: 'Package Replaced with Individual Services',
          description: `${currentCombo?.name} package cleared. You can now select individual services.`,
          duration: 3000,
        });
      }
    }
    
    toggleService(service);
  };

  // Handle vehicle change
  const handleVehicleChange = (newVehicle: VehicleType) => {
    setLocation(`/services/${newVehicle}/${currentCity}`);
  };

  // Handle city change
  const handleCityChange = (newCity: NCRCity) => {
    setLocation(`/services/${currentVehicle}/${newCity}`);
  };
  
  // Get current services based on vehicle type
  const currentServices = currentVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;

  // Filter and categorize services
  const filteredServices = useMemo(() => {
    return currentServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentServices, searchQuery]);

  const comboServices = filteredServices.filter(service => service.type === 'combo');
  const individualServices = filteredServices.filter(service => service.type === 'individual' || !service.type);

  // Handle customer details form submission
  const handleCustomerDetailsSubmit = (data: CustomerData) => {
    setCurrentStep('details');
  };

  // Handle final booking submission
  const handleBookingSubmit = async () => {
    if (!selectedSlot || selectedServices.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select services and a time slot",
        variant: "destructive"
      });
      return;
    }

    try {
      const bookingData = {
        vehicle: selectedVehicle,
        services: selectedServices,
        slot: selectedSlot,
        customer,
        city: currentCity
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      }).then(res => res.json());

      toast({
        title: "Booking Confirmed!",
        description: `Your booking ${response.trackingId} has been received. We'll contact you shortly.`,
      });

      setCurrentStep('confirmation');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };

  if (!params) {
    // Redirect to default route
    setLocation('/services/bike/delhi');
    return null;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Enhanced Background Effects with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {/* Dynamic gradient overlays */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/35 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-emerald-400">
              {VEHICLE_DISPLAY_NAMES[currentVehicle]} • {CITY_DISPLAY_NAMES[currentCity]}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            🚗 Doorstep {VEHICLE_DISPLAY_NAMES[currentVehicle]} Services in {CITY_DISPLAY_NAMES[currentCity]}
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl">
            Delhi-NCR's premium doorstep vehicle servicing. Certified mechanics, transparent pricing, fast service.
          </p>
        </motion.div>

        {/* City & Vehicle Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            
            {/* Vehicle Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex bg-white/10 rounded-lg p-1">
                <motion.button
                  onClick={() => handleVehicleChange('bike')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentVehicle === 'bike'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bike className="w-4 h-4" />
                  <span>Bike</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleVehicleChange('car')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentVehicle === 'car'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Car className="w-4 h-4" />
                  <span>Car</span>
                </motion.button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md ml-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${currentVehicle} services...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-lg h-9"
                />
              </div>
            </div>

            {/* City Selector Tabs */}
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Service Area:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {NCR_CITIES.map((city) => (
                <motion.button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    currentCity === city
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {CITY_DISPLAY_NAMES[city]}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        {currentStep === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4 md:mt-6"
          >
            {/* Combo Services */}
            {comboServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <motion.h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {VEHICLE_DISPLAY_NAMES[currentVehicle]} Service Packages
                    </motion.h2>
                    <motion.p className="text-gray-300 text-sm md:text-base">
                      Comprehensive care bundles with maximum savings • Available in {CITY_DISPLAY_NAMES[currentCity]}
                    </motion.p>
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-3 py-1.5">
                    Best Value
                  </Badge>
                </div>
                
                {/* Mobile: Horizontal scroll */}
                <div className="lg:hidden">
                  <motion.div
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-1 scrollbar-hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.05 }}
                  >
                    {comboServices.map((service, index) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      
                      return (
                        <motion.div
                          key={service.id}
                          className="min-w-[300px] max-w-[300px] snap-start"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (index * 0.05) }}
                        >
                          <ComboServiceCard
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => handleToggleService(service)}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden lg:block">
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.1 }}
                  >
                    {comboServices.map((service, index) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + (index * 0.1) }}
                        >
                          <ComboServiceCard
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => handleToggleService(service)}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Individual Services */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-6"
            >
              <motion.div className="flex items-center justify-between mb-4">
                <div>
                  <motion.h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Individual {VEHICLE_DISPLAY_NAMES[currentVehicle]} Services
                  </motion.h2>
                  <motion.p className="text-gray-300 text-sm md:text-base">
                    Choose specific services as per your {currentVehicle}'s needs • {CITY_DISPLAY_NAMES[currentCity]}
                  </motion.p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, staggerChildren: 0.03 }}
              >
                {individualServices.map((service, index) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + (index * 0.03) }}
                    >
                      <BookingServiceCard
                        service={service}
                        isSelected={isSelected}
                        onToggle={() => handleToggleService(service)}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Booking Summary */}
        <BookingSummary />

        {/* Time Slot Selection */}
        {currentStep === 'details' && !selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <SlotPicker />
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('services')}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
              <Button
                onClick={() => selectedSlot && setCurrentStep('details')}
                disabled={!selectedSlot}
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Customer Details Form */}
        {currentStep === 'details' && selectedSlot && !customer?.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <CustomerDetailsForm
              onSubmit={handleCustomerDetailsSubmit}
            />
          </motion.div>
        )}

        {/* Final Review & Submit */}
        {currentStep === 'details' && selectedSlot && customer?.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Review Your Booking</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Service Location</h3>
                    <p className="text-gray-300">{CITY_DISPLAY_NAMES[currentCity]}, Delhi-NCR</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Vehicle & Services</h3>
                    <p className="text-gray-300 mb-2">{VEHICLE_DISPLAY_NAMES[currentVehicle]} Services</p>
                    <div className="space-y-1">
                      {selectedServices.map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-400">{service.name}</span>
                          <span className="text-white">₹{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSlot && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Appointment</h3>
                      <p className="text-gray-300">
                        {selectedSlot.date} at {selectedSlot.time}
                      </p>
                    </div>
                  )}

                  {customer && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Contact Details</h3>
                      <p className="text-gray-300">{customer.name}</p>
                      <p className="text-gray-300">{customer.phone}</p>
                      <p className="text-gray-300">{customer.address}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-white">Total Amount</span>
                      <span className="text-emerald-400">₹{getSubtotal()}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('services')}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleBookingSubmit}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
                    >
                      Confirm Booking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-8">
              Your {VEHICLE_DISPLAY_NAMES[currentVehicle]} service in {CITY_DISPLAY_NAMES[currentCity]} has been scheduled. 
              Our mechanic will arrive at your location at the scheduled time.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  clearBooking();
                  setCurrentStep('services');
                }}
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
              >
                Book Another Service
              </Button>
              <Link href="/track">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Track Order
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}