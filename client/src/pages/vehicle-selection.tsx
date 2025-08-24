import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Car, Bike, ArrowRight, Wrench, MapPin, Clock, Shield 
} from 'lucide-react';
import { useBookingStore } from '@/store/booking';

export default function VehicleSelection() {
  const [, setLocation] = useLocation();
  const { setVehicleAndCity } = useBookingStore();
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'car' | null>(null);

  const handleVehicleSelect = (vehicleType: 'bike' | 'car') => {
    setSelectedVehicle(vehicleType);
    setVehicleAndCity(vehicleType, 'delhi'); // Set default city
  };

  const handleContinue = () => {
    if (selectedVehicle) {
      setLocation('/book/model');
    }
  };

  const vehicles = [
    {
      type: 'bike' as const,
      icon: Bike,
      title: 'Bike Services',
      subtitle: 'Two-wheeler maintenance & repair',
      features: ['Oil Change', 'Brake Service', 'Chain Cleaning', 'General Service'],
      price: 'Starting from ₹299',
      popular: true
    },
    {
      type: 'car' as const,
      icon: Car,
      title: 'Car Services', 
      subtitle: 'Four-wheeler maintenance & repair',
      features: ['Oil Change', 'AC Service', 'Battery Check', 'Brake Service'],
      price: 'Starting from ₹999',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"
          animate={{
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">1</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">2</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">3</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">4</div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Vehicle
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Choose your vehicle type to get started
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Available in NCR</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Same Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Certified Mechanics</span>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {vehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon;
            const isSelected = selectedVehicle === vehicle.type;
            
            return (
              <motion.div
                key={vehicle.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-300 h-full ${
                    isSelected 
                      ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' 
                      : 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/30'
                  }`}
                  onClick={() => handleVehicleSelect(vehicle.type)}
                >
                  {vehicle.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      
                      {/* Icon */}
                      <motion.div
                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-emerald-500 to-sky-500' 
                            : 'bg-white/10'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-2">{vehicle.title}</h3>
                      <p className="text-gray-300 mb-4">{vehicle.subtitle}</p>
                      
                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {vehicle.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-300">
                            <Wrench className="w-3 h-3 text-emerald-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      {/* Price */}
                      <div className="text-lg font-semibold text-emerald-400 mb-4">
                        {vehicle.price}
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedVehicle}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-lg px-8 py-3 min-w-[200px]"
          >
            Continue to Model
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}