import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag, Car, Bike, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookingStore } from '@/stores/useBookingStore';
import { useEffect } from 'react';
import { BIKE_SERVICES, CAR_SERVICES } from '@/lib/pricing';

export function CartDrawer() {
  const { 
    showSummaryDrawer,
    setShowSummaryDrawer,
    selectedServices,
    selectedAddons,
    selectedVehicle,
    selectedCity,
    estimate,
    setCurrentStep,
    canProceedToStep,
    clearBooking,
    toggleService,
    toggleAddon
  } = useBookingStore();
  
  // Close on ESC key and prevent body scroll
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSummaryDrawer) {
        setShowSummaryDrawer(false);
      }
    };
    
    if (showSummaryDrawer) {
      window.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [showSummaryDrawer, setShowSummaryDrawer]);
  
  const handleContinue = () => {
    if (canProceedToStep('model')) {
      setCurrentStep('model');
      setShowSummaryDrawer(false);
    }
  };
  
  const handleClearCart = () => {
    clearBooking();
    setShowSummaryDrawer(false);
  };
  
  const hasServices = selectedServices.length > 0;
  const subtotal = estimate?.subtotal.min || 0;
  const total = estimate?.total.min || 0;
  
  if (!showSummaryDrawer) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50" role="dialog" aria-labelledby="cart-title">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSummaryDrawer(false)}
        />
        
        {/* Mobile: Bottom Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed inset-x-0 bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/20 rounded-t-3xl max-h-[85vh] overflow-hidden"
        >
          <CartContent 
            selectedServices={selectedServices}
            selectedAddons={selectedAddons}
            selectedVehicle={selectedVehicle}
            selectedCity={selectedCity}
            estimate={estimate}
            onClose={() => setShowSummaryDrawer(false)}
            onRemoveService={toggleService}
            onRemoveAddon={toggleAddon}
            onClear={handleClearCart}
            onContinue={handleContinue}
            canContinue={hasServices}
          />
        </motion.div>
        
        {/* Desktop: Right Sidebar */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:block fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-white/20 overflow-hidden"
        >
          <CartContent 
            selectedServices={selectedServices}
            selectedAddons={selectedAddons}
            selectedVehicle={selectedVehicle}
            selectedCity={selectedCity}
            estimate={estimate}
            onClose={() => setShowSummaryDrawer(false)}
            onRemoveService={toggleService}
            onRemoveAddon={toggleAddon}
            onClear={handleClearCart}
            onContinue={handleContinue}
            canContinue={hasServices}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Cart content component for reuse between mobile and desktop
interface CartContentProps {
  selectedServices: string[];
  selectedAddons: string[];
  selectedVehicle: string;
  selectedCity: string;
  estimate: any;
  onClose: () => void;
  onRemoveService: (serviceId: string) => void;
  onRemoveAddon: (addonId: string) => void;
  onClear: () => void;
  onContinue: () => void;
  canContinue: boolean;
}

function CartContent({ 
  selectedServices,
  selectedAddons,
  selectedVehicle,
  selectedCity,
  estimate,
  onClose,
  onRemoveService,
  onRemoveAddon,
  onClear,
  onContinue,
  canContinue
}: CartContentProps) {
  const allServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
  const allAddons: any[] = []; // Addons will be integrated later
  
  const selectedServiceItems = selectedServices.map(id => 
    allServices.find(service => service.id === id)
  ).filter(Boolean);
  
  const selectedAddonItems = selectedAddons.map(id => 
    allAddons.find(addon => addon.id === id)
  ).filter(Boolean);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-emerald-400" />
          <h2 id="cart-title" className="text-lg font-semibold text-white">
            Service Summary
          </h2>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            {selectedServices.length + selectedAddons.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-2"
          data-testid="button-close-cart"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Vehicle & Location Info */}
      <div className="p-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            {selectedVehicle === 'bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
            <span className="capitalize">{selectedVehicle}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">{selectedCity.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {(selectedServices.length === 0 && selectedAddons.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Services Selected</h3>
            <p className="text-gray-400">Add some services to get started</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Selected Services */}
            {selectedServiceItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Services</h3>
                <div className="space-y-2">
                  {selectedServiceItems.map((service) => (
                    <motion.div
                      key={service?.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{service?.name}</h4>
                        <p className="text-gray-400 text-sm">₹{service?.price.min} - ₹{service?.price.max}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveService(service?.id || '')}
                        className="text-red-400 hover:text-red-300 p-2"
                        data-testid={`button-remove-service-${service?.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Add-ons */}
            {selectedAddonItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Add-ons</h3>
                <div className="space-y-2">
                  {selectedAddonItems.map((addon) => (
                    <motion.div
                      key={addon?.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{addon?.name}</h4>
                        <p className="text-gray-400 text-sm">₹{addon?.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveAddon(addon?.id || '')}
                        className="text-red-400 hover:text-red-300 p-2"
                        data-testid={`button-remove-addon-${addon?.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Pricing Breakdown */}
            {estimate && (
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-xl">
                <h3 className="text-white font-medium mb-3">Price Estimate</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{estimate.subtotal.min} - ₹{estimate.subtotal.max}</span>
                  </div>
                  <div className="flex justify-between text-white font-medium pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>₹{estimate.total.min} - ₹{estimate.total.max}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {canContinue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="w-full text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40"
            data-testid="button-clear-cart"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
        
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-continue-booking"
        >
          <span>Continue Booking</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}