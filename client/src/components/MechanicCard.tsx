import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MechanicCardProps {
  id: string;
  name: string;
  rating: number;
  jobsDone: number;
  distance: number;
  nextSlot: string;
  skills: string[];
  onSelect: (mechanicId: string) => void;
}

export function MechanicCard({
  id,
  name,
  rating,
  jobsDone,
  distance,
  nextSlot,
  skills,
  onSelect,
}: MechanicCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const gradients = [
    'bg-gradient-to-br from-primary-500 to-green-600',
    'bg-gradient-to-br from-blue-500 to-purple-600', 
    'bg-gradient-to-br from-orange-500 to-red-600',
  ];
  
  const gradient = gradients[parseInt(id.slice(-1)) % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 ${gradient} rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4`}>
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-lg" data-testid={`mechanic-name-${id}`}>
                {name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-3 h-3 mr-1" />
                  <span data-testid={`mechanic-rating-${id}`}>{rating}</span>
                </div>
                <span>•</span>
                <span data-testid={`mechanic-jobs-${id}`}>{jobsDone}+ jobs</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                Distance:
              </span>
              <span className="font-medium" data-testid={`mechanic-distance-${id}`}>
                {distance.toFixed(1)} km
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Next Available:
              </span>
              <span className="font-medium text-green-600" data-testid={`mechanic-next-slot-${id}`}>
                {nextSlot}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Specialization:</span>
              <span className="font-medium" data-testid={`mechanic-skills-${id}`}>
                {skills.join(', ')}
              </span>
            </div>
          </div>

          <Button
            onClick={() => onSelect(id)}
            className="w-full bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            data-testid={`button-select-mechanic-${id}`}
          >
            Select Mechanic
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
