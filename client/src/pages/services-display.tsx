import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Wrench, Car, Bike, ArrowRight, Shield, Clock, 
  Search, MapPin, Star
} from 'lucide-react';

// Data
import { BIKE_SERVICES, CAR_SERVICES } from '@/data/bookingServices';

export default function ServicesDisplay() {
  const [, setLocation] = useLocation();
  const [selectedVehicle, setSelectedVehicle] = useState<'bike' | 'car'>('bike');
  const [searchQuery, setSearchQuery] = useState('');

  // Get current services based on vehicle type
  const currentServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;

  // Filter services
  const filteredServices = useMemo(() => {
    return currentServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentServices, searchQuery]);

  const comboServices = filteredServices.filter(service => service.type === 'combo');
  const individualServices = filteredServices.filter(service => service.type === 'individual' || !service.type);

  const handleBookNow = () => {
    setLocation('/book');
  };

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Professional vehicle maintenance at your doorstep
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={handleBookNow}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 text-lg px-8 py-3"
          >
            <Wrench className="w-5 h-5 mr-2" />
            Book Service Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Vehicle & Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            
            {/* Vehicle Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex bg-white/10 rounded-lg p-1">
                <motion.button
                  onClick={() => setSelectedVehicle('bike')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedVehicle === 'bike'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bike className="w-5 h-5" />
                  <span>Bike Services</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setSelectedVehicle('car')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedVehicle === 'car'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Car className="w-5 h-5" />
                  <span>Car Services</span>
                </motion.button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${selectedVehicle} services...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-lg"
                />
              </div>
            </div>

            {/* Service Area Info */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Available in NCR Region</span>
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
          </div>
        </motion.div>

        {/* Service Packages */}
        {comboServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Service Packages
                </h2>
                <p className="text-gray-300">
                  Comprehensive care bundles with maximum savings
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-2">
                Best Value
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comboServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1) }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                          <p className="text-gray-300 text-sm mb-4">{service.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-400">₹{service.basePrice}</div>
                          {service.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">₹{service.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      
                      {service.features && (
                        <div className="space-y-2 mb-4">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <Star className="w-3 h-3 text-emerald-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>✓ Doorstep Service</span>
                        <span>✓ Certified Mechanics</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Individual Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Individual Services
            </h2>
            <p className="text-gray-300">
              Choose specific services as per your {selectedVehicle}'s needs
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {individualServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{service.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-emerald-400">₹{service.basePrice}</div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration || '1-2 hrs'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Book?</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Get professional vehicle service at your doorstep. Choose from our comprehensive packages or individual services.
            </p>
            <Button
              onClick={handleBookNow}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 text-lg px-8 py-3"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Start Booking Process
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}