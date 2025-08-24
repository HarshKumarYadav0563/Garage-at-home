import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Star, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServiceData } from '@/data/bookingServices';
import { useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get icon component
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Wrench;
  
  // Show only first 3 services by default
  const visibleServices = service.includedServices?.slice(0, 3) || [];
  const hiddenServices = service.includedServices?.slice(3) || [];
  const hasMoreServices = hiddenServices.length > 0;
  
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
      <Card className={`h-full min-h-[400px] max-h-[450px] transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col ${
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
        
        <CardContent className="p-4 md:p-6 pt-8 h-full flex flex-col justify-between">
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
                <h3 className="text-white font-bold text-lg mb-1 truncate">
                  {service.name}
                </h3>
                <p className="text-gray-300 text-xs leading-tight line-clamp-1">
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

          {/* Compact Service Highlights */}
          <div className="flex-1 mb-4">
            {service.includedServices && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-white font-semibold text-sm">Package Includes:</h4>
                  <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                    {service.includedServices.length} Services
                  </Badge>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="space-y-2">
                    {/* Always visible top 3 services */}
                    {visibleServices.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-2 text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.05) }}
                      >
                        <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </motion.div>
                    ))}
                    
                    {/* Expandable additional services */}
                    <AnimatePresence>
                      {isExpanded && hiddenServices.map((item, index) => (
                        <motion.div 
                          key={`hidden-${index}`} 
                          className="flex items-start space-x-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, height: 0, x: -10 }}
                          animate={{ opacity: 1, height: 'auto', x: 0 }}
                          exit={{ opacity: 0, height: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* View More/Less toggle */}
                    {hasMoreServices && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(!isExpanded);
                        }}
                        className="flex items-center space-x-1 text-emerald-400 text-xs underline cursor-pointer hover:text-emerald-300 transition-colors mt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{isExpanded ? 'View Less' : `+ View ${hiddenServices.length} More`}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sticky Footer with Price and CTA */}
          <motion.div 
            className="mt-auto pt-3 border-t border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-3">
              <motion.div 
                className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 font-bold text-2xl"
                whileHover={{ scale: 1.05 }}
              >
                ₹{service.price.toLocaleString()}
              </motion.div>
              <p className="text-xs text-gray-400 mt-1">Complete Package Deal</p>
            </div>
            
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className={`w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-emerald-400' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {isSelected ? (
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex items-center space-x-2"
                    whileHover={{ x: 2 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Book Now</span>
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}