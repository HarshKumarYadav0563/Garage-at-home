import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ShoppingCart, Trash2, X } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { BIKE_SERVICES, CAR_SERVICES } from '@/data/bookingServices';
import { CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

export function SimpleCart() {
  const {
    selectedServices,
    selectedVehicle,
    selectedCity,
    estimate,
    showSummary,
    setShowSummary,
    setCurrentStep,
    toggleService,
    canProceedToStep
  } = useBookingStore();
  
  const hasItems = selectedServices.length > 0;
  const canContinue = canProceedToStep('customer');

  // Debug logging - always show cart state
  console.log('=== CART STATE DEBUG ===', {
    hasItems,
    selectedServicesCount: selectedServices.length,
    selectedServices,
    showSummary,
    estimate: estimate ? `₹${estimate.total}` : 'none',
    shouldShowButton: hasItems && !showSummary
  });

  const handleContinue = () => {
    if (canContinue) {
      setCurrentStep('customer');
      setShowSummary(false);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    toggleService(serviceId);
  };

  // Always show cart when items exist
  if (!hasItems) {
    console.log('=== CART HIDDEN: No items selected ===');
    return null;
  }

  console.log('=== CART RENDERING ===', { hasItems, showSummary });

  return (
    <>
      {/* Floating Cart Button - Always show when has items */}
      {hasItems && !showSummary && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setShowSummary(true)}
            className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-full p-4 shadow-lg shadow-emerald-500/25"
            data-testid="cart-button"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="font-semibold">{selectedServices.length}</span>
            {estimate && (
              <span className="ml-2 font-bold">₹{estimate.total}</span>
            )}
          </Button>
        </motion.div>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {showSummary && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowSummary(false)}
            />
            
            {/* Cart Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 border-t border-white/20 backdrop-blur-xl rounded-t-3xl shadow-2xl"
            >
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Your Cart</h3>
                    <p className="text-gray-400 text-sm">
                      {VEHICLE_DISPLAY_NAMES[selectedVehicle]} services in {CITY_DISPLAY_NAMES[selectedCity]}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSummary(false)}
                    className="text-gray-400 hover:text-white"
                    data-testid="close-cart"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Services List */}
                <div className="space-y-4 mb-6">
                  {selectedServices.map((serviceId) => {
                    const allServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
                    const service = allServices.find(s => s.id === serviceId);
                    if (!service) return null;

                    const price = service.price ? `₹${service.price}` : 'Price on request';

                    return (
                      <motion.div
                        key={serviceId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {service.name}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {service.subtitle || ''}
                          </p>
                          <div className="text-emerald-400 font-bold mt-2">
                            {price}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(serviceId)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          data-testid={`remove-service-${serviceId}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pricing Summary */}
                {estimate && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Services Subtotal</span>
                        <span>₹{estimate.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Doorstep Charge</span>
                        <span>₹{estimate.doorstepCharge}</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total</span>
                        <span className="text-emerald-400">₹{estimate.total}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <Button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-4 rounded-xl shadow-lg text-lg"
                  data-testid="continue-booking"
                >
                  Continue to Booking
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Footer Info */}
                <div className="text-center text-gray-400 text-sm mt-4 pb-4">
                  <p>✓ Professional mechanics • ✓ Doorstep service • ✓ Quality guaranteed</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}