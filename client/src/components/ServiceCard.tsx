import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, Car, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

interface ServiceCardProps {
  id: string;
  name: string;
  vehicleType: 'bike' | 'car';
  description: string;
  basePrice: number;
  features: string[];
  icon: string;
  gradient: string;
}

export function ServiceCard({
  id,
  name,
  vehicleType,
  description,
  basePrice,
  features,
  icon,
  gradient,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const IconComponent = icon === 'motorcycle' ? Bike : Car;
  
  const floatAnimation = shouldReduceMotion ? {} : {
    y: [0, -2, 0, 1, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { 
        y: -6, 
        rotateX: 1, 
        rotateY: -0.5,
        scale: 1.01
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }}
      className="h-full"
    >
      <Card className="group relative h-full bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 md:p-6 lg:p-8 shadow-[0_8px_30px_rgba(2,6,23,0.06)] hover:shadow-[0_20px_50px_rgba(2,6,23,0.12)] transition-all duration-500 overflow-hidden">
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
        
        <CardContent className="p-0 h-full flex flex-col relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-5 md:mb-6">
            {/* Enhanced icon with floating animation */}
            <div className="relative mb-3 sm:mb-0 sm:mr-5">
              <motion.div 
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                animate={shouldReduceMotion ? {} : floatAnimation}
              >
                <IconComponent 
                  className="w-7 h-7 md:w-8 md:h-8 text-white" 
                  aria-hidden="true"
                />
                
                {/* Hover glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md scale-110" />
              </motion.div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 group-hover:text-gray-800 transition-colors" data-testid={`service-name-${id}`}>
                {name}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed" data-testid={`service-description-${id}`}>
                {description}
              </p>
            </div>
          </div>

          {/* Enhanced features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-7 flex-1">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 py-1.5 px-2 rounded-lg hover:bg-gray-50/50 transition-colors"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle 
                  className={`w-4 h-4 flex-shrink-0 ${
                    vehicleType === 'bike' 
                      ? 'text-emerald-500' 
                      : 'text-blue-500'
                  }`} 
                />
                <span className="text-sm md:text-base text-gray-700 font-medium" data-testid={`service-feature-${id}-${index}`}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Enhanced pricing and CTA */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-auto pt-4 border-t border-gray-100">
            <div>
              <span 
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${
                  vehicleType === 'bike' 
                    ? 'from-emerald-600 to-teal-600' 
                    : 'from-blue-600 to-indigo-600'
                } bg-clip-text text-transparent`}
                data-testid={`service-price-${id}`}
              >
                ₹{basePrice}
              </span>
              <span className="text-gray-500 ml-2 text-base">onwards</span>
            </div>
            
            <Link 
              href={`/book?service=${id}&vehicleType=${vehicleType}`}
              data-testid={`book-service-${id}`}
              className="w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className={`w-full sm:w-auto bg-gradient-to-r ${
                    vehicleType === 'bike' 
                      ? 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' 
                      : 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                  } text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] touch-manipulation`}
                >
                  Book Now
                </Button>
              </motion.div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
