import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Info } from 'lucide-react';
import { AddonPricing, applyCityMultiplier, formatPriceRange } from '@/lib/pricing';
import { NCRCity } from '@shared/config/serviceAreas';

interface EnhancedAddonChipProps {
  addon: AddonPricing;
  city: NCRCity;
  isSelected: boolean;
  onToggle: () => void;
  'data-testid'?: string;
}

export function EnhancedAddonChip({ 
  addon, 
  city,
  isSelected, 
  onToggle,
  'data-testid': testId
}: EnhancedAddonChipProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Apply city multiplier to pricing
  const cityAdjustedPrice = applyCityMultiplier(addon.priceRange, city);
  const priceDisplay = formatPriceRange(cityAdjustedPrice);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.03,
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      whileTap={{ scale: 0.97 }}
      className="relative"
      data-testid={testId}
    >
      <div
        onClick={onToggle}
        className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${
          isSelected 
            ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-indigo-500/20 border-purple-500/60 shadow-xl shadow-purple-500/25' 
            : 'bg-white/5 border-white/15 hover:bg-white/8 hover:border-purple-500/30 hover:shadow-lg'
        }`}
      >
        {/* Required badge */}
        {addon.required && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs px-2 py-1">
              Required
            </Badge>
          </div>
        )}

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-3">
              <h4 className="text-white font-bold text-base sm:text-lg mb-1 leading-tight">
                {addon.title}
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {addon.description}
              </p>
            </div>
            
            <motion.div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                isSelected 
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/10 text-gray-400 hover:bg-purple-500/20'
              }`}
              animate={isSelected && !shouldReduceMotion ? {
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              } : {}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              {isSelected ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </motion.div>
          </div>
          
          {/* Price display */}
          <motion.div 
            className="bg-white/5 rounded-lg p-3 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-sm sm:text-base">
                  {priceDisplay}
                </div>
                <div className="text-xs text-purple-400 mt-0.5 font-medium">
                  Optional upgrade
                </div>
              </div>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}