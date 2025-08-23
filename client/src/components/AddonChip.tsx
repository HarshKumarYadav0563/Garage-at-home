import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Check, Plus } from 'lucide-react';
import { AddonData } from '@/data/bookingServices';

interface AddonChipProps {
  addon: AddonData;
  isSelected: boolean;
  onToggle: () => void;
  adjustedPrice: { min: number; max: number };
  showRange: boolean;
}

export function AddonChip({ 
  addon, 
  isSelected, 
  onToggle, 
  adjustedPrice, 
  showRange 
}: AddonChipProps) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.05,
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        show: { opacity: 1, y: 0, scale: 1 }
      }}
    >
      <div
        onClick={onToggle}
        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${
          isSelected 
            ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-red-500/20 border-purple-500/60 shadow-xl shadow-purple-500/25' 
            : 'bg-white/8 border-white/15 hover:bg-white/12 hover:border-purple-500/30 hover:shadow-xl'
        }`}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)'
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-bold text-lg">{addon.name}</h4>
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/10 text-gray-400 hover:bg-purple-500/20'
              }`}
              animate={isSelected && !shouldReduceMotion ? {
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              } : {}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              {isSelected ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {addon.description}
          </p>
          
          <motion.div 
            className="bg-white/5 rounded-xl p-3 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-center">
              {showRange ? (
                <div className="text-white font-bold">
                  <span className="text-xl">₹{adjustedPrice.min.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm mx-2"> - </span>
                  <span className="text-xl">₹{adjustedPrice.max.toLocaleString()}</span>
                </div>
              ) : (
                <div className="text-white font-bold">
                  <span className="text-gray-400 text-xs">from </span>
                  <span className="text-xl">₹{adjustedPrice.min.toLocaleString()}</span>
                </div>
              )}
              <div className="text-xs text-purple-400 mt-1 font-medium">
                Optional upgrade
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}