import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Wrench, Car, Bike, ArrowRight, Shield, Clock, 
  Search, MapPin, Calendar, CheckCircle, ArrowLeft,
  User, Hash, Globe, ToggleLeft, ToggleRight, Star
} from 'lucide-react';

// Components  
import { BookingServiceCard } from '@/components/ServiceCard';
import { ComboServiceCard } from '@/components/ComboServiceCard';
import { AddonChip } from '@/components/AddonChip';
import { BookingSummary } from '@/components/BookingSummary';
import { SlotPicker } from '@/components/SlotPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';

// Data & Store
import { BIKE_SERVICES, CAR_SERVICES, ADDONS, CITIES, ServiceData } from '@/data/bookingServices';
import { useBookingStore } from '@/store/booking';
import { apiRequest } from '@/lib/queryClient';
import { CustomerData } from '@/lib/validators';

export default function Services() {
  const {
    selectedVehicle,
    setSelectedVehicle,
    city,
    setCity,
    selectedServices,
    selectedAddons,
    toggleService,
    toggleAddon,
    searchQuery,
    setSearchQuery,
    showPriceRanges,
    setShowPriceRanges,
    currentStep,
    setCurrentStep,
    selectedSlot,
    customer,
    getAdjustedPrice,
    clearBooking
  } = useBookingStore();

  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();

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
  
  // Get current services based on vehicle type
  const currentServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;

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
        city,
        services: selectedServices,
        addons: selectedAddons,
        slot: selectedSlot,
        customer
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/15 via-transparent to-transparent"></div>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
            linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.05) 50%, transparent 51%)
          `,
          backgroundSize: '60px 60px, 120px 120px',
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 lg:pt-24">
        
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 mb-4 leading-tight">
              Book Doorstep
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400">
                Service
              </span>
            </h1>
            
            {/* Animated underline */}
            <motion.div
              className="h-1.5 w-48 bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 192, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Premium vehicle care with transparent pricing. 
            <span className="text-emerald-400 font-semibold"> Certified mechanics</span> at your doorstep.
          </motion.p>
          
          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-10 w-6 h-6 bg-emerald-500/30 rounded-full blur-sm"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 right-16 w-4 h-4 bg-blue-500/30 rounded-full blur-sm"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Enhanced Step Indicator */}
        {currentStep !== 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-8">
                {/* Step 1 */}
                <motion.div 
                  className={`flex items-center space-x-3 transition-all duration-500 ${
                    currentStep === 'services' ? 'text-emerald-400' : currentStep === 'details' ? 'text-white' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                      currentStep === 'services' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30' 
                        : currentStep === 'details' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30' 
                        : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold">1</span>
                  </motion.div>
                  <div>
                    <div className="font-semibold">Select Services</div>
                    <div className="text-xs text-gray-400">Choose your package</div>
                  </div>
                </motion.div>
                
                {/* Connector */}
                <motion.div 
                  className={`w-16 h-0.5 transition-all duration-500 ${
                    currentStep === 'details' ? 'bg-gradient-to-r from-emerald-500 to-blue-500' : 'bg-gray-600'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep === 'details' ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Step 2 */}
                <motion.div 
                  className={`flex items-center space-x-3 transition-all duration-500 ${
                    currentStep === 'details' ? 'text-blue-400' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                      currentStep === 'details' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' 
                        : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold">2</span>
                  </motion.div>
                  <div>
                    <div className="font-semibold">Book Details</div>
                    <div className="text-xs text-gray-400">Time & customer info</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'services' && (
          <>
            {/* Enhanced Vehicle Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center mb-10"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl">
                <div className="flex relative">
                  {/* Background slider */}
                  <motion.div
                    className={`absolute top-1 bottom-1 rounded-2xl transition-all duration-500 ${
                      selectedVehicle === 'bike' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                    }`}
                    initial={false}
                    animate={{
                      x: selectedVehicle === 'bike' ? 4 : '100%',
                      width: selectedVehicle === 'bike' ? '46%' : '46%'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  
                  <motion.button
                    onClick={() => setSelectedVehicle('bike')}
                    className={`relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 z-10 ${
                      selectedVehicle === 'bike'
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid="tab-bike"
                  >
                    <motion.div
                      animate={{ rotate: selectedVehicle === 'bike' ? [0, 10, 0] : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Bike className="w-6 h-6" />
                    </motion.div>
                    <span className="text-lg">Bike Services</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setSelectedVehicle('car')}
                    className={`relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 z-10 ${
                      selectedVehicle === 'car'
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid="tab-car"
                  >
                    <motion.div
                      animate={{ rotate: selectedVehicle === 'car' ? [0, 10, 0] : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Car className="w-6 h-6" />
                    </motion.div>
                    <span className="text-lg">Car Services</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white/8 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                  {/* City Selector */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {CITIES.map((cityOption) => (
                          <SelectItem key={cityOption.id} value={cityOption.id} className="text-white">
                            {cityOption.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Enhanced Search */}
                  <motion.div 
                    className="relative flex-1 max-w-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      animate={{ 
                        rotate: searchQuery ? [0, 360] : 0,
                        scale: searchQuery ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Search className="w-5 h-5 text-gray-400" />
                    </motion.div>
                    <Input
                      type="text"
                      placeholder={`Search ${selectedVehicle} services...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 focus:bg-white/15 transition-all duration-300 rounded-xl"
                      data-testid="search-services"
                    />
                  </motion.div>
                </div>

                {/* Price Toggle */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">Show ranges</span>
                  <Switch
                    checked={showPriceRanges}
                    onCheckedChange={setShowPriceRanges}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                  <span className="text-gray-300 text-sm">From price</span>
                </div>
              </div>
              
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Services Section */}
              <div className="lg:col-span-3">
                {/* Combo Services */}
                {comboServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    className="mb-16"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <motion.h2 
                          className="text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1, duration: 0.6 }}
                        >
                          {selectedVehicle === 'bike' ? 'Bike' : 'Car'} Service Packages
                        </motion.h2>
                        <motion.p 
                          className="text-gray-300 text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2, duration: 0.6 }}
                        >
                          Comprehensive care bundles with maximum savings
                        </motion.p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
                      >
                        <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-2 text-lg shadow-lg">
                          Best Value
                        </Badge>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                    >
                      <p className="text-emerald-300 text-sm">
                        <span className="font-medium">Exclusive:</span> Choose one complete package for maximum savings and comprehensive care.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {comboServices.map((service) => {
                        const isSelected = selectedServices.some(s => s.id === service.id);
                        const adjustedPrice = getAdjustedPrice(service.priceMin, service.priceMax);
                        
                        return (
                          <ComboServiceCard
                            key={service.id}
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => handleToggleService(service)}
                            adjustedPrice={adjustedPrice}
                            showRange={showPriceRanges}
                          />
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}

                {/* Enhanced Individual Services */}
                {individualServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mb-16"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          Individual Services
                        </h3>
                        <p className="text-gray-300 text-lg">
                          Precision services for specific maintenance needs
                        </p>
                      </div>
                      <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                        {individualServices.length} Services Available
                      </Badge>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8">
                      <p className="text-blue-300 text-sm">
                        <span className="font-medium">Mix & Match:</span> Individual services can be combined with each other for a custom maintenance solution.
                      </p>
                    </div>
                    
                    <motion.ul
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.2
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {individualServices.map((service) => {
                        const isSelected = selectedServices.some(s => s.id === service.id);
                        const adjustedPrice = getAdjustedPrice(service.priceMin, service.priceMax);
                        
                        return (
                          <BookingServiceCard
                            key={service.id}
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => handleToggleService(service)}
                            adjustedPrice={adjustedPrice}
                            showRange={showPriceRanges}
                          />
                        );
                      })}
                    </motion.ul>
                  </motion.div>
                )}

                {/* Enhanced Add-ons Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-3xl p-8 border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        Premium Add-ons
                      </h3>
                      <p className="text-gray-300 text-lg">
                        Extra services to enhance your vehicle care experience
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                        Optional
                      </Badge>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {ADDONS.map((addon) => {
                      const isSelected = selectedAddons.some(a => a.id === addon.id);
                      const adjustedPrice = getAdjustedPrice(addon.priceMin, addon.priceMax);
                      
                      return (
                        <AddonChip
                          key={addon.id}
                          addon={addon}
                          isSelected={isSelected}
                          onToggle={() => toggleAddon(addon)}
                          adjustedPrice={adjustedPrice}
                          showRange={showPriceRanges}
                        />
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <BookingSummary />
              </div>
            </div>
          </>
        )}

        {currentStep === 'details' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Back Button */}
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep('services')}
                  className="text-gray-300 hover:text-white mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Services
                </Button>

                {/* Customer Details Form */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <CustomerDetailsForm onSubmit={handleCustomerDetailsSubmit} />
                  </CardContent>
                </Card>

                {/* Slot Picker */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <SlotPicker />
                  </CardContent>
                </Card>

                {/* Final Submit */}
                {selectedSlot && customer.name && customer.phone && customer.address && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Button
                      onClick={handleBookingSubmit}
                      className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl"
                      data-testid="submit-booking"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Confirm Booking
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <BookingSummary />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-gray-300 mb-6">
                  We've received your request. A certified mechanic will contact you shortly to confirm the appointment.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-emerald-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Track your booking in real-time</span>
                  </div>
                  
                  <Button
                    onClick={() => {
                      clearBooking();
                      setCurrentStep('services');
                    }}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Book Another Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}