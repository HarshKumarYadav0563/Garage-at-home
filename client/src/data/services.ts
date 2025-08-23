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
  // Bike Services
  {
    id: 'srv_001',
    name: 'Basic Service',
    vehicleType: 'bike',
    category: 'maintenance',
    description: 'Essential maintenance for your bike including oil change and basic inspection',
    basePrice: 299,
    duration: 45,
    features: ['Engine oil replacement', 'Oil filter change', 'Basic safety inspection', 'Chain lubrication'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_002',
    name: 'Standard Service',
    vehicleType: 'bike', 
    category: 'maintenance',
    description: 'Comprehensive maintenance with brake service and detailed inspection',
    basePrice: 499,
    duration: 75,
    features: ['Engine oil & filter change', 'Brake inspection & adjustment', 'Chain cleaning & lubrication', 'Battery check', 'Spark plug inspection'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_003',
    name: 'Premium Service',
    vehicleType: 'bike', 
    category: 'maintenance',
    description: 'Complete bike service with parts replacement and warranty',
    basePrice: 799,
    duration: 120,
    features: ['Complete engine service', 'Brake pad replacement', 'Chain & sprocket service', 'Carburetor cleaning', 'Electrical system check', '6-month warranty'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_004',
    name: 'Brake Repair',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Professional brake system repair and replacement',
    basePrice: 349,
    duration: 60,
    features: ['Brake pad replacement', 'Brake fluid change', 'Disc cleaning', 'Performance testing'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_005',
    name: 'Engine Repair',
    vehicleType: 'bike',
    category: 'repair', 
    description: 'Expert engine diagnosis and repair services',
    basePrice: 899,
    duration: 180,
    features: ['Engine diagnosis', 'Cylinder repair', 'Piston replacement', 'Gasket service', 'Performance tuning'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_006',
    name: 'Tire Service',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Tire replacement and wheel balancing service',
    basePrice: 599,
    duration: 45,
    features: ['Tire replacement', 'Wheel balancing', 'Pressure check', 'Alignment service'],
    icon: 'motorcycle'
  },

  // Car Services
  {
    id: 'srv_007',
    name: 'Basic Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Essential car maintenance including oil change and inspection',
    basePrice: 799,
    duration: 90,
    features: ['Engine oil replacement', 'Oil filter change', 'Basic inspection', 'Fluid level check'],
    icon: 'car'
  },
  {
    id: 'srv_008',
    name: 'Standard Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Comprehensive maintenance with AC service and detailed check',
    basePrice: 1299,
    duration: 150,
    features: ['Engine oil & filter change', 'AC gas refill', 'Brake inspection', 'Battery check', 'Suspension check', 'Tire rotation'],
    icon: 'car'
  },
  {
    id: 'srv_009',
    name: 'Premium Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Complete car service with parts replacement and extended warranty',
    basePrice: 1999,
    duration: 240,
    features: ['Complete engine service', 'AC complete service', 'Brake system service', 'Suspension service', 'Electrical diagnostics', 'Interior cleaning', '12-month warranty'],
    icon: 'car'
  },
  {
    id: 'srv_010',
    name: 'AC Service',
    vehicleType: 'car',
    category: 'repair',
    description: 'Complete AC system cleaning, repair and gas refill',
    basePrice: 899,
    duration: 120,
    features: ['AC vent cleaning', 'Gas refill', 'Compressor check', 'Filter replacement', 'Cooling performance test'],
    icon: 'car'
  },
  {
    id: 'srv_011',
    name: 'Brake Service',
    vehicleType: 'car',
    category: 'repair',
    description: 'Professional brake system service and repair',
    basePrice: 1299,
    duration: 150,
    features: ['Brake pad replacement', 'Brake fluid change', 'Disc machining', 'Caliper service', 'ABS diagnostics'],
    icon: 'car'
  },
  {
    id: 'srv_012',
    name: 'Engine Diagnostics',
    vehicleType: 'car',
    category: 'repair',
    description: 'Advanced engine diagnostics and performance tuning',
    basePrice: 1599,
    duration: 180,
    features: ['Computer diagnostics', 'Engine tune-up', 'Fuel system cleaning', 'Ignition service', 'Performance optimization'],
    icon: 'car'
  }
];
