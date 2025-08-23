import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Star, Gift } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServiceData } from '@/data/bookingServices';

interface ComboServiceCardProps {
  service: ServiceData;
  isSelected: boolean;
  onToggle: () => void;
}

export function ComboServiceCard({ 
  service, 
  isSelected, 
  onToggle
}: ComboServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Get icon component
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Wrench;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -6,
        transition: { type: "spring", stiffness: 400 }
      }}
      className="relative"
    >
      <Card className={`h-full transition-all duration-300 cursor-pointer group overflow-hidden ${
        isSelected 
          ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border-emerald-500/50 shadow-xl shadow-emerald-500/20' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
      onClick={onToggle}
      >
        {/* Enhanced Badge Layout */}
        <div className="absolute -top-3 left-4 right-4 z-10 flex justify-between items-start">
          {/* Left badges */}
          <div className="flex gap-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 shadow-lg">
                <Gift className="w-3 h-3 mr-1" />
                Combo
              </Badge>
            </motion.div>
            {service.popular && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs px-3 py-1.5 shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </motion.div>
            )}
          </div>
          
          {/* Savings Badge with Animation */}
          {service.savings && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
            >
              <Badge className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs px-3 py-1.5 shadow-lg shadow-orange-500/30">
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0.5)",
                      "0 0 10px rgba(255,255,255,0.8)",
                      "0 0 0px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {service.savings}
                </motion.span>
              </Badge>
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-6 pt-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  isSelected 
                    ? 'bg-gradient-to-br from-emerald-500 to-sky-600' 
                    : 'bg-gradient-to-br from-purple-600 to-pink-700 group-hover:from-emerald-500/20 group-hover:to-sky-600/20'
                }`}
                animate={isSelected && !shouldReduceMotion ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-white'}`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xl mb-1 truncate">
                  {service.name}
                </h3>
                <p className="text-gray-300 text-sm leading-tight">
                  {service.subtitle}
                </p>
              </div>
            </div>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
              }`}
            >
              {isSelected ? (
                <Check className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </motion.div>
          </div>

          {/* Enhanced Included Services - Show All */}
          {service.includedServices && (
            <motion.div 
              className="mb-6 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-white font-semibold text-sm">Complete Package Includes:</h4>
                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                  {service.includedServices.length} Services
                </Badge>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="grid grid-cols-1 gap-2">
                  {service.includedServices.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start space-x-3 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1), type: "spring", stiffness: 500 }}
                      >
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </div>
                
                {/* Value highlight */}
                <motion.div
                  className="mt-4 pt-3 border-t border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Package Value:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-semibold">All-in-One Deal</span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-3 h-3 text-emerald-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {/* Enhanced Price Section */}
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-xl p-4 border border-emerald-500/20">
              <div className="text-center">
                <div className="text-white font-bold">
                  <motion.span 
                    className="text-3xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    ₹{service.price.toLocaleString()}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="text-sm text-emerald-400 mt-2 font-semibold flex items-center justify-center gap-2"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Gift className="w-4 h-4" />
                  Complete Package Deal
                  <Gift className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}