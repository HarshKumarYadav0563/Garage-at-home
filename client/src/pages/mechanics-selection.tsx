import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, Star, MapPin, Clock, Shield, ArrowRight, 
  Wrench, CheckCircle, ArrowLeft, Phone, Award
} from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { apiRequest } from '@/lib/queryClient';

interface Mechanic {
  id: string;
  name: string;
  rating: number;
  experience: number;
  specialties: string[];
  distance: number;
  completedServices: number;
  isAvailable: boolean;
  nextAvailable?: string;
  profileImage?: string;
  verified: boolean;
  responseTime: string;
}

export default function MechanicsSelection() {
  const [, setLocation] = useLocation();
  const { address, selectedMechanic, setSelectedMechanic } = useBookingStore();
  const [selectedMechanicId, setSelectedMechanicId] = useState<string | null>(selectedMechanic?.id || null);

  // Fetch nearby mechanics based on user's location
  const { data: mechanics, isLoading } = useQuery({
    queryKey: ['/api/mechanics/search'],
    queryFn: () => apiRequest('/api/mechanics/search', {
      method: 'POST',
      body: {
        latitude: address.coordinates?.lat || address.lat || 28.6139,
        longitude: address.coordinates?.lng || address.lng || 77.2090,
        radius: 25 // 25km radius
      }
    }),
    enabled: !!(address.coordinates || (address.lat && address.lng))
  });

  const handleMechanicSelect = (mechanic: Mechanic) => {
    setSelectedMechanicId(mechanic.id);
    setSelectedMechanic(mechanic);
  };

  const handleContinue = () => {
    if (selectedMechanicId) {
      setLocation('/book/details');
    }
  };

  const handleBack = () => {
    setLocation('/book/location');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Finding nearby mechanics...</p>
        </motion.div>
      </div>
    );
  }

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
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
            <div className="w-12 h-0.5 bg-emerald-500"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
            <div className="w-12 h-0.5 bg-emerald-500"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">✓</div>
            <div className="w-12 h-0.5 bg-emerald-500"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">5</div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">6</div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Mechanic
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Select from verified professionals in your area
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Showing mechanics near {address.area || address.city || 'your location'}</span>
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
            Change Location
          </Button>
        </motion.div>

        {/* Mechanics List */}
        {mechanics && Array.isArray(mechanics) && mechanics.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            {mechanics.map((mechanic: Mechanic, index: number) => {
              const isSelected = selectedMechanicId === mechanic.id;
              
              return (
                <motion.div
                  key={mechanic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.05) }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30' 
                        : 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/30'
                    }`}
                    onClick={() => handleMechanicSelect(mechanic)}
                  >
                    <CardContent className="p-6">
                      
                      {/* Header with availability */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-white">{mechanic.name}</h3>
                              {mechanic.verified && (
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{mechanic.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Wrench className="w-4 h-4 text-blue-400" />
                                <span>{mechanic.experience}+ years</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span>{mechanic.distance}km away</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Availability Badge */}
                        <Badge 
                          className={mechanic.isAvailable 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {mechanic.isAvailable ? 'Available Now' : `Next: ${mechanic.nextAvailable}`}
                        </Badge>
                      </div>

                      <Separator className="bg-white/10 my-4" />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-400">{mechanic.completedServices}</div>
                          <div className="text-xs text-gray-400">Services</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-sky-400">{mechanic.responseTime}</div>
                          <div className="text-xs text-gray-400">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{mechanic.rating}/5</div>
                          <div className="text-xs text-gray-400">Rating</div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mechanic.specialties.map((specialty: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center mt-4"
                        >
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Selected</span>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Mechanics Available</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              We couldn't find any mechanics in your area right now. Please try a different location or check back later.
            </p>
            <Button onClick={handleBack} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change Location
            </Button>
          </motion.div>
        )}

        {/* Continue Button */}
        {mechanics && Array.isArray(mechanics) && mechanics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedMechanicId}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-lg px-8 py-3 min-w-[200px]"
            >
              Continue to Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}