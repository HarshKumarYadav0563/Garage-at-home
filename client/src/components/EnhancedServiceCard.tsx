import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Star, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServicePricing, applyCityMultiplier, formatPriceRange } from '@/lib/pricing';
import { useBookingStore } from '@/stores/useBookingStore';
import { NCRCity } from '@shared/config/serviceAreas';

interface EnhancedServiceCardProps {
  service: ServicePricing;
  city: NCRCity;
  isSelected: boolean;
  onToggle: () => void;
  'data-testid'?: string;
}

export function EnhancedServiceCard({ 
  service, 
  city,
  isSelected, 
  onToggle,
  'data-testid': testId
}: EnhancedServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Apply city multiplier to pricing
  const cityAdjustedPrice = applyCityMultiplier(service.priceRange, city);
  const priceDisplay = formatPriceRange(cityAdjustedPrice);
  
  // Get category color scheme
  const getCategoryColors = (category: string) => {
    switch (category) {
      case 'maintenance': return 'from-emerald-500/15 via-green-500/10 to-teal-500/15 border-emerald-500/60';
      case 'repair': return 'from-orange-500/15 via-red-500/10 to-pink-500/15 border-orange-500/60';
      case 'enhancement': return 'from-purple-500/15 via-indigo-500/10 to-blue-500/15 border-purple-500/60';
      case 'emergency': return 'from-red-500/15 via-pink-500/10 to-rose-500/15 border-red-500/60';
      default: return 'from-gray-500/15 via-slate-500/10 to-zinc-500/15 border-gray-500/60';
    }
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="relative"
      data-testid={testId}
    >
      <Card className={`h-full transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-sm ${
        isSelected 
          ? `bg-gradient-to-br ${getCategoryColors(service.category)} shadow-xl shadow-${service.category === 'maintenance' ? 'emerald' : service.category === 'repair' ? 'orange' : service.category === 'enhancement' ? 'purple' : 'red'}-500/25` 
          : 'bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/30 hover:shadow-2xl'
      }`}
      onClick={onToggle}
      >
        {/* Popular badge */}
        {service.popular && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
          }}
        />
        
        <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-emerald-500 to-sky-600 shadow-lg shadow-emerald-500/30' 
                    : 'bg-gradient-to-br from-gray-600/50 to-gray-700/50 group-hover:from-emerald-500/30 group-hover:to-sky-600/30'
                }`}
                animate={isSelected && !shouldReduceMotion ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
              >
                <Icons.Wrench className={`w-6 h-6 transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg mb-1 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.subtitle}
                </p>
                
                {/* Duration */}
                {service.duration && (
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.duration}
                  </div>
                )}
              </div>
            </div>
            
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 text-gray-400 group-hover:bg-emerald-500/20'
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
          
          {/* Spacer to push price to bottom */}
          <div className="flex-1" />
          
          {/* Price display */}
          <motion.div 
            className="bg-white/5 rounded-xl p-3 border border-white/10 mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-center">
              <div className="text-white font-bold">
                <span className="text-xl">{priceDisplay}</span>
              </div>
              <div className="text-xs text-emerald-400 mt-1 font-medium capitalize">
                {service.category}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}