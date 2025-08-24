import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ShoppingCart, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { BIKE_SERVICES, CAR_SERVICES } from '@/data/bookingServices';
import { CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

export function CollapsibleCart() {
  const {
    selectedServices,
    selectedVehicle,
    selectedCity,
    estimate,
    cartState,
    setCartState,
    setCurrentStep,
    toggleService,
    canProceedToStep
  } = useBookingStore();
  
  const hasItems = selectedServices.length > 0;
  const canContinue = canProceedToStep('customer');

  const handleContinue = () => {
    if (canContinue) {
      setCurrentStep('customer');
      setCartState('hidden');
    }
  };

  const handleRemoveService = (serviceId: string) => {
    toggleService(serviceId);
  };

  if (!hasItems) {
    return null;
  }

  const isCollapsed = cartState === 'collapsed';
  const isExpanded = cartState === 'expanded';
  const isHidden = cartState === 'hidden';

  if (isHidden) {
    return null;
  }

  return (
    <>
      {/* Desktop: Floating Cart */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={() => setCartState('expanded')}
            className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-full p-4 shadow-lg shadow-emerald-500/25"
            data-testid="desktop-cart-button"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="font-semibold">{selectedServices.length}</span>
            {estimate && (
              <span className="ml-2 font-bold">₹{estimate.total}</span>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile: Collapsible Bottom Cart */}
      <div className="lg:hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ 
            y: isCollapsed ? '0%' : '0%'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 border-t border-white/20 backdrop-blur-xl shadow-2xl shadow-black/50"
          style={{
            borderTopLeftRadius: isExpanded ? '24px' : '16px',
            borderTopRightRadius: isExpanded ? '24px' : '16px'
          }}
        >
          {/* Collapsed State - Summary Bar */}
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4"
            >
              <button
                onClick={() => setCartState('expanded')}
                className="w-full flex items-center justify-between"
                data-testid="expand-cart-button"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500 rounded-full p-2">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">
                      {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Added
                    </div>
                    <div className="text-gray-400 text-xs">
                      Tap to review • {CITY_DISPLAY_NAMES[selectedCity]}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {estimate && (
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-lg">
                        ₹{estimate.total}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Total
                      </div>
                    </div>
                  )}
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </motion.div>
          )}

          {/* Expanded State - Full Cart Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 max-h-[70vh] overflow-y-auto">
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
                      onClick={() => setCartState('collapsed')}
                      className="text-gray-400 hover:text-white p-2"
                      data-testid="collapse-cart-button"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Services List */}
                  <div className="space-y-4 mb-6">
                    {selectedServices.map((serviceId) => {
                      const allServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
                      const service = allServices.find(s => s.id === serviceId);
                      if (!service) return null;

                      const price = service.priceMin ? 
                        `₹${service.priceMin} - ₹${service.priceMax}` : 
                        `₹${service.price}`;

                      return (
                        <motion.div
                          key={serviceId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">
                              {service.name}
                            </h4>
                            <p className="text-gray-400 text-xs mt-1">
                              {service.shortDescription || service.subtitle || ''}
                            </p>
                            <div className="text-emerald-400 font-bold text-sm mt-2">
                              {price}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveService(serviceId)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2"
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
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-300 text-sm">
                          <span>Services Subtotal</span>
                          <span>₹{estimate.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-300 text-sm">
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
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-4 rounded-xl shadow-lg"
                    data-testid="continue-booking-button"
                  >
                    Continue to Booking
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {/* Footer Info */}
                  <div className="text-center text-gray-400 text-xs mt-4">
                    <p>✓ Professional mechanics • ✓ Doorstep service • ✓ Quality guaranteed</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}