export interface ServicePackage {
  id: string;
  name: string;
  vehicleType: 'bike' | 'car';
  category: string;
  description: string;
  basePrice: number;
  duration: number;
  features: string[];
  icon: string;
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'srv_001',
    name: 'Basic Oil Change',
    vehicleType: 'bike',
    category: 'maintenance',
    description: 'Engine oil change with filter replacement',
    basePrice: 299,
    duration: 45,
    features: ['Engine oil replacement', 'Oil filter change', 'Basic inspection'],
    icon: 'fas fa-oil-can'
  },
  {
    id: 'srv_002',
    name: 'Brake Service',
    vehicleType: 'bike', 
    category: 'repair',
    description: 'Complete brake inspection and adjustment',
    basePrice: 399,
    duration: 60,
    features: ['Brake pad inspection', 'Brake adjustment', 'Safety check'],
    icon: 'fas fa-hand-paper'
  },
  {
    id: 'srv_003',
    name: 'Car AC Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'AC cleaning and gas refill',
    basePrice: 899,
    duration: 120,
    features: ['AC vent cleaning', 'Gas refill', 'Cooling check'],
    icon: 'fas fa-snowflake'
  },
  {
    id: 'srv_004',
    name: 'Car Oil Change',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Premium engine oil change',
    basePrice: 599,
    duration: 90,
    features: ['Premium oil replacement', 'Filter change', 'Engine check'],
    icon: 'fas fa-oil-can'
  }
];
