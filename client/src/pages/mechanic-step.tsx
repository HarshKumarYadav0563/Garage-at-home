import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, MapPin, Clock, ArrowLeft, ArrowRight, 
  Shield, CheckCircle, User, Wrench 
} from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { useLocation } from 'wouter';
import { getNearbyMechanics, filterMechanicsByVehicle } from '@/data/mechanicData';
import type { Mechanic } from '@/store/booking';

export default function MechanicStep() {
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  const [, setLocationRoute] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    address, 
    selectedVehicle,
    selectedMechanic,
    nearbyMechanics,
    setSelectedMechanic,
    setNearbyMechanics,
    setCurrentStep 
  } = useBookingStore();

  // Load nearby mechanics when component mounts
  useEffect(() => {
    const loadMechanics = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mechanics = getNearbyMechanics(address.lat, address.lng);
        const filteredMechanics = filterMechanicsByVehicle(mechanics, selectedVehicle);
        
        setNearbyMechanics(filteredMechanics);
        
        toast({
          title: "Mechanics Found",
          description: `Found ${filteredMechanics.length} nearby mechanics for your ${selectedVehicle}`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load nearby mechanics. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMechanics();
  }, [address.lat, address.lng, selectedVehicle, setNearbyMechanics, toast]);

  const handleMechanicSelect = (mechanic: Mechanic) => {
    if (!mechanic.isAvailable) {
      toast({
        title: "Mechanic Unavailable",
        description: "This mechanic is currently busy. Please select another one.",
        variant: "destructive"
      });
      return;
    }

    setSelectedMechanic(mechanic);
    toast({
      title: "Mechanic Selected",
      description: `${mechanic.name} has been selected for your service.`,
    });
  };

  const handleContinue = () => {
    if (!selectedMechanic) {
      toast({
        title: "Select a Mechanic",
        description: "Please select a mechanic to continue with your booking.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('details');
    setLocationRoute('/details');
  };

  const handleBack = () => {
    setCurrentStep('location');
    setLocationRoute('/location');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-white font-semibold mb-2">Finding Nearby Mechanics</h2>
          <p className="text-gray-400">Searching for the best mechanics in your area...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Location
          </Button>
          
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Mechanic</h1>
          <p className="text-gray-300">
            Choose from our verified mechanics near {address.city || 'your location'}
          </p>
        </motion.div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white font-medium">Service Location</p>
                  <p className="text-gray-400 text-sm">{address.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {nearbyMechanics.map((mechanic, index) => (
            <motion.div
              key={mechanic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <Card 
                className={`bg-white/5 border-white/10 hover:bg-white/8 transition-all cursor-pointer ${
                  selectedMechanic?.id === mechanic.id ? 'ring-2 ring-emerald-500 bg-emerald-500/10' : ''
                } ${!mechanic.isAvailable ? 'opacity-60' : ''}`}
                onClick={() => handleMechanicSelect(mechanic)}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{mechanic.name}</h3>
                        <p className="text-gray-400 text-sm">{mechanic.experience} years experience</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{mechanic.rating}</span>
                        <span className="text-gray-400 text-sm">({mechanic.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-400">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{mechanic.distance} km away</span>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mechanic.specialization.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs text-emerald-400 border-emerald-500/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {mechanic.specialization.length > 3 && (
                        <Badge variant="outline" className="text-xs text-gray-400 border-gray-500/30">
                          +{mechanic.specialization.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-white">
                        <Wrench className="w-4 h-4" />
                        <span className="font-semibold">{mechanic.completedJobs}</span>
                      </div>
                      <p className="text-gray-400 text-xs">Jobs Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-white">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold text-sm">{mechanic.responseTime}</span>
                      </div>
                      <p className="text-gray-400 text-xs">Response Time</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {mechanic.isAvailable ? (
                        <>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm font-medium">Available Now</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-red-400 text-sm font-medium">Currently Busy</span>
                        </>
                      )}
                    </div>
                    
                    {selectedMechanic?.id === mechanic.id && (
                      <div className="flex items-center space-x-1 text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 text-sm">Verified Professional</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedMechanic}
            className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue with {selectedMechanic?.name || 'Selected Mechanic'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {selectedMechanic && (
            <p className="text-gray-400 text-sm mt-3">
              Response time: {selectedMechanic.responseTime} • {selectedMechanic.distance} km away
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}