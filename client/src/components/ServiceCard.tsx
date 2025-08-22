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
      <Card className="group bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 ${gradient} rounded-xl flex items-center justify-center mr-4`}>
              <i className={`${icon} text-2xl text-white`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" data-testid={`service-name-${id}`}>
                {name}
              </h3>
              <p className="text-gray-600" data-testid={`service-description-${id}`}>
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle 
                  className={`w-4 h-4 ${vehicleType === 'bike' ? 'text-primary-500' : 'text-blue-500'}`} 
                />
                <span className="text-sm" data-testid={`service-feature-${id}-${index}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span 
                className={`text-2xl font-bold ${vehicleType === 'bike' ? 'text-primary-600' : 'text-blue-600'}`}
                data-testid={`service-price-${id}`}
              >
                ₹{basePrice}
              </span>
              <span className="text-gray-500 ml-2">onwards</span>
            </div>
            
            <Link href="/book">
              <Button
                className={`${
                  vehicleType === 'bike'
                    ? 'bg-primary-500 hover:bg-primary-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-6 py-2 rounded-lg transition-colors`}
                data-testid={`button-book-service-${id}`}
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
