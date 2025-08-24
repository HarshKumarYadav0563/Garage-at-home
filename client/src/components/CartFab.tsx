import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useEffect } from 'react';

export function CartFab() {
  const { itemCount, totals, openCart } = useCartStore();
  
  // Keyboard shortcut
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        useCartStore.getState().toggleCart();
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
  
  if (itemCount === 0) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={openCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-14 w-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg grid place-items-center group overflow-hidden"
        >
          {/* Gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Cart icon */}
          <ShoppingCart className="w-6 h-6 text-white relative z-10" />
          
          {/* Badge */}
          <motion.div
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs font-bold grid place-items-center"
          >
            <motion.span
              key={itemCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {itemCount}
            </motion.span>
          </motion.div>
          
          {/* Total preview */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-lg px-2 py-1 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10"
            initial={false}
          >
            ₹{totals.min.toLocaleString()}–₹{totals.max.toLocaleString()}
          </motion.div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}