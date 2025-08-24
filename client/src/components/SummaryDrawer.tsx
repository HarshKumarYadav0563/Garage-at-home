import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight, X, ShoppingCart, Trash2, Edit3 } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { getServiceById, getAddonById, formatPriceRange } from '@/lib/pricing';
import { CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

interface SummaryDrawerProps {
  className?: string;
  onContinue?: () => void;
}

export function SummaryDrawer({ className = '', onContinue }: SummaryDrawerProps) {
  const {
    selectedServices,
    selectedAddons,
    selectedVehicle,
    selectedCity,
    estimate,
    showSummary,
    setShowSummary,
    currentStep,
    setCurrentStep,
    toggleService,
    toggleAddon,
    canProceedToStep
  } = useBookingStore();
  
  const hasItems = selectedServices.length > 0;
  const canContinue = canProceedToStep('customer');

  const handleContinue = () => {
    if (canContinue) {
      setCurrentStep('customer');
      setShowSummary(false);
      onContinue?.();
    }
  };

  const handleRemoveService = (serviceId: string) => {
    toggleService(serviceId);
  };

  const handleRemoveAddon = (addonId: string) => {
    toggleAddon(addonId);
  };

  if (!hasItems) {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 border-t border-white/20 backdrop-blur-xl"
            >
              <div className="p-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Booking Summary</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSummary(false)}
                    className="text-gray-400 hover:text-white"
                    data-testid="close-summary"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <SummaryContent
                  selectedServices={selectedServices}
                  selectedAddons={selectedAddons}
                  selectedVehicle={selectedVehicle}
                  selectedCity={selectedCity}
                  estimate={estimate}
                  onRemoveService={handleRemoveService}
                  onRemoveAddon={handleRemoveAddon}
                />

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3"
                    data-testid="continue-booking"
                  >
                    Continue to Customer Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Booking Summary</h3>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <SummaryContent
            selectedServices={selectedServices}
            selectedAddons={selectedAddons}
            selectedVehicle={selectedVehicle}
            selectedCity={selectedCity}
            estimate={estimate}
            onRemoveService={handleRemoveService}
            onRemoveAddon={handleRemoveAddon}
          />

          <div className="mt-6 pt-4 border-t border-white/10">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3"
              data-testid="continue-booking-desktop"
            >
              Continue to Customer Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <AnimatePresence>
        {hasItems && !showSummary && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-6 right-4 z-40 lg:hidden"
          >
            <motion.button
              onClick={() => setShowSummary(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full p-4 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border border-white/20"
              data-testid="open-summary-fab"
            >
              <div className="flex items-center space-x-3">
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
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatPriceRange(estimate?.total || { min: 0, max: 0 })}
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface SummaryContentProps {
  selectedServices: string[];
  selectedAddons: string[];
  selectedVehicle: 'bike' | 'car';
  selectedCity: string;
  estimate?: any;
  onRemoveService: (serviceId: string) => void;
  onRemoveAddon: (addonId: string) => void;
}

function SummaryContent({
  selectedServices,
  selectedAddons,
  selectedVehicle,
  selectedCity,
  estimate,
  onRemoveService,
  onRemoveAddon
}: SummaryContentProps) {
  return (
    <div className="space-y-4">
      {/* Vehicle & Location */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Service for</span>
          <span className="text-white font-medium">
            {VEHICLE_DISPLAY_NAMES[selectedVehicle]} in {CITY_DISPLAY_NAMES[selectedCity as keyof typeof CITY_DISPLAY_NAMES]}
          </span>
        </div>
      </div>

      {/* Selected Services */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Selected Services</h4>
        {selectedServices.map((serviceId) => {
          const service = getServiceById(serviceId, selectedVehicle);
          if (!service) return null;
          
          return (
            <motion.div
              key={serviceId}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
            >
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{service.title}</div>
                <div className="text-gray-400 text-xs">{formatPriceRange(service.priceRange)}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveService(serviceId)}
                className="text-gray-400 hover:text-red-400 p-1 h-auto"
                data-testid={`remove-service-${serviceId}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Add-ons */}
      {selectedAddons.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">Add-ons</h4>
          {selectedAddons.map((addonId) => {
            const addon = getAddonById(addonId);
            if (!addon) return null;
            
            return (
              <motion.div
                key={addonId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between bg-purple-500/10 rounded-lg p-3 border border-purple-500/20"
              >
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{addon.title}</div>
                  <div className="text-purple-400 text-xs">{formatPriceRange(addon.priceRange)}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveAddon(addonId)}
                  className="text-gray-400 hover:text-red-400 p-1 h-auto"
                  data-testid={`remove-addon-${addonId}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Price Breakdown */}
      {estimate && (
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white">{formatPriceRange(estimate.subtotal)}</span>
          </div>
          
          {estimate.addons.min > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Add-ons</span>
              <span className="text-white">{formatPriceRange(estimate.addons)}</span>
            </div>
          )}
          
          {estimate.doorstepCharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Doorstep Charge</span>
              <span className="text-white">₹{estimate.doorstepCharge}</span>
            </div>
          )}
          
          <Separator className="bg-white/10" />
          
          <div className="flex justify-between text-base font-bold">
            <span className="text-white">Total</span>
            <span className="text-emerald-400">{formatPriceRange(estimate.total)}</span>
          </div>
          
          <div className="text-xs text-gray-400 text-center">
            *Final price may vary based on actual requirements
          </div>
        </div>
      )}
    </div>
  );
}