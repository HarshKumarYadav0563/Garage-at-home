import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Car, Bike, MapPin, 
  User, Calendar, Shield, Clock, Wrench 
} from 'lucide-react';

// Components
import { EnhancedServiceCard } from '@/components/EnhancedServiceCard';
import { VehicleModelPicker } from '@/components/VehicleModelPicker';
import { CustomerDetailsForm } from '@/components/CustomerDetailsForm';
import { AddressPicker } from '@/components/AddressPicker';
import { SlotPicker } from '@/components/SlotPicker';
import { OtpDialog } from '@/components/OtpDialog';
import { BookingConfirmation } from '@/components/BookingConfirmation';
import { WaitlistModal } from '@/components/WaitlistModal';
import { FloatingCartButton } from '@/components/FloatingCartButton';
import { CartDrawer } from '@/components/CartDrawer';

// Stores & Utils
import { useBookingStore, BookingStep } from '@/stores/useBookingStore';
import { BIKE_SERVICES, CAR_SERVICES } from '@/lib/pricing';
import { 
  NCR_CITIES, 
  VEHICLES, 
  CITY_DISPLAY_NAMES, 
  VEHICLE_DISPLAY_NAMES, 
  isValidRoute,
  type NCRCity,
  type VehicleType
} from '@shared/config/serviceAreas';

// SEO
import { SEO } from '@/components/SEO';

const STEP_LABELS = {
  services: 'Select Services',
  model: 'Vehicle Details', 
  details: 'Contact & Location',
  otp: 'Verify Phone',
  confirmation: 'Confirm Booking'
};

const STEP_ICONS = {
  services: Wrench,
  model: Car,
  details: User,
  otp: Shield,
  confirmation: CheckCircle
};

export default function ServicesBooking() {
  const [, params] = useRoute('/services/:vehicle/:city');
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Extract and validate params
  const vehicleParam = params?.vehicle as VehicleType;
  const cityParam = params?.city as NCRCity;
  
  // Booking store
  const {
    currentStep,
    setCurrentStep,
    selectedVehicle,
    setSelectedVehicle,
    selectedCity,
    setSelectedCity,
    selectedServices,
    toggleService,
    vehicleModel,
    setVehicleModel,
    customer,
    setCustomer,
    address,
    setAddress,
    selectedSlot,
    setSelectedSlot,
    otp,
    setOtp,
    canProceedToStep,
    showWaitlistModal,
    setShowWaitlistModal,
    trackingId,
    clearBooking,
    calculateEstimate
  } = useBookingStore();

  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if invalid route
  useEffect(() => {
    if (params && (!isValidRoute(vehicleParam, cityParam))) {
      setLocation('/services');
      return;
    }
  }, [params, vehicleParam, cityParam, setLocation]);

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

  // Recalculate estimate when services change
  useEffect(() => {
    calculateEstimate();
  }, [selectedServices, selectedVehicle, selectedCity, calculateEstimate]);

  // If booking is completed, redirect to tracking
  useEffect(() => {
    if (trackingId) {
      setLocation(`/track/${trackingId}`);
    }
  }, [trackingId, setLocation]);

  const currentVehicle = vehicleParam || 'bike';
  const currentCity = cityParam || 'delhi';
  const services = currentVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Step progress calculation
  const steps: BookingStep[] = ['services', 'model', 'details', 'otp', 'confirmation'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleStepNavigation = (step: BookingStep) => {
    if (canProceedToStep(step)) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      const nextStep = steps[nextIndex];
      if (canProceedToStep(nextStep)) {
        setCurrentStep(nextStep);
      }
    }
  };

  const handlePreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleOtpVerification = () => {
    if (customer?.phone) {
      setShowOtpDialog(true);
    }
  };

  const handleOtpVerified = (otpToken: string) => {
    setOtp({ verified: true, otpToken });
    setShowOtpDialog(false);
    setCurrentStep('confirmation');
  };

  const handleBookingComplete = (newTrackingId: string) => {
    // Tracking redirect is handled by useEffect
  };

  const handleWaitlistClose = () => {
    setShowWaitlistModal(false);
  };

  // SEO Title
  const seoTitle = `${VEHICLE_DISPLAY_NAMES[currentVehicle]} Service in ${CITY_DISPLAY_NAMES[currentCity]} | Garage At Home`;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={`Professional ${currentVehicle} servicing in ${CITY_DISPLAY_NAMES[currentCity]}. Book doorstep vehicle maintenance with certified mechanics. Transparent pricing, quality service.`}
        canonical={`/services/${currentVehicle}/${currentCity}`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/services" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Services</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {currentVehicle === 'bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                  <span className="capitalize font-medium">{currentVehicle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="capitalize">{CITY_DISPLAY_NAMES[currentCity]}</span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <Progress value={progress} className="h-2 bg-white/10" />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                {steps.map((step, index) => {
                  const StepIcon = STEP_ICONS[step];
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div 
                      key={step}
                      className={`flex items-center gap-1 ${
                        isActive ? 'text-emerald-400' : 'text-gray-500'
                      } ${isCurrent ? 'font-medium' : ''}`}
                    >
                      <StepIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">{STEP_LABELS[step]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Select Your Services
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Choose the services you need for your {currentVehicle}
                  </p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:border-emerald-500/40 focus:outline-none"
                    data-testid="input-search-services"
                  />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <EnhancedServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedServices.includes(service.id)}
                      onToggle={() => toggleService(service.id)}
                    />
                  ))}
                </div>

                {/* Continue Button */}
                {selectedServices.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium px-8 py-3"
                      data-testid="button-continue-to-model"
                    >
                      Continue to Vehicle Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Vehicle Model */}
            {currentStep === 'model' && (
              <motion.div
                key="model"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <VehicleModelPicker
                  vehicleType={currentVehicle}
                  value={vehicleModel}
                  onChange={setVehicleModel}
                  onContinue={handleNextStep}
                />
                
                <div className="text-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={handlePreviousStep}
                    className="text-gray-400 hover:text-white"
                    data-testid="button-back-to-services"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Customer Details & Address */}
            {currentStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <CustomerDetailsForm
                  value={customer}
                  onChange={setCustomer}
                  onContinue={() => {}}
                />
                
                <AddressPicker
                  value={address}
                  onChange={setAddress}
                  onWaitlistNeeded={() => setShowWaitlistModal(true)}
                />
                
                <SlotPicker
                  value={selectedSlot}
                  onChange={setSelectedSlot}
                />

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    onClick={handlePreviousStep}
                    className="text-gray-400 hover:text-white flex-1"
                    data-testid="button-back-to-model"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleOtpVerification}
                    disabled={!canProceedToStep('otp')}
                    className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium flex-1 disabled:opacity-50"
                    data-testid="button-verify-phone"
                  >
                    Verify Phone Number
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <BookingConfirmation onComplete={handleBookingComplete} />
                
                <div className="text-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={handlePreviousStep}
                    className="text-gray-400 hover:text-white"
                    data-testid="button-back-to-details"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Edit Details
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Cart Button */}
        <FloatingCartButton />
        
        {/* Cart Drawer */}
        <CartDrawer />

        {/* OTP Dialog */}
        <OtpDialog
          isOpen={showOtpDialog}
          onClose={() => setShowOtpDialog(false)}
          phone={customer?.phone || ''}
          onVerified={handleOtpVerified}
        />

        {/* Waitlist Modal */}
        <WaitlistModal
          isOpen={showWaitlistModal}
          onClose={handleWaitlistClose}
          detectedLocation={address?.text}
        />
      </div>
    </>
  );
}