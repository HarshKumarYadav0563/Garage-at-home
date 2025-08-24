import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { BIKE_SERVICES, CAR_SERVICES } from '@/data/bookingServices';
import { CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    selectedServices,
    selectedVehicle,
    selectedCity,
    estimate,
    setCurrentStep,
    toggleService,
    canProceedToStep
  } = useBookingStore();
  
  const hasItems = selectedServices.length > 0;
  const canContinue = canProceedToStep('customer');

  // Don't render anything if no items
  if (!hasItems) {
    return null;
  }

  const handleContinue = () => {
    if (canContinue) {
      setCurrentStep('customer');
      setIsOpen(false);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    toggleService(serviceId);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-4 right-4" style={{ zIndex: 1000 }}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-14 w-14 p-0 shadow-xl"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selectedServices.length}
            </span>
          </div>
        </Button>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{ zIndex: 999 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
              style={{ zIndex: 1000 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
                      <p className="text-sm text-gray-600">
                        {VEHICLE_DISPLAY_NAMES[selectedVehicle]} services in {CITY_DISPLAY_NAMES[selectedCity]}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Services List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {selectedServices.map((serviceId) => {
                      const allServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
                      const service = allServices.find(s => s.id === serviceId);
                      if (!service) return null;

                      return (
                        <div
                          key={serviceId}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {service.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {service.subtitle}
                            </p>
                            <div className="text-emerald-600 font-bold mt-2">
                              ₹{service.price}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveService(serviceId)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer with Pricing and Continue */}
                <div className="border-t bg-gray-50 p-6">
                  {estimate && (
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Services Subtotal</span>
                        <span>₹{String(estimate.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Doorstep Charge</span>
                        <span>₹{String(estimate.doorstepCharge)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-emerald-600">₹{String(estimate.total)}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3"
                  >
                    Continue to Booking
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}