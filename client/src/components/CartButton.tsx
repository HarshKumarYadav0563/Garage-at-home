import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

export function CartButton() {
  const { itemCount, total, isOpen, toggle } = useCartStore();
  
  if (itemCount === 0) return null;
  
  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white rounded-2xl px-4 py-3 shadow-2xl shadow-emerald-500/25 backdrop-blur-sm border border-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <motion.div
              key={itemCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {itemCount}
            </motion.div>
          </div>
          
          <div className="text-left">
            <div className="text-sm font-semibold">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </div>
            <div className="text-xs opacity-90">
              ₹{total.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.button>
    </AnimatePresence>
  );
}