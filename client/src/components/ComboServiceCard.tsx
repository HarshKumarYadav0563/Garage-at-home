import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Star, Gift, Wrench } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServiceData } from '@/data/bookingServices';

interface ComboServiceCardProps {
  service: ServiceData;
  isSelected: boolean;
  onToggle: () => void;
  adjustedPrice: { min: number; max: number };
  showRange: boolean;
}

export function ComboServiceCard({ 
  service, 
  isSelected, 
  onToggle, 
  adjustedPrice, 
  showRange 
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
        {/* Service Type Badge */}
        <div className="absolute -top-2 left-4 z-10 flex gap-2">
          {service.type === 'combo' ? (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1">
              <Gift className="w-3 h-3 mr-1" />
              Combo Package
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-2 py-1">
              <Wrench className="w-3 h-3 mr-1" />
              Service
            </Badge>
          )}
          {service.popular && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs px-2 py-1">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        {/* Savings Badge */}
        {service.savings && (
          <div className="absolute -top-2 right-4 z-10">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1">
              {service.savings}
            </Badge>
          </div>
        )}
        
        <CardContent className="p-6 h-full flex flex-col">
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

          {/* Service Details */}
          <div className="mb-4 flex-1">
            {service.includedServices ? (
              <>
                <h4 className="text-gray-300 font-medium text-sm mb-3">What's Included:</h4>
                <ul className="space-y-1">
                  {service.includedServices.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-400 text-xs">
                      <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {service.includedServices.length > 4 && (
                    <li className="text-gray-500 text-xs font-medium">
                      +{service.includedServices.length - 4} more services
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <>
                <h4 className="text-gray-300 font-medium text-sm mb-3">Service Details:</h4>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Professional {service.name.toLowerCase()} with expert care and quality parts. Quick and reliable service at your doorstep.
                </div>
              </>
            )}
          </div>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="text-right">
              {showRange ? (
                <div className="text-white font-bold">
                  <span className="text-2xl">₹{adjustedPrice.min.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm"> - </span>
                  <span className="text-2xl">₹{adjustedPrice.max.toLocaleString()}</span>
                </div>
              ) : (
                <div className="text-white font-bold">
                  <span className="text-gray-400 text-sm">from </span>
                  <span className="text-2xl">₹{adjustedPrice.min.toLocaleString()}</span>
                </div>
              )}
              <div className="text-xs text-emerald-400 mt-1 font-medium">
                {service.type === 'combo' ? 'Complete package deal' : 'Professional service'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}