import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Car, Bike, ArrowRight, ArrowLeft, Search, Wrench 
} from 'lucide-react';
import { useBookingStore } from '@/store/booking';

export default function VehicleModel() {
  const [, setLocation] = useLocation();
  const { vehicle, vehicleModel, setVehicleModel } = useBookingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState(vehicleModel || '');

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setVehicleModel(model);
  };

  const handleContinue = () => {
    if (selectedModel) {
      setLocation('/book/services');
    }
  };

  const handleBack = () => {
    setLocation('/book');
  };

  // Vehicle models data
  const bikeModels = [
    { name: 'Honda Activa', popular: true },
    { name: 'TVS Jupiter', popular: true },
    { name: 'Hero Splendor', popular: true },
    { name: 'Bajaj Pulsar', popular: false },
    { name: 'Honda CB', popular: false },
    { name: 'Yamaha FZ', popular: false },
    { name: 'TVS Apache', popular: false },
    { name: 'Hero Xtreme', popular: false },
    { name: 'Bajaj Avenger', popular: false },
    { name: 'Royal Enfield', popular: false },
    { name: 'KTM Duke', popular: false },
    { name: 'Honda Dio', popular: false }
  ];

  const carModels = [
    { name: 'Maruti Swift', popular: true },
    { name: 'Hyundai i20', popular: true },
    { name: 'Maruti Alto', popular: true },
    { name: 'Tata Tiago', popular: false },
    { name: 'Honda City', popular: false },
    { name: 'Hyundai Creta', popular: false },
    { name: 'Maruti Baleno', popular: false },
    { name: 'Toyota Innova', popular: false },
    { name: 'Mahindra XUV', popular: false },
    { name: 'Tata Nexon', popular: false },
    { name: 'Honda Amaze', popular: false },
    { name: 'Hyundai Verna', popular: false }
  ];

  const currentModels = vehicle === 'bike' ? bikeModels : carModels;
  
  const filteredModels = currentModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularModels = filteredModels.filter(model => model.popular);
  const otherModels = filteredModels.filter(model => !model.popular);

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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
            <div className="w-12 h-0.5 bg-emerald-500"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">2</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">3</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">4</div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Change Vehicle Type
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {vehicle === 'bike' ? (
              <Bike className="w-8 h-8 text-emerald-400" />
            ) : (
              <Car className="w-8 h-8 text-emerald-400" />
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Select Your {vehicle === 'bike' ? 'Bike' : 'Car'} Model
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Choose your {vehicle} model for personalized service recommendations
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${vehicle} models...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-lg text-lg"
            />
          </div>
        </motion.div>

        {/* Popular Models */}
        {popularModels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Popular Models</h2>
              <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-2">
                Most Booked
              </Badge>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularModels.map((model, index) => {
                const isSelected = selectedModel === model.name;
                
                return (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' 
                          : 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/30'
                      }`}
                      onClick={() => handleModelSelect(model.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {vehicle === 'bike' ? (
                              <Bike className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            ) : (
                              <Car className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            )}
                            <span className="font-medium text-white">{model.name}</span>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                <ArrowRight className="w-3 h-3 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Other Models */}
        {otherModels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">All Models</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherModels.map((model, index) => {
                const isSelected = selectedModel === model.name;
                
                return (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' 
                          : 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/30'
                      }`}
                      onClick={() => handleModelSelect(model.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {vehicle === 'bike' ? (
                              <Bike className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            ) : (
                              <Car className={`w-6 h-6 ${isSelected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            )}
                            <span className="font-medium text-white">{model.name}</span>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                <ArrowRight className="w-3 h-3 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredModels.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No models found</h3>
            <p className="text-gray-300 mb-6">
              Try searching with a different keyword or browse all models
            </p>
            <Button 
              onClick={() => setSearchQuery('')}
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear Search
            </Button>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedModel}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-lg px-8 py-3 min-w-[200px]"
          >
            <Wrench className="w-5 h-5 mr-2" />
            Select Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}