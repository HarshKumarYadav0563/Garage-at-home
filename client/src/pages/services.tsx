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
import { BIKE_SERVICES, CAR_SERVICES, ADDONS, CITIES } from '@/data/bookingServices';
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
    
    if (!isCurrentlySelected && service.type === 'combo' && hasComboSelected) {
      const currentCombo = selectedServices.find(s => s.type === 'combo');
      toast({
        title: 'Service Package Replaced',
        description: `${currentCombo?.name} has been replaced with ${service.name}. You can only select one service package at a time.`,
        duration: 3000,
      });
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

  const cityData = CITIES.find(c => c.id === city);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Book Doorstep Service
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 mx-auto mt-2"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Affordable, transparent pricing. Certified mechanics at your home.
          </motion.p>
        </motion.div>

        {/* Step Indicator */}
        {currentStep !== 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'services' ? 'text-emerald-400' : currentStep === 'details' ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'services' ? 'bg-emerald-500' : currentStep === 'details' ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                  <span className="text-sm font-semibold text-white">1</span>
                </div>
                <span className="text-sm font-medium">Select Services</span>
              </div>
              <div className={`w-8 h-px ${currentStep === 'details' ? 'bg-emerald-500' : 'bg-gray-600'}`} />
              <div className={`flex items-center space-x-2 ${currentStep === 'details' ? 'text-emerald-400' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'details' ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                  <span className="text-sm font-semibold text-white">2</span>
                </div>
                <span className="text-sm font-medium">Book Details</span>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'services' && (
          <>
            {/* Vehicle Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex">
                <motion.button
                  onClick={() => setSelectedVehicle('bike')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedVehicle === 'bike'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  data-testid="tab-bike"
                >
                  <Bike className="w-5 h-5" />
                  <span>Bike</span>
                </motion.button>
                <motion.button
                  onClick={() => setSelectedVehicle('car')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedVehicle === 'car'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  data-testid="tab-car"
                >
                  <Car className="w-5 h-5" />
                  <span>Car</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
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
                            {cityOption.multiplier > 1 && (
                              <span className="text-xs text-gray-400 ml-2">
                                +{Math.round((cityOption.multiplier - 1) * 100)}%
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      data-testid="search-services"
                    />
                  </div>
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
              
              {cityData && cityData.multiplier > 1 && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <Globe className="w-4 h-4 inline mr-2" />
                    {cityData.name} pricing: +{Math.round((cityData.multiplier - 1) * 100)}% city factor applied
                  </p>
                </div>
              )}
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Services Section */}
              <div className="lg:col-span-3">
                {/* Combo Services */}
                {comboServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="mb-12"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        {selectedVehicle === 'bike' ? 'Bike' : 'Car'} Service Packages
                      </h2>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Best Value
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Complete service packages that include multiple services at discounted rates
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
                      <p className="text-blue-300 text-xs">
                        <span className="font-medium">Selection Rule:</span> You can only select one service package at a time. Individual services can be added to any package.
                      </p>
                    </div>
                    
                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15
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

                {/* Individual Services */}
                {individualServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">
                      Individual Services
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Specific services for targeted maintenance needs - can be combined freely with packages
                    </p>
                    
                    <motion.ul
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
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

                {/* Add-ons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h3 className="text-xl font-bold text-white mb-6">Add-ons</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  </div>
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