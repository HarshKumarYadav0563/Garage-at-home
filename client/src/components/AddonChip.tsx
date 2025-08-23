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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        onClick={onToggle}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'bg-white/10 border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
            : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm">{addon.name}</h4>
          <motion.div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              isSelected 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white/10 text-gray-400'
            }`}
            animate={isSelected && !shouldReduceMotion ? {
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {isSelected ? (
              <Check className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
          </motion.div>
        </div>
        
        <p className="text-gray-400 text-xs mb-3 leading-tight">
          {addon.description}
        </p>
        
        <div className="text-right">
          {showRange ? (
            <div className="text-white font-semibold text-sm">
              ₹{adjustedPrice.min} - ₹{adjustedPrice.max}
            </div>
          ) : (
            <div className="text-white font-semibold text-sm">
              <span className="text-gray-400 text-xs">from </span>
              ₹{adjustedPrice.min}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}