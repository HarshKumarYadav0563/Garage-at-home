import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Trash2, ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useBookingStore } from '@/stores/useBookingStore';
import { useEffect } from 'react';

export function CartDrawer() {
  const { 
    services, 
    addons, 
    totals, 
    itemCount, 
    isCartOpen, 
    closeCart, 
    removeService, 
    removeAddon, 
    clear 
  } = useCartStore();
  
  const { 
    selectedVehicle, 
    selectedCity, 
    setCurrentStep 
  } = useBookingStore();
  
  const shouldReduceMotion = useReducedMotion();
  
  // Close on ESC key
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, closeCart]);
  
  const handleContinue = () => {
    setCurrentStep('details');
    closeCart();
  };
  
  const cityDisplayName = selectedCity === 'delhi' ? 'Delhi' : 
                         selectedCity === 'gurugram' ? 'Gurugram' : 
                         selectedCity === 'noida' ? 'Noida' : selectedCity;
  
  const vehicleDisplayName = selectedVehicle === 'bike' ? 'Bike' : 'Car';
  
  if (!isCartOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50" role="dialog" aria-labelledby="cart-title">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
        />
        
        {/* Mobile: Bottom Sheet */}
        <motion.div
          initial={shouldReduceMotion ? {} : { y: "100%" }}
          animate={shouldReduceMotion ? {} : { y: 0 }}
          exit={shouldReduceMotion ? {} : { y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed inset-x-0 bottom-0 rounded-t-2xl bg-black/90 backdrop-blur-xl border-t border-white/10 max-h-[85vh] overflow-hidden"
        >
          <CartContent
            services={services}
            addons={addons}
            totals={totals}
            itemCount={itemCount}
            vehicleDisplayName={vehicleDisplayName}
            cityDisplayName={cityDisplayName}
            onClose={closeCart}
            onRemoveService={removeService}
            onRemoveAddon={removeAddon}
            onClear={clear}
            onContinue={handleContinue}
            isMobile={true}
          />
        </motion.div>
        
        {/* Desktop: Right Sidebar */}
        <motion.div
          initial={shouldReduceMotion ? {} : { x: "100%" }}
          animate={shouldReduceMotion ? {} : { x: 0 }}
          exit={shouldReduceMotion ? {} : { x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:block fixed right-0 top-0 h-dvh w-[380px] bg-black/80 backdrop-blur-xl border-l border-white/10 overflow-hidden"
        >
          <CartContent
            services={services}
            addons={addons}
            totals={totals}
            itemCount={itemCount}
            vehicleDisplayName={vehicleDisplayName}
            cityDisplayName={cityDisplayName}
            onClose={closeCart}
            onRemoveService={removeService}
            onRemoveAddon={removeAddon}
            onClear={clear}
            onContinue={handleContinue}
            isMobile={false}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface CartContentProps {
  services: any[];
  addons: any[];
  totals: { min: number; max: number };
  itemCount: number;
  vehicleDisplayName: string;
  cityDisplayName: string;
  onClose: () => void;
  onRemoveService: (id: string) => void;
  onRemoveAddon: (id: string) => void;
  onClear: () => void;
  onContinue: () => void;
  isMobile: boolean;
}

function CartContent({
  services,
  addons,
  totals,
  itemCount,
  vehicleDisplayName,
  cityDisplayName,
  onClose,
  onRemoveService,
  onRemoveAddon,
  onClear,
  onContinue,
  isMobile
}: CartContentProps) {
  
  if (itemCount === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 id="cart-title" className="text-lg font-semibold text-white">Your Selection</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 grid place-items-center mb-4">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-white font-medium mb-2">No services selected yet</h3>
          <p className="text-gray-400 text-sm mb-6">Add services to get started with your booking</p>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
          >
            Browse Services
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 id="cart-title" className="text-lg font-semibold text-white">Your Selection</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* City & Vehicle chips */}
        <div className="flex gap-2 mb-3">
          <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">
            {cityDisplayName} — Delhi-NCR
          </div>
          <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">
            {vehicleDisplayName}
          </div>
        </div>
        
        <p className="text-xs text-gray-400">
          Prices shown are <strong>estimates</strong> (parts extra)
        </p>
      </div>
      
      {/* Services List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm">{service.title}</h4>
                  {service.subtitle && (
                    <p className="text-gray-400 text-xs mt-1">{service.subtitle}</p>
                  )}
                  <div className="mt-2">
                    <span className="text-emerald-400 font-bold text-sm">
                      ₹{service.priceMin.toLocaleString()}–₹{service.priceMax.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveService(service.id)}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1.5 ml-3 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
          
          {addons.length > 0 && (
            <>
              <div className="pt-4 pb-2">
                <h3 className="text-white font-medium text-sm">Add-ons</h3>
              </div>
              {addons.map((addon, index) => (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (services.length + index) * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm">{addon.title}</h4>
                      <div className="mt-2">
                        <span className="text-emerald-400 font-bold text-sm">
                          ₹{addon.priceMin.toLocaleString()}–₹{addon.priceMax.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveAddon(addon.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1.5 ml-3 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex-shrink-0 p-6 border-t border-white/10 bg-black/50">
        {/* Totals */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Est. Subtotal</span>
            <span className="text-white font-bold text-lg">
              ₹{totals.min.toLocaleString()}–₹{totals.max.toLocaleString()}
            </span>
          </div>
          {cityDisplayName === 'Gurugram' && (
            <p className="text-xs text-yellow-400">Includes city factor +5% for Gurugram</p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 text-white font-medium py-3 shadow-lg"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue → Details
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add More
            </Button>
            
            <Button
              variant="outline"
              onClick={onClear}
              className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}