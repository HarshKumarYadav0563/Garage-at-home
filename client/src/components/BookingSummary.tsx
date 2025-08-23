import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, X, ShoppingCart } from 'lucide-react';
import { useBookingStore } from '@/store/booking';

interface BookingSummaryProps {
  className?: string;
  isMobile?: boolean;
}

export function BookingSummary({ className = '', isMobile = false }: BookingSummaryProps) {
  const {
    selectedServices,
    selectedAddons,
    getSubtotal,
    getDoortepCharge,
    getFinalTotal,
    currentStep,
    setCurrentStep,
    toggleService,
    toggleAddon,
    showSummary,
    setShowSummary
  } = useBookingStore();
  
  const shouldReduceMotion = useReducedMotion();
  const subtotal = getSubtotal();
  
  // Calculate doorstep charge manually if function doesn't exist
  const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const finalTotal = subtotal + doorstepCharge;
  
  const hasItems = selectedServices.length > 0 || selectedAddons.length > 0;

  // Debug: log values
  console.log('Debug - Subtotal:', subtotal, 'Doorstep Charge:', doorstepCharge, 'Final Total:', finalTotal);


  if (!hasItems) {
    return (
      <Card className={`bg-white/5 border-white/10 backdrop-blur-xl ${className}`}>
        <CardContent className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            Select services to see pricing summary
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={isMobile ? { y: 100, opacity: 0 } : { x: 50, opacity: 0 }}
      animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      className={className}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl sticky top-24">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Booking Summary</h3>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSummary(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Selected Services */}
          {selectedServices.length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium text-sm mb-3">Services</h4>
              <div className="space-y-3">
                {selectedServices.map((service) => {
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {service.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          ₹{service.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleService(service)}
                        className="text-gray-400 hover:text-red-400 ml-2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Add-ons */}
          {selectedAddons.length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium text-sm mb-3">Add-ons</h4>
              <div className="space-y-3">
                {selectedAddons.map((addon) => {
                  return (
                    <motion.div
                      key={addon.id}
                      layout
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {addon.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          ₹{addon.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAddon(addon)}
                        className="text-gray-400 hover:text-red-400 ml-2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {hasItems && (
            <>
              <Separator className="bg-white/10 mb-4" />
              
              {/* Pricing */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Services Total</span>
                  <span className="text-white font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                
                {doorstepCharge > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Doorstep Charge</span>
                    <span className="text-yellow-400 font-medium">
                      ₹{doorstepCharge}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-2 flex justify-between items-center">
                  <span className="text-gray-300 text-sm font-medium">Final Total</span>
                  <span className="text-white font-bold text-lg">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>
                
                {doorstepCharge > 0 && (
                  <div className="text-xs text-yellow-400 bg-yellow-500/10 rounded p-2">
                    ℹ️ Doorstep charge applies for orders below ₹999
                  </div>
                )}
                
                <div className="text-xs text-gray-400">
                  *Prices exclude GST. Final amount may vary based on actual work required.
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => setCurrentStep('details')}
                  disabled={selectedServices.length === 0}
                  className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Continue to Details</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}