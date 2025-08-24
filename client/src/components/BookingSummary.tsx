import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, X, ShoppingCart } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { useEffect, useState } from 'react';

interface BookingSummaryProps {
  className?: string;
  isMobile?: boolean;
}

export function BookingSummary({ className = '', isMobile = false }: BookingSummaryProps) {
  const {
    selectedServices,
    getSubtotal,
    getDoortepCharge,
    getFinalTotal,
    currentStep,
    setCurrentStep,
    toggleService,
    showSummary,
    setShowSummary
  } = useBookingStore();
  
  const shouldReduceMotion = useReducedMotion();
  const subtotal = getSubtotal();
  const [showFloatingCart, setShowFloatingCart] = useState(false);
  
  // Calculate doorstep charge manually if function doesn't exist
  const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const finalTotal = subtotal + doorstepCharge;
  
  const hasItems = selectedServices.length > 0;

  // Debug: log values
  console.log('Debug - Subtotal:', subtotal, 'Doorstep Charge:', doorstepCharge, 'Final Total:', finalTotal);

  // Show/hide floating cart based on items
  useEffect(() => {
    setShowFloatingCart(hasItems && !showSummary);
  }, [hasItems, showSummary]);

  if (!hasItems) {
    return null; // Return null when no items instead of showing a placeholder
  }

  return (
    <>
      {/* Floating Cart Button */}
      <AnimatePresence>
        {showFloatingCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
          >
            <motion.button
              onClick={() => setShowSummary(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border border-white/20 p-3 md:p-4"
              data-testid="floating-cart-button"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
                  >
                    {selectedServices.length}
                  </motion.div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/80">Total</div>
                  <div className="font-bold text-sm md:text-base">₹{finalTotal.toLocaleString()}</div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Sidebar Cart */}
      <AnimatePresence>
        {showSummary && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowSummary(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-gradient-to-br from-gray-900 to-black border-l border-white/10 backdrop-blur-xl z-50 overflow-y-auto safe-area-inset"
              data-testid="cart-sidebar"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  <span>Your Cart</span>
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSummary(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Services List */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {selectedServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm mb-1">{service.name}</h4>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                            Professional service with quality assurance
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-400 font-bold text-lg">₹{service.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleService(service)}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1 ml-3"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-xl p-6 border border-emerald-500/20 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Services ({selectedServices.length})</span>
                      <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {doorstepCharge > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Doorstep Charge</span>
                        <span className="text-yellow-400 font-medium">₹{doorstepCharge}</span>
                      </div>
                    )}
                    
                    <Separator className="bg-white/20" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold text-lg">Total Amount</span>
                      <span className="text-emerald-400 font-bold text-2xl">₹{finalTotal.toLocaleString()}</span>
                    </div>
                    
                    {doorstepCharge > 0 && (
                      <div className="text-xs text-yellow-400 bg-yellow-500/10 rounded-lg p-2 text-center">
                        💡 Free doorstep service on orders above ₹999
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setCurrentStep('details');
                      setShowSummary(false);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span>Proceed to Book</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowSummary(false)}
                    className="w-full border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Fine Print */}
                <div className="text-xs text-gray-500 text-center mt-6 space-y-1">
                  <p>*Prices exclude GST</p>
                  <p>*Final amount may vary based on actual work</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}