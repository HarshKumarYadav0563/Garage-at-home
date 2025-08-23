import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServiceData } from '@/data/bookingServices';
import { useBookingStore } from '@/store/booking';

interface BookingServiceCardProps {
  service: ServiceData;
  isSelected: boolean;
  onToggle: () => void;
  adjustedPrice: { min: number; max: number };
  showRange: boolean;
}

export function BookingServiceCard({ 
  service, 
  isSelected, 
  onToggle, 
  adjustedPrice, 
  showRange 
}: BookingServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Get icon component
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Wrench;
  
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -4,
        transition: { type: "spring", stiffness: 400 }
      }}
      className="relative"
    >
      <Card className={`h-full transition-all duration-300 cursor-pointer group ${
        isSelected 
          ? 'bg-white/10 border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
      onClick={onToggle}
      >
        {service.popular && (
          <div className="absolute -top-2 left-4 z-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs px-2 py-1">
              Popular
            </Badge>
          </div>
        )}
        
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected 
                    ? 'bg-gradient-to-br from-emerald-500 to-sky-600' 
                    : 'bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-emerald-500/20 group-hover:to-sky-600/20'
                }`}
                animate={isSelected && !shouldReduceMotion ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-1 truncate">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm leading-tight">
                  {service.subtitle}
                </p>
              </div>
            </div>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
              }`}
            >
              {isSelected ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.div>
          </div>
          
          <div className="mt-auto">
            <div className="text-right">
              {showRange ? (
                <div className="text-white font-bold">
                  <span className="text-lg">₹{adjustedPrice.min.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm"> - </span>
                  <span className="text-lg">₹{adjustedPrice.max.toLocaleString()}</span>
                </div>
              ) : (
                <div className="text-white font-bold">
                  <span className="text-gray-400 text-sm">from </span>
                  <span className="text-lg">₹{adjustedPrice.min.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.li>
  );
}