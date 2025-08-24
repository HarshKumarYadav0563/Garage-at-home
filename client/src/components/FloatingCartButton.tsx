import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookingStore } from '@/stores/useBookingStore';

export function FloatingCartButton() {
  const { 
    showCartFab,
    selectedServices, 
    selectedAddons, 
    estimate,
    setShowSummaryDrawer 
  } = useBookingStore();

  const itemCount = selectedServices.length + selectedAddons.length;
  const total = estimate?.total.min || 0;

  if (!showCartFab || itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setShowSummaryDrawer(true)}
          className="relative bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white shadow-xl border-0 rounded-full p-4 h-14 min-w-[200px] group"
          data-testid="button-floating-cart"
        >
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-ping opacity-20" />
          
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </Badge>
              )}
            </div>
            
            <div className="text-left">
              <div className="text-sm font-medium">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </div>
              {total > 0 && (
                <div className="text-xs opacity-90">
                  ₹{total}+
                </div>
              )}
            </div>
            
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}