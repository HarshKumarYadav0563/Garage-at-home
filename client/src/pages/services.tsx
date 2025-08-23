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
import { AddonChip } from '@/components/AddonChip';
import { BookingSummary } from '@/components/BookingSummary';
import { SlotPicker } from '@/components/SlotPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';

// Data & Store
import { BIKE_SERVICES, CAR_SERVICES, ADDONS, ServiceData } from '@/data/bookingServices';
import { useBookingStore } from '@/store/booking';
import { apiRequest } from '@/lib/queryClient';
import { CustomerData } from '@/lib/validators';

export default function Services() {
  const {
    selectedVehicle,
    setSelectedVehicle,
    selectedServices,
    selectedAddons,
    toggleService,
    toggleAddon,
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
      
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 pt-16 sm:pt-20 lg:pt-24">
        
        {/* Enhanced Hero Section with Parallax - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: heroY }}
          className="text-center mb-6 sm:mb-8 px-2 sm:px-4"
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Book Doorstep{' '}
            </motion.span>
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Service
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Premium vehicle care with{' '}
            <motion.span 
              className="text-emerald-400 font-semibold"
              animate={{
                textShadow: [
                  '0 0 0px rgba(16, 185, 129, 0)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 0px rgba(16, 185, 129, 0)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              certified mechanics
            </motion.span>{' '}
            at your doorstep
          </motion.p>
          
          {/* Floating service badges - Mobile Responsive */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {['24/7 Available', 'Quality Assured', 'Doorstep Service'].map((badge, index) => (
              <motion.div
                key={badge}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Service Selection - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 sm:mb-8 mx-2 sm:mx-4 lg:mx-0"
        >
          <motion.div 
            className="bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.005,
              borderColor: 'rgba(16, 185, 129, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent, rgba(59, 130, 246, 0.1), transparent)',
                backgroundSize: '400% 400%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Enhanced Vehicle Selection - Mobile Responsive */}
            <div className="relative flex flex-col items-center space-y-4 sm:space-y-6 mb-6 sm:mb-8 z-10">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Choose Your Vehicle
              </motion.h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
                <motion.button
                  onClick={() => setSelectedVehicle('bike')}
                  className={`group relative overflow-hidden flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 w-full sm:w-auto ${
                    selectedVehicle === 'bike'
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/30'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-emerald-500/50'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    boxShadow: selectedVehicle === 'bike' 
                      ? '0 20px 40px rgba(16, 185, 129, 0.4)' 
                      : '0 10px 20px rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="tab-bike"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0"
                    animate={{
                      x: selectedVehicle === 'bike' ? ['-100%', '100%'] : 0,
                      opacity: selectedVehicle === 'bike' ? [0, 1, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: selectedVehicle === 'bike' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: selectedVehicle === 'bike' ? [0, 15, -15, 0] : 0,
                      scale: selectedVehicle === 'bike' ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      duration: selectedVehicle === 'bike' ? 2 : 0.3,
                      repeat: selectedVehicle === 'bike' ? Infinity : 0
                    }}
                  >
                    <Bike className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 flex-shrink-0" />
                  </motion.div>
                  <div className="text-left sm:text-left text-center relative z-10 min-w-0">
                    <span className="font-semibold text-base sm:text-lg block">Bike Services</span>
                    <p className="text-xs sm:text-sm opacity-80 hidden sm:block">2-Wheeler Maintenance</p>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedVehicle === 'bike' && (
                    <motion.div
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    </motion.div>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={() => setSelectedVehicle('car')}
                  className={`group relative overflow-hidden flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 w-full sm:w-auto ${
                    selectedVehicle === 'car'
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/30'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-emerald-500/50'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    boxShadow: selectedVehicle === 'car' 
                      ? '0 20px 40px rgba(16, 185, 129, 0.4)' 
                      : '0 10px 20px rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="tab-car"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0"
                    animate={{
                      x: selectedVehicle === 'car' ? ['-100%', '100%'] : 0,
                      opacity: selectedVehicle === 'car' ? [0, 1, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: selectedVehicle === 'car' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: selectedVehicle === 'car' ? [0, 15, -15, 0] : 0,
                      scale: selectedVehicle === 'car' ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      duration: selectedVehicle === 'car' ? 2 : 0.3,
                      repeat: selectedVehicle === 'car' ? Infinity : 0
                    }}
                  >
                    <Car className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 flex-shrink-0" />
                  </motion.div>
                  <div className="text-left sm:text-left text-center relative z-10 min-w-0">
                    <span className="font-semibold text-base sm:text-lg block">Car Services</span>
                    <p className="text-xs sm:text-sm opacity-80 hidden sm:block">4-Wheeler Maintenance</p>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedVehicle === 'car' && (
                    <motion.div
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Enhanced Quick Controls - Mobile Responsive */}
            <div className="flex flex-col gap-4 px-2 sm:px-0">
              <div className="w-full">
                {/* Enhanced Search - Mobile Responsive */}
                <motion.div 
                  className="relative w-full"
                  whileHover={{ 
                    scale: 1.01,
                    y: -1
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 400 }}
                >
                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 blur-sm"
                    animate={{
                      opacity: searchQuery ? [0.5, 1, 0.5] : 0.2,
                      scale: searchQuery ? [1, 1.02, 1] : 1
                    }}
                    transition={{
                      duration: 2,
                      repeat: searchQuery ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10"
                    animate={{ 
                      rotate: searchQuery ? [0, 360] : 0,
                      scale: searchQuery ? [1, 1.2, 1] : 1,
                      color: searchQuery ? ['#10b981', '#06b6d4', '#8b5cf6', '#10b981'] : '#9ca3af'
                    }}
                    transition={{ 
                      duration: searchQuery ? 2 : 0.3,
                      repeat: searchQuery ? Infinity : 0
                    }}
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  
                  <Input
                    type="text"
                    placeholder={`Search ${selectedVehicle} services...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative pl-12 sm:pl-14 pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 focus:bg-white/15 focus:shadow-lg focus:shadow-emerald-500/20 transition-all duration-300 rounded-xl text-base sm:text-lg w-full"
                    data-testid="search-services"
                  />
                  
                  {/* Search suggestions indicator */}
                  {searchQuery && (
                    <motion.div
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full"
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Step Indicator - Mobile Responsive */}
        {currentStep !== 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center mb-8 sm:mb-12 px-2 sm:px-4"
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden w-full max-w-4xl"
              whileHover={{ 
                scale: 1.005,
                borderColor: 'rgba(16, 185, 129, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-sky-500/5 to-purple-500/5"
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative z-10">
                {/* Step 1 - Mobile Responsive */}
                <motion.div 
                  className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3 transition-all duration-500 ${
                    currentStep === 'services' ? 'text-emerald-400' : currentStep === 'details' ? 'text-white' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold transition-all duration-500 relative ${
                      currentStep === 'services' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/40' 
                        : currentStep === 'details' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/40' 
                        : 'bg-gray-600'
                    }`}
                    animate={{
                      scale: currentStep === 'services' ? [1, 1.1, 1] : 1,
                      rotate: currentStep === 'services' ? [0, 360] : 0,
                      boxShadow: currentStep === 'services' 
                        ? ['0 8px 25px rgba(16, 185, 129, 0.4)', '0 15px 35px rgba(16, 185, 129, 0.6)', '0 8px 25px rgba(16, 185, 129, 0.4)']
                        : currentStep === 'details'
                        ? '0 8px 25px rgba(16, 185, 129, 0.4)'
                        : '0 0 0 rgba(16, 185, 129, 0)'
                    }}
                    transition={{
                      duration: currentStep === 'services' ? 3 : 0.5,
                      repeat: currentStep === 'services' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated ring */}
                    {currentStep === 'services' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-emerald-400"
                        animate={{
                          scale: [1, 1.3],
                          opacity: [1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                    
                    {currentStep !== 'services' && currentStep !== 'details' ? (
                      <span className="text-white font-bold text-sm sm:text-base md:text-lg">1</span>
                    ) : (
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </motion.div>
                    )}
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-sm sm:text-base md:text-lg">Select Services</p>
                    <p className="text-xs sm:text-sm opacity-70 hidden sm:block">Choose what you need</p>
                  </div>
                </motion.div>
                
                {/* Enhanced Connector - Mobile Responsive */}
                <motion.div 
                  className="relative w-8 h-1 sm:w-12 sm:h-2 md:w-16 md:h-2 bg-gray-600 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: 'auto',
                    backgroundColor: currentStep === 'details' ? '#10b981' : '#4b5563'
                  }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {currentStep === 'details' && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 relative overflow-hidden"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {/* Flowing light effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Step 2 - Mobile Responsive */}
                <motion.div 
                  className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3 transition-all duration-500 ${
                    currentStep === 'details' ? 'text-emerald-400' : 'text-gray-500'
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <motion.div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold transition-all duration-500 relative ${
                      currentStep === 'details' 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/40' 
                        : 'bg-gray-600'
                    }`}
                    animate={{
                      scale: currentStep === 'details' ? [1, 1.1, 1] : 1,
                      rotate: currentStep === 'details' ? [0, 360] : 0,
                      boxShadow: currentStep === 'details' 
                        ? ['0 8px 25px rgba(16, 185, 129, 0.4)', '0 15px 35px rgba(16, 185, 129, 0.6)', '0 8px 25px rgba(16, 185, 129, 0.4)']
                        : '0 0 0 rgba(16, 185, 129, 0)'
                    }}
                    transition={{
                      duration: currentStep === 'details' ? 3 : 0.5,
                      repeat: currentStep === 'details' ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated ring */}
                    {currentStep === 'details' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-emerald-400"
                        animate={{
                          scale: [1, 1.3],
                          opacity: [1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                    
                    {currentStep === 'details' ? (
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </motion.div>
                    ) : (
                      <span className="text-white font-bold text-sm sm:text-base md:text-lg">2</span>
                    )}
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-sm sm:text-base md:text-lg">Your Details</p>
                    <p className="text-xs sm:text-sm opacity-70 hidden sm:block">Contact & address</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'services' && (
          <>


            <div className="w-full">
                {/* Combo Services with Scroll-triggered Animation */}
                {comboServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <motion.h2 
                          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1, duration: 0.6 }}
                        >
                          {selectedVehicle === 'bike' ? 'Bike' : 'Car'} Service Packages
                        </motion.h2>
                        <motion.p 
                          className="text-gray-300 text-sm sm:text-base md:text-lg"
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
                        <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base md:text-lg shadow-lg">
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
                        <span className="font-medium">Includes FREE Doorstep Service:</span> All combo packages include complimentary service at your location. Choose one complete package for maximum savings.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
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
                        
                        return (
                          <ComboServiceCard
                            key={service.id}
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => handleToggleService(service)}
                          />
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}

                {/* Individual Services with Reliable Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-16"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4"
                  >
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Individual Services
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg">
                        Precision services for specific maintenance needs
                      </p>
                    </div>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 self-start sm:self-auto">
                      {individualServices.length} Services Available
                    </Badge>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8"
                  >
                    <p className="text-blue-300 text-sm">
                      <span className="font-medium">Mix & Match:</span> Individual services can be combined with each other. Don't forget to add "Doorstep Service" from add-ons for home service.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                  >
                    {individualServices.map((service, index) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: 0.5 + (index * 0.1), 
                            duration: 0.5,
                            ease: "easeOut"
                          }}
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

              </div>

            {/* Floating Cart Button */}
            <AnimatePresence>
              {(selectedServices.length > 0 || selectedAddons.length > 0) && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="fixed bottom-6 right-6 z-50"
                >
                  <motion.button
                    onClick={() => setShowSummary(!showSummary)}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border border-white/20 backdrop-blur-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="cart-button"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-white text-emerald-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          {selectedServices.length + selectedAddons.length}
                        </motion.div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">Cart Total</div>
                        <div className="text-lg font-bold">₹{getSubtotal()}</div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Popup */}
            <AnimatePresence>
              {showSummary && (selectedServices.length > 0 || selectedAddons.length > 0) && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setShowSummary(false)}
                  />
                  
                  {/* Cart Modal */}
                  <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/20 z-50 overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold text-xl flex items-center space-x-2">
                          <ShoppingCart className="w-5 h-5" />
                          <span>Your Cart</span>
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSummary(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Selected Services */}
                      {selectedServices.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-gray-300 font-medium text-sm mb-4">Services</h4>
                          <div className="space-y-3">
                            {selectedServices.map((service) => (
                              <motion.div
                                key={service.id}
                                layout
                                className="bg-white/5 border border-white/10 rounded-xl p-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-white text-sm">{service.name}</div>
                                    <div className="text-xs text-gray-400 mt-1">{service.name}</div>
                                    <div className="text-emerald-400 font-bold mt-2">
                                      ₹{service.price}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleService(service)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-2"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Selected Add-ons */}
                      {selectedAddons.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-gray-300 font-medium text-sm mb-4">Add-ons</h4>
                          <div className="space-y-3">
                            {selectedAddons.map((addon) => (
                              <motion.div
                                key={addon.id}
                                layout
                                className="bg-white/5 border border-white/10 rounded-xl p-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-white text-sm">{addon.name}</div>
                                    <div className="text-emerald-400 font-bold mt-1">
                                      ₹{addon.price}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleAddon(addon)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 ml-2"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Total Section */}
                      <div className="border-t border-white/20 pt-6 mt-6">
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">Services Total</span>
                            <span className="text-white font-medium">
                              ₹{getSubtotal()}
                            </span>
                          </div>
                          
                          {(() => {
                            const subtotal = getSubtotal();
                            const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
                            
                            return doorstepCharge > 0 ? (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300 text-sm">Doorstep Charge</span>
                                <span className="text-yellow-400 font-medium">
                                  ₹{doorstepCharge}
                                </span>
                              </div>
                            ) : null;
                          })()}
                          
                          <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
                            <span className="text-white font-bold text-lg">Total</span>
                            <span className="text-emerald-400 font-bold text-2xl">
                              ₹{(() => {
                                const subtotal = getSubtotal();
                                const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
                                return subtotal + doorstepCharge;
                              })()}
                            </span>
                          </div>
                          
                          {(() => {
                            const subtotal = getSubtotal();
                            const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
                            
                            return doorstepCharge > 0 ? (
                              <div className="text-xs text-yellow-400 bg-yellow-500/10 rounded p-2">
                                ℹ️ Doorstep charge applies for orders below ₹999
                              </div>
                            ) : null;
                          })()}
                        </div>

                        <Button
                          onClick={() => setCurrentStep('details')}
                          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                          data-testid="proceed-to-booking"
                        >
                          <span>Proceed to Book</span>
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}

        {currentStep === 'details' && (
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