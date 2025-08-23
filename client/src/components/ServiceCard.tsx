import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 ${gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4`}>
              <i className={`${icon} text-xl sm:text-2xl text-white`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 dark:text-gray-100" data-testid={`service-name-${id}`}>
                {name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300" data-testid={`service-description-${id}`}>
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 flex-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3 py-1">
                <CheckCircle 
                  className={`w-4 h-4 ${vehicleType === 'bike' ? 'text-primary-500' : 'text-blue-500'} flex-shrink-0`} 
                />
                <span className="text-xs sm:text-sm dark:text-gray-200" data-testid={`service-feature-${id}-${index}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mt-auto">
            <div>
              <span 
                className={`text-xl sm:text-2xl font-bold ${vehicleType === 'bike' ? 'text-primary-600' : 'text-blue-600'}`}
                data-testid={`service-price-${id}`}
              >
                ₹{basePrice}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm sm:text-base">onwards</span>
            </div>
            
            <Link 
              href={`/book?service=${id}&vehicleType=${vehicleType}`}
              data-testid={`book-service-${id}`}
              className="w-full sm:w-auto"
            >
              <Button
                className={`w-full sm:w-auto ${
                  vehicleType === 'bike' 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                } text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 min-h-[44px] touch-manipulation text-sm sm:text-base`}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
