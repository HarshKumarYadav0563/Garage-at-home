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
}

export function BookingServiceCard({ 
  service, 
  isSelected, 
  onToggle
}: BookingServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Get icon component
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Wrench;
  
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
    >
      <Card className={`h-full transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-sm ${
        isSelected 
          ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/15 to-indigo-500/20 border-emerald-500/70 shadow-xl shadow-emerald-500/30' 
          : 'bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/30 hover:shadow-2xl'
      }`}
      onClick={onToggle}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
          }}
        />
        
        {service.popular && (
          <motion.div 
            className="absolute -top-2 left-4 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
          >
            <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs px-3 py-1.5 shadow-lg">
              Popular
            </Badge>
          </motion.div>
        )}
        
        <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
              <motion.div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
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
                <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-lg sm:text-xl mb-1 sm:mb-2 truncate transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-white group-hover:text-white'
                }`}>
                  {service.name}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isSelected ? 'text-emerald-50' : 'text-gray-300 group-hover:text-gray-200'
                }`}>
                  {service.subtitle}
                </p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 text-gray-400 group-hover:bg-white/20 hover:text-white'
              }`}
            >
              <motion.div
                animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isSelected ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`rounded-xl p-4 border transition-all duration-300 ${
              isSelected 
                ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-emerald-500/30' 
                : 'bg-gradient-to-r from-white/5 to-white/10 border-white/10'
            }`}>
              <div className="text-center">
                <div className={`font-bold transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-white'
                }`}>
                  <motion.span 
                    className="text-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    ₹{service.price.toLocaleString()}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}