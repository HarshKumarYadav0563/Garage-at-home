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
import { EnhancedServiceCard } from '@/components/EnhancedServiceCard';
import { EnhancedSlotPicker } from '@/components/EnhancedSlotPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';
import { CartFab } from '@/components/CartFab';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/stores/useCartStore';

// Data & Store
import { BIKE_SERVICES, CAR_SERVICES, ServiceData } from '@/data/bookingServices';
import { useBookingStore } from '@/stores/useBookingStore';
import { apiRequest } from '@/lib/queryClient';
import { CustomerData } from '@/lib/validators';
import { BIKE_SERVICES as PRICING_BIKE, CAR_SERVICES as PRICING_CAR } from '@/lib/pricing';

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

// SEO
import { SEO, generateServiceSchema, generateLocalBusinessSchema } from '@/components/SEO';

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
    selectedCity,
    setSelectedCity,
    selectedServices,
    toggleService,
    searchQuery,
    setSearchQuery,
    currentStep,
    setCurrentStep,
    selectedSlot,
    customer,
    clearBooking,
    estimate,
    showSummary,
    setShowSummary
  } = useBookingStore();

  // Sync store with URL params
  useEffect(() => {
    if (params && isValidRoute(vehicleParam, cityParam)) {
      if (selectedVehicle !== vehicleParam) {
        setSelectedVehicle(vehicleParam);
      }
      if (selectedCity !== cityParam) {
        setSelectedCity(cityParam);
      }
    }
  }, [vehicleParam, cityParam, selectedVehicle, selectedCity, params]);

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
  const { toggleService: toggleCartService } = useCartStore();
  
  const handleToggleService = (serviceId: string) => {
    const isCurrentlySelected = selectedServices.includes(serviceId);
    toggleService(serviceId);
    
    // Also update cart store
    const service = currentServices.find(s => s.id === serviceId);
    if (service) {
      const cartService = {
        id: service.id,
        title: service.name,
        subtitle: service.subtitle,
        priceMin: typeof service.price === 'number' ? service.price : service.price?.min || 0,
        priceMax: typeof service.price === 'number' ? service.price : service.price?.max || 0,
        vehicle: currentVehicle,
        city: currentCity,
        type: service.type
      };
      toggleCartService(cartService);
      
      if (!isCurrentlySelected) {
        toast({
          title: "Service Added!",
          description: `${service.name} has been added to your cart.`,
          duration: 2000,
        });
      }
    }
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
  const currentServices = currentVehicle === 'bike' ? PRICING_BIKE : PRICING_CAR;
  const oldServices = currentVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;

  // Filter and categorize services
  const filteredServices = useMemo(() => {
    return currentServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentServices, searchQuery]);

  const comboServices = oldServices.filter(service => service.type === 'combo');
  const individualServices = filteredServices;

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
                  const isSelected = selectedServices.includes(service.id);
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + (index * 0.03) }}
                    >
                      <EnhancedServiceCard
                        service={service}
                        city={currentCity}
                        isSelected={isSelected}
                        onToggle={() => handleToggleService(service.id)}
                        data-testid={`service-card-${service.id}`}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        )}


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

        {/* City-Specific Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 mb-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
              
              {/* City-Specific Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {VEHICLE_DISPLAY_NAMES[currentVehicle]} Services in {CITY_DISPLAY_NAMES[currentCity]}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Professional doorstep vehicle maintenance and repair services across {CITY_DISPLAY_NAMES[currentCity]} with certified mechanics and transparent pricing.
                </p>
              </motion.div>

              {/* City-Specific Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                
                {/* Local Coverage Areas */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Coverage Areas in {CITY_DISPLAY_NAMES[currentCity]}</span>
                  </h3>
                  <div className="space-y-3">
                    {getCitySpecificAreas(currentCity).map((area, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + (index * 0.1) }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span>{area}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* City-Specific Benefits */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-sky-400 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Why Choose Us in {CITY_DISPLAY_NAMES[currentCity]}</span>
                  </h3>
                  <div className="space-y-3">
                    {getCitySpecificBenefits(currentCity, currentVehicle).map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + (index * 0.1) }}
                        className="flex items-start space-x-3 text-gray-300"
                      >
                        <CheckCircle className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* City-Specific Service Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-2xl p-8 border border-emerald-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {getCitySpecificTitle(currentCity, currentVehicle)}
                </h3>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {getCitySpecificDescription(currentCity, currentVehicle)}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Quick Response</h4>
                      <p className="text-sm text-gray-400">Within 30 minutes in {CITY_DISPLAY_NAMES[currentCity]}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-sky-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Certified Mechanics</h4>
                      <p className="text-sm text-gray-400">Trained professionals in {CITY_DISPLAY_NAMES[currentCity]}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-orange-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Quality Assured</h4>
                      <p className="text-sm text-gray-400">100% satisfaction guarantee in {CITY_DISPLAY_NAMES[currentCity]}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-center mt-12"
              >
                <p className="text-gray-300 mb-6">
                  Ready to book your {VEHICLE_DISPLAY_NAMES[currentVehicle]} service in {CITY_DISPLAY_NAMES[currentCity]}?
                </p>
                <Link href={`/services/${currentVehicle}/${currentCity}`}>
                  <Button 
                    className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setCurrentStep('services')}
                  >
                    Start Booking in {CITY_DISPLAY_NAMES[currentCity]}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Cart System */}
      <CartFab />
      <CartDrawer />
    </div>
  );
}

