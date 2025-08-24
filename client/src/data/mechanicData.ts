import { Mechanic } from '@/store/booking';

export const SAMPLE_MECHANICS: Mechanic[] = [
  {
    id: 'mech-1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    reviewCount: 147,
    distance: 1.2,
    specialization: ['Engine Repair', 'Oil Change', 'Brake Service'],
    experience: 8,
    isAvailable: true,
    completedJobs: 523,
    responseTime: 'Within 30 mins'
  },
  {
    id: 'mech-2', 
    name: 'Amit Singh',
    rating: 4.9,
    reviewCount: 203,
    distance: 2.1,
    specialization: ['Electrical', 'AC Service', 'Battery'],
    experience: 12,
    isAvailable: true,
    completedJobs: 781,
    responseTime: 'Within 45 mins'
  },
  {
    id: 'mech-3',
    name: 'Suresh Sharma',
    rating: 4.7,
    reviewCount: 89,
    distance: 3.5,
    specialization: ['Transmission', 'Clutch', 'Suspension'],
    experience: 15,
    isAvailable: true,
    completedJobs: 456,
    responseTime: 'Within 1 hour'
  },
  {
    id: 'mech-4',
    name: 'Vikash Yadav',
    rating: 4.6,
    reviewCount: 134,
    distance: 2.8,
    specialization: ['General Service', 'Tire Change', 'Wash & Clean'],
    experience: 6,
    isAvailable: true,
    completedJobs: 298,
    responseTime: 'Within 40 mins'
  },
  {
    id: 'mech-5',
    name: 'Deepak Verma',
    rating: 4.9,
    reviewCount: 176,
    distance: 4.2,
    specialization: ['Engine Diagnostics', 'Performance Tuning', 'Fuel System'],
    experience: 10,
    isAvailable: false,
    completedJobs: 642,
    responseTime: 'Within 2 hours'
  },
  {
    id: 'mech-6',
    name: 'Manoj Gupta',
    rating: 4.5,
    reviewCount: 67,
    distance: 1.8,
    specialization: ['Body Work', 'Paint Touch-up', 'Dent Repair'],
    experience: 7,
    isAvailable: true,
    completedJobs: 189,
    responseTime: 'Within 50 mins'
  }
];

// Function to get nearby mechanics based on location
export function getNearbyMechanics(lat?: number, lng?: number): Mechanic[] {
  // Simulate API call - in real app this would fetch from backend
  // Sort by distance and availability
  return SAMPLE_MECHANICS
    .sort((a, b) => {
      // Available mechanics first
      if (a.isAvailable && !b.isAvailable) return -1;
      if (!a.isAvailable && b.isAvailable) return 1;
      
      // Then by distance
      return a.distance - b.distance;
    });
}

// Function to filter mechanics by vehicle type and specialization
export function filterMechanicsByVehicle(mechanics: Mechanic[], vehicleType: 'bike' | 'car'): Mechanic[] {
  // In a real app, you might filter mechanics based on their specialization with the vehicle type
  // For now, return all mechanics as they can service both bikes and cars
  return mechanics;
}