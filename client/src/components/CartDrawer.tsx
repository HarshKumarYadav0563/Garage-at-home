import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/useCartStore';
import { useBookingStore } from '@/stores/useBookingStore';
import { useEffect } from 'react';

export function CartDrawer() {
  const { services, total, itemCount, isOpen, close, removeService, clear } = useCartStore();
  const { setCurrentStep } = useBookingStore();
  
  // Close on ESC key and prevent body scroll
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, close]);
  
  const handleContinue = () => {
    setCurrentStep('customer');
    close();
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50" role="dialog" aria-labelledby="cart-title">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
        
        {/* Mobile: Bottom Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed inset-x-0 bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/20 rounded-t-3xl max-h-[85vh] overflow-hidden"
        >
          <CartContent 
            services={services}
            total={total}
            itemCount={itemCount}
            onClose={close}
            onRemove={removeService}
            onClear={clear}
            onContinue={handleContinue}
          />
        </motion.div>
        
        {/* Desktop: Right Sidebar */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:block fixed right-0 top-0 h-full w-96 bg-black/95 backdrop-blur-xl border-l border-white/20 overflow-hidden"
        >
          <CartContent 
            services={services}
            total={total}
            itemCount={itemCount}
            onClose={close}
            onRemove={removeService}
            onClear={clear}
            onContinue={handleContinue}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

interface CartContentProps {
  services: any[];
  total: number;
  itemCount: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onContinue: () => void;
}

function CartContent({ services, total, itemCount, onClose, onRemove, onClear, onContinue }: CartContentProps) {
  if (itemCount === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 id="cart-title" className="text-xl font-bold text-white">Your Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">Cart is empty</h3>
          <p className="text-gray-400 mb-6">Add some services to get started</p>
          <Button onClick={onClose} className="bg-gradient-to-r from-emerald-500 to-sky-500">
            Browse Services
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h2 id="cart-title" className="text-xl font-bold text-white">Your Cart</h2>
          <p className="text-sm text-gray-400">{itemCount} service{itemCount !== 1 ? 's' : ''} selected</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Services List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{service.name}</h4>
                  {service.subtitle && (
                    <p className="text-gray-400 text-sm mt-1">{service.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-emerald-400 font-bold">₹{service.price.toLocaleString()}</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                      {service.vehicle} • {service.city}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(service.id)}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 ml-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-white/10 bg-black/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300">Total</span>
          <span className="text-white text-xl font-bold">₹{total.toLocaleString()}</span>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue Booking
          </Button>
          
          <Button
            variant="outline"
            onClick={onClear}
            className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}