// Helper functions for city-specific content
function getCitySpecificAreas(city: NCRCity): string[] {
  const areaMap: Record<NCRCity, string[]> = {
    delhi: [
      'Central Delhi - CP, Khan Market, Lajpat Nagar',
      'South Delhi - GK, Saket, Vasant Vihar',
      'North Delhi - Civil Lines, GTB Nagar, Model Town',
      'East Delhi - Laxmi Nagar, Preet Vihar, Patparganj',
      'West Delhi - Rajouri Garden, Janakpuri, Dwarka'
    ],
    gurugram: [
      'Cyber City - DLF Phases, Udyog Vihar',
      'Golf Course Road - Sector 54, 56, 49',
      'New Gurugram - Sectors 70-115',
      'Old Gurugram - Civil Lines, Sadar Bazaar',
      'Sohna Road - Sectors 47-57'
    ],
    noida: [
      'Sector 18 - City Center, Atta Market',
      'Greater Noida - Pari Chowk, Knowledge Park',
      'Noida Extension - Gaur City, Supertech',
      'Sectors 62-78 - IT Hub, Corporate Area',
      'Film City - Sectors 16A, 16B'
    ],
    ghaziabad: [
      'Indirapuram - Habitat Centre, Shipra Mall',
      'Vaishali - Metro Station Area',
      'Crossings Republik - Residential Township',
      'Kaushambi - Metro Connected Areas',
      'Raj Nagar Extension - New Development'
    ],
    faridabad: [
      'Sector 16-20 - Main Market Areas',
      'New Industrial Township (NIT)',
      'Greater Faridabad - Neharpar',
      'Ballabhgarh - Heritage City',
      'Sectors 81-89 - Residential Areas'
    ]
  };
  
  return areaMap[city] || [];
}

function getCitySpecificBenefits(city: NCRCity, vehicle: VehicleType): string[] {
  const benefits: Record<NCRCity, Record<VehicleType, string[]>> = {
    delhi: {
      bike: [
        'Specialized in Delhi traffic conditions and bike wear patterns',
        'Quick parts availability from Karol Bagh auto market',
        'Metro-accessible service locations across all zones',
        'Pollution check and certification services included'
      ],
      car: [
        'Expert in Delhi\'s road conditions and car maintenance needs',
        'Rapid parts sourcing from authorized dealers',
        'Comprehensive AC servicing for Delhi heat',
        'PUC emission testing and renewal services'
      ]
    },
    gurugram: {
      bike: [
        'Corporate area specialists with office parking services',
        'High-end bike servicing for Cyber City professionals',
        'Express services during lunch hours',
        'Insurance claim assistance and documentation'
      ],
      car: [
        'Premium car servicing for corporate executives',
        'Luxury car specialists in Golf Course Road area',
        'Same-day services for business professionals',
        'Corporate tie-ups and bulk service discounts'
      ]
    },
    noida: {
      bike: [
        'Tech park specialist mechanics familiar with daily commute stress',
        'Student-friendly pricing for nearby colleges',
        'Metro station pickup and drop services',
        'Monsoon-specific servicing for sector roads'
      ],
      car: [
        'IT professional-friendly flexible timing',
        'Apartment complex bulk service programs',
        'Express Highway specialist maintenance',
        '24/7 emergency services across sectors'
      ]
    },
    ghaziabad: {
      bike: [
        'NH-24 specialist maintenance for highway commuters',
        'Budget-friendly services for residential areas',
        'Monsoon and winter-specific bike care',
        'Local spare parts dealers network'
      ],
      car: [
        'Family car maintenance specialists',
        'Affordable pricing for residential communities',
        'School zone and family area services',
        'Weekend and holiday special availability'
      ]
    },
    faridabad: {
      bike: [
        'Industrial area specialist for heavy-duty bikes',
        'Worker-friendly affordable pricing',
        'Early morning and late evening service slots',
        'Mathura Road specialist maintenance'
      ],
      car: [
        'Industrial belt car servicing expertise',
        'Heavy traffic condition specialists',
        'Family-oriented affordable packages',
        'Industrial pollution-specific car care'
      ]
    }
  };
  
  return benefits[city]?.[vehicle] || [];
}

function getCitySpecificTitle(city: NCRCity, vehicle: VehicleType): string {
  const titles: Record<NCRCity, Record<VehicleType, string>> = {
    delhi: {
      bike: 'Delhi\'s Premier Doorstep Bike Service - From Red Fort to Dwarka',
      car: 'Capital\'s Most Trusted Car Service - Serving All Delhi NCT Areas'
    },
    gurugram: {
      bike: 'Millennium City\'s Professional Bike Care - Cyber City to Golf Course Road',
      car: 'Gurugram\'s Executive Car Service - Premium Care for Corporate Professionals'
    },
    noida: {
      bike: 'Planned City\'s Smart Bike Maintenance - Sector-wise Professional Service',
      car: 'Noida\'s Tech-Savvy Car Care - Greater Noida to Film City Coverage'
    },
    ghaziabad: {
      bike: 'Gateway City\'s Reliable Bike Service - NH-24 Corridor Specialists',
      car: 'Ghaziabad\'s Family Car Care - Residential Area Focused Services'
    },
    faridabad: {
      bike: 'Industrial City\'s Tough Bike Service - Built for Hard-working Commuters',
      car: 'Faridabad\'s Affordable Car Care - Quality Service for Every Family'
    }
  };
  
  return titles[city]?.[vehicle] || `${CITY_DISPLAY_NAMES[city]} ${VEHICLE_DISPLAY_NAMES[vehicle]} Service`;
}

function getCitySpecificDescription(city: NCRCity, vehicle: VehicleType): string {
  const descriptions: Record<NCRCity, Record<VehicleType, string>> = {
    delhi: {
      bike: `Experience Delhi's most comprehensive doorstep bike service covering all zones from Chandni Chowk to Dwarka. Our certified mechanics understand the unique challenges of Delhi's diverse traffic conditions, from narrow Old Delhi lanes to wide South Delhi roads. We provide specialized services including pollution check certificates, monsoon preparation, and winter bike care. With parts sourced from Karol Bagh's authentic markets and same-day service guarantee across all metro-connected areas, we ensure your bike runs smoothly through Delhi's bustling streets.`,
      car: `Delhi's most trusted doorstep car service, serving from India Gate to Rohini with specialized care for the capital's unique driving conditions. Our expert technicians are trained to handle everything from compact cars navigating Old Delhi's narrow streets to luxury vehicles cruising on the Southern Ridge. We offer comprehensive AC servicing for Delhi summers, specialized monsoon car care, and pollution control services including PUC certification. With authentic parts sourcing and 24/7 emergency support, we keep Delhi moving.`
    },
    gurugram: {
      bike: `Gurugram's premium doorstep bike service designed for the Millennium City's fast-paced lifestyle. From Cyber City's corporate complexes to Golf Course Road's upscale societies, our professional mechanics provide executive-grade bike maintenance. We specialize in high-performance bikes and scooters used by IT professionals for daily commuting. Our express lunch-hour services, corporate tie-ups, and premium parts ensure your bike matches your professional standards.`,
      car: `Millennium City's elite car service catering to Gurugram's corporate culture and luxury lifestyle. Our premium mechanics specialize in high-end vehicles, from German sedans in DLF phases to SUVs on Sohna Road. We understand the needs of busy executives and offer flexible timing, corporate billing, and luxury car specialists. With same-day service guarantee and premium parts sourcing, we maintain your vehicle's excellence in India's corporate capital.`
    },
    noida: {
      bike: `Noida's tech-forward doorstep bike service designed for the planned city's systematic approach. Our services cover all sectors from the bustling Sector 18 market to the expanding Greater Noida areas. We specialize in student-friendly pricing, IT professional flexible hours, and tech park express services. Our mechanics understand the specific needs of expressway commuting and provide monsoon-specific care for Noida's unique sector road system.`,
      car: `Planned City's most systematic car service approach, covering Noida's well-organized sectors with precision. From IT hubs in sectors 62-78 to residential complexes across Greater Noida, our service network ensures comprehensive coverage. We offer apartment complex bulk programs, expressway specialist maintenance, and 24/7 emergency support. Our tech-savvy approach includes digital service tracking and IT professional-friendly flexible scheduling.`
    },
    ghaziabad: {
      bike: `Ghaziabad's most reliable doorstep bike service, built tough for the Gateway City's hardworking spirit. Our mechanics specialize in NH-24 corridor conditions and understand the needs of daily Delhi commuters. We provide budget-friendly services without compromising quality, early morning slots for working professionals, and specialized care for bikes handling heavy traffic and industrial area conditions.`,
      car: `Gateway City's family-focused car service, understanding Ghaziabad's residential community needs. Our affordable yet quality service covers family cars, daily commuter vehicles, and weekend trip preparations. We specialize in industrial area conditions, heavy traffic maintenance, and family-budget-friendly packages. Our service areas cover established residential sectors and expanding new developments.`
    },
    faridabad: {
      bike: `Faridabad's industrial-strength bike service, designed for the hardworking commuter spirit of this industrial city. Our robust service approach covers heavy-duty bikes, industrial area conditions, and budget-conscious maintenance. We provide early morning and late evening slots for industrial workers, affordable pricing with quality assurance, and specialized care for bikes handling Mathura Road traffic and industrial pollution.`,
      car: `Industrial City's most affordable yet reliable car service, focusing on family values and budget-friendly excellence. Our service covers family cars dealing with industrial pollution, heavy traffic conditions, and daily wear from industrial belt commuting. We offer weekend availability, family package discounts, and specialized care for cars in industrial environments while maintaining affordability.`
    }
  };
  
  return descriptions[city]?.[vehicle] || `Professional ${VEHICLE_DISPLAY_NAMES[vehicle]} service in ${CITY_DISPLAY_NAMES[city]} with certified mechanics and quality assurance.`;
}