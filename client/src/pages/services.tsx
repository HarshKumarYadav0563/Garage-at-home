import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMemo, useRef, useEffect } from 'react';
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
  User, Hash, Globe, ToggleLeft, ToggleRight, Star,
  ShoppingCart, X
} from 'lucide-react';

// Components  
import { BookingServiceCard } from '@/components/ServiceCard';
import { ComboServiceCard } from '@/components/ComboServiceCard';
import { BookingSummary } from '@/components/BookingSummary';
import { SlotPicker } from '@/components/SlotPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';

// Data & Store
import { BIKE_SERVICES, CAR_SERVICES, ServiceData } from '@/data/bookingServices';
import { getBrandsForVehicleType, getModelsForBrand } from '@/data/vehicleData';
import { useBookingStore } from '@/store/booking';
import { apiRequest } from '@/lib/queryClient';
import { CustomerData } from '@/lib/validators';

export default function Services() {
  const {
    selectedVehicle,
    setSelectedVehicle,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedServices,
    selectedAddons,
    toggleService,
    searchQuery,
    setSearchQuery,
    currentStep,
    setCurrentStep,
    customer,
    address,
    clearBooking,
    getSubtotal,
    showSummary,
    setShowSummary
  } = useBookingStore();

  const shouldReduceMotion = useReducedMotion();
  const { toast } = useToast();
  
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
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  // Add smooth scroll behavior to the entire page
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

  // Handle final booking submission (legacy)
  const handleBookingSubmit = async () => {
    if (selectedServices.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select services",
        variant: "destructive"
      });
      return;
    }

    try {
      const bookingData = {
        vehicle: selectedVehicle,
        services: selectedServices,
        addons: selectedAddons,
        customer,
        address
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

      setCurrentStep('tracking');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };


  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Floating Scroll Indicator */}
      <motion.div
        className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-1 h-20 sm:h-32 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"
          whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-emerald-400 to-sky-400 rounded-full"
            style={{ 
              height: smoothProgress,
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }}
          />
        </motion.div>
      </motion.div>
      
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
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/25 via-transparent to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Enhanced floating orbs with parallax and scroll effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-sky-500/30 rounded-full blur-3xl"
          style={{ 
            y: orbsY,
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
          }}
          animate={{
            scale: [1, 1.4, 0.9, 1.2, 1],
            opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
            x: [0, 120, -40, 80, 0],
            y: [0, -60, 40, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl"
          style={{ 
            y: useTransform(orbsY, [0, -200], [0, 150]),
            x: useTransform(scrollYProgress, [0, 1], [0, -100])
          }}
          animate={{
            scale: [1.2, 0.8, 1.3, 1],
            opacity: [0.5, 0.8, 0.3, 0.5],
            x: [0, -100, 60, 0],
            y: [0, 80, -40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl"
          style={{ 
            y: useTransform(orbsY, [0, -200], [0, -80]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.2])
          }}
          animate={{
            scale: [0.8, 1.5, 0.9, 1.1, 0.8],
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
            x: [0, -150, 100, -50, 0],
            y: [0, 100, -80, 40, 0],
            rotate: [0, 270, 540]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated flowing lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
            style={{
              top: `${15 + i * 12}%`,
              width: '200%',
              left: '-50%'
            }}
            animate={{
              x: ['-100%', '50%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Enhanced Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(16, 185, 129, 0.2) 1px, transparent 0),
            linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.05) 50%, transparent 51%)
          `,
          backgroundSize: '60px 60px, 90px 90px, 120px 120px',
        }}
      />
      
      {/* Parallax Hexagon Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: ['0% 0%', '50% 50%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Sticky Mobile Controls */}
      <motion.div 
        className="lg:hidden sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Vehicle Toggle */}
            <div className="flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setSelectedVehicle('bike')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedVehicle === 'bike'
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4 inline mr-1" />
                Bike
              </button>
              <button
                onClick={() => setSelectedVehicle('car')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedVehicle === 'car'
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4 inline mr-1" />
                Car
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search ${selectedVehicle} services...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-lg h-10"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4">
        

        {/* Vehicle Selector & Search - Desktop Inline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="hidden lg:block mb-3"
        >
          <div className="bg-white/8 backdrop-blur-xl border border-white/20 rounded-xl p-2">
            <div className="flex justify-between items-center gap-3">
              {/* Vehicle Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <motion.button
                  onClick={() => setSelectedVehicle('bike')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedVehicle === 'bike'
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
                  onClick={() => setSelectedVehicle('car')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedVehicle === 'car'
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

              {/* Brand Selection */}
              <div className="relative">
                <Select 
                  value={selectedBrand} 
                  onValueChange={(value) => {
                    setSelectedBrand(value);
                  }}
                >
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white h-9">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {getBrandsForVehicleType(selectedVehicle).map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Selection */}
              <div className="relative">
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel}
                  disabled={!selectedBrand}
                >
                  <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white h-9">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {getModelsForBrand(selectedBrand, selectedVehicle).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${selectedVehicle} services...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-lg h-9"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section - Immediately Visible Above Fold */}
        {currentStep === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-2 md:mt-3"
          >
            {/* Combo Services */}
            {comboServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <motion.h2 
                      className="text-xl md:text-2xl font-bold text-white mb-1"
                    >
                      {selectedVehicle === 'bike' ? 'Bike' : 'Car'} Service Packages
                    </motion.h2>
                    <motion.p 
                      className="text-gray-300 text-sm md:text-base"
                    >
                      Comprehensive care bundles with maximum savings
                    </motion.p>
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-3 py-1.5">
                    Best Value
                  </Badge>
                </div>
                
                
                {/* Mobile: Horizontal scroll with snap */}
                <div className="lg:hidden">
                  <motion.div
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-1 px-1 scrollbar-hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.05 }}
                  >
                    {comboServices.map((service, index) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      
                      return (
                        <motion.div
                          key={service.id}
                          className="min-w-[280px] max-w-[280px] snap-start"
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

                {/* Desktop: Grid layout for side-by-side comparison */}
                <div className="hidden lg:block">
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4"
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
              className="mb-4"
            >
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Individual Services
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    Precision services for specific maintenance needs
                  </p>
                </div>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 self-start sm:self-auto text-xs">
                  {individualServices.length} Services Available
                </Badge>
              </motion.div>
              
              <motion.div 
                className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 mb-3"
              >
                <p className="text-blue-300 text-sm">
                  <span className="font-medium">Mix & Match:</span> Individual services can be combined. Orders below ₹999 include ₹99 doorstep charge.
                </p>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.03 }}
              >
                {individualServices.map((service, index) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (index * 0.03) }}
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

        {/* Desktop Floating Cart */}
        {currentStep === 'services' && selectedServices.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden lg:block fixed right-6 top-6 w-80 z-50"
          >
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40">
              <BookingSummary />
            </div>
          </motion.div>
        )}

        {/* Mobile Bottom Summary */}
        {currentStep === 'services' && selectedServices.length > 0 && showSummary && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-xl">
            <BookingSummary isMobile={true} className="max-h-[60vh] overflow-y-auto" />
          </div>
        )}


        {/* Legacy details form (keeping for backward compatibility) */}
        {false && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="max-w-4xl mx-auto space-y-8">
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
                {customer.name && customer.phone && address.text && (
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
          </motion.div>
        )}

        {currentStep === 'tracking' && (
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