import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { useState } from 'react';

export function CartIcon() {
  const { selectedServices, estimate, toggleService } = useBookingStore();
  const [showCart, setShowCart] = useState(false);
  
  const hasItems = selectedServices.length > 0;
  const total = estimate?.total || 0;
  
  // Get service object - handle both string IDs and service objects
  const getServiceById = (item: any) => {
    // If it's already a service object, return it
    if (typeof item === 'object' && item.id) {
      return item;
    }
    
    // If it's a string ID, look it up
    const id = typeof item === 'string' ? item : item.toString();
    const services = [
      { id: 'basic-service', name: 'Basic Service', price: 499 },
      { id: 'premium-service', name: 'Premium Service', price: 999 },
      { id: 'full-service', name: 'Full Service', price: 1399 },
      { id: 'combo-basic', name: 'Basic Combo', price: 799 },
      { id: 'combo-premium', name: 'Premium Combo', price: 1599 }
    ];
    return services.find(s => s.id === id) || { id, name: id.replace('-', ' '), price: 599 };
  };

  if (!hasItems) return null;

  return (
    <>
      {/* Floating Cart Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setShowCart(true)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full p-4 shadow-2xl border border-white/20"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {selectedServices.length}
            </motion.div>
          </div>
        </motion.button>
      </motion.div>

      {/* Right Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCart(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-96 h-full bg-gradient-to-br from-gray-900 to-black border-l border-white/10 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <span>Cart ({selectedServices.length})</span>
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Services List */}
              <div className="p-6 space-y-4">
                {selectedServices.map((serviceItem, index) => {
                  const service = getServiceById(serviceItem);
                  const serviceId = service.id;
                  return (
                    <motion.div
                      key={serviceId}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{service.name}</h4>
                          <p className="text-emerald-400 font-bold">₹{service.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleService(serviceId)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full p-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="p-6 border-t border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-emerald-400 text-2xl font-bold">₹{total}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3 rounded-xl">
                  Proceed to Checkout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}