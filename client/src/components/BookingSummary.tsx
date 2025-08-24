import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, X, ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { useLocation } from 'wouter';
import { useState } from 'react';

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
  const [, setLocation] = useLocation();
  
  const shouldReduceMotion = useReducedMotion();
  const subtotal = getSubtotal();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Calculate doorstep charge manually if function doesn't exist
  const doorstepCharge = subtotal > 0 && subtotal < 999 ? 99 : 0;
  const finalTotal = subtotal + doorstepCharge;
  
  const hasItems = selectedServices.length > 0;

  // Debug: log values
  console.log('Debug - Subtotal:', subtotal, 'Doorstep Charge:', doorstepCharge, 'Final Total:', finalTotal);


  if (!hasItems) {
    return (
      <Card className={`bg-white/3 border-white/10 backdrop-blur-xl ${className}`}>
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
      <Card className={`bg-white/3 border-white/10 backdrop-blur-xl ${isMobile ? 'sticky top-24' : 'fixed bottom-4 right-4 w-80 z-50'} overflow-hidden`}>
        <CardContent className={isMobile ? "p-3" : "p-4"}>
          {/* Header with collapse/expand for mobile */}
          <div className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-6"}`}>
            {isMobile && isCollapsed ? (
              /* Collapsed view - show total and expand button */
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <h3 className="text-white font-bold text-sm">Total: ₹{finalTotal.toLocaleString()}</h3>
                  {selectedServices.length > 0 && (
                    <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                      {selectedServices.length} items
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => {
                      setCurrentStep('location');
                      setLocation('/location');
                    }}
                    disabled={selectedServices.length === 0}
                    className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700 text-white py-1 px-3 text-xs font-semibold rounded-lg"
                  >
                    Continue
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Expanded view - normal header */
              <>
                <h3 className={`text-white font-bold ${isMobile ? "text-base" : "text-lg"}`}>Booking Summary</h3>
                <div className="flex items-center space-x-2">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCollapsed(true)}
                      className="text-gray-400 hover:text-white"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  )}
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSummary(false);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Collapsible content for mobile */}
          <AnimatePresence>
            {(!isMobile || !isCollapsed) && (
              <motion.div
                initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={isMobile ? { overflow: 'hidden' } : undefined}
              >

          {/* Selected Services */}
          {selectedServices.length > 0 && (
            <div className={isMobile ? "mb-3" : "mb-6"}>
              <h4 className={`text-gray-300 font-medium ${isMobile ? "text-xs mb-2" : "text-sm mb-3"}`}>Services</h4>
              <div className={isMobile ? "space-y-2" : "space-y-3"}>
                {selectedServices.map((service) => {
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      className={`flex items-center justify-between ${isMobile ? "p-2" : "p-3"} bg-white/3 rounded-lg`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-white font-medium truncate ${isMobile ? "text-xs" : "text-sm"}`}>
                          {service.name}
                        </p>
                        <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-xs"}`}>
                          ₹{service.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService(service);
                        }}
                        className="text-gray-400 hover:text-red-400 ml-2"
                      >
                        <X className={isMobile ? "w-3 h-3" : "w-3 h-3"} />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}


          {hasItems && (
            <>
              <Separator className={`bg-white/10 ${isMobile ? "mb-2" : "mb-4"}`} />
              
              {/* Pricing */}
              <div className={`space-y-1 ${isMobile ? "mb-3" : "mb-6"}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm"}`}>Services Total</span>
                  <span className={`text-white font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                
                {doorstepCharge > 0 && (
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm"}`}>Doorstep Charge</span>
                    <span className={`text-yellow-400 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
                      ₹{doorstepCharge}
                    </span>
                  </div>
                )}
                
                <div className={`border-t border-gray-700 ${isMobile ? "pt-1" : "pt-2"} flex justify-between items-center`}>
                  <span className={`text-gray-300 font-medium ${isMobile ? "text-sm" : "text-sm"}`}>Final Total</span>
                  <span className={`text-white font-bold ${isMobile ? "text-base" : "text-lg"}`}>
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>
                
                {isMobile && doorstepCharge > 0 && (
                  <div className="text-xs text-yellow-400 text-center">
                    Doorstep charge applies for orders below ₹999
                  </div>
                )}
                
                {!isMobile && doorstepCharge > 0 && (
                  <div className="text-xs text-yellow-400 bg-yellow-500/5 rounded p-2">
                    ℹ️ Doorstep charge applies for orders below ₹999
                  </div>
                )}
                
                {!isMobile && (
                  <div className="text-xs text-gray-400">
                    *Prices exclude GST. Final amount may vary based on actual work required.
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={!isMobile ? "mb-8" : ""}
              >
                <Button
                  onClick={() => {
                    setCurrentStep('location');
                    setLocation('/location');
                  }}
                  disabled={selectedServices.length === 0}
                  className={`w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 ${isMobile ? "py-2 text-sm" : "py-3"}`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Continue to Location</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </>
          )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}