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
  // Bike Services (Two-Wheeler)
  {
    id: 'srv_001',
    name: 'General Service',
    vehicleType: 'bike',
    category: 'maintenance',
    description: 'Complete general service including oil change, cleaning, brake adjustment, and chain lubrication',
    basePrice: 400,
    duration: 60,
    features: ['Engine oil change', 'Chain cleaning & lubrication', 'Brake adjustment', 'Basic cleaning', 'Safety inspection'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_002',
    name: 'Periodic Service',
    vehicleType: 'bike', 
    category: 'maintenance',
    description: 'OEM-recommended periodic maintenance with oil, coolant, and spark plugs',
    basePrice: 700,
    duration: 90,
    features: ['Engine oil & filter change', 'Coolant replacement', 'Spark plug replacement', 'Air filter cleaning', 'Comprehensive inspection'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_003',
    name: 'Full Service',
    vehicleType: 'bike', 
    category: 'maintenance',
    description: 'Complete check-up and maintenance for optimal bike performance',
    basePrice: 1200,
    duration: 120,
    features: ['Complete engine service', 'Brake system check', 'Chain & sprocket inspection', 'Electrical diagnostics', 'Performance tuning', 'Warranty included'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_004',
    name: 'Engine Oil Change',
    vehicleType: 'bike',
    category: 'maintenance',
    description: 'Quick and efficient engine oil replacement service',
    basePrice: 300,
    duration: 30,
    features: ['Premium engine oil', 'Oil filter replacement', 'Level check', 'Disposal of old oil'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_005',
    name: 'Brake Pad Replacement',
    vehicleType: 'bike',
    category: 'repair', 
    description: 'Professional brake pad replacement for enhanced safety',
    basePrice: 400,
    duration: 45,
    features: ['Brake pad replacement', 'Brake fluid check', 'Brake adjustment', 'Safety testing'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_006',
    name: 'Clutch Plate Replacement',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Expert clutch plate replacement for smooth gear shifting',
    basePrice: 800,
    duration: 90,
    features: ['Clutch plate replacement', 'Clutch cable adjustment', 'Performance testing', 'Quality parts'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_007',
    name: 'Chain & Sprocket Replacement',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Chain and sprocket replacement for improved power transmission',
    basePrice: 1200,
    duration: 75,
    features: ['Chain replacement', 'Sprocket replacement', 'Alignment check', 'Lubrication'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_008',
    name: 'Battery Replacement',
    vehicleType: 'bike',
    category: 'repair',
    description: 'High-quality battery replacement with warranty',
    basePrice: 1800,
    duration: 30,
    features: ['Premium battery', 'Terminal cleaning', 'Charging system check', '12-month warranty'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_009',
    name: 'Tyre Replacement',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Professional tyre replacement with balancing (per tyre)',
    basePrice: 1200,
    duration: 45,
    features: ['Tyre replacement', 'Wheel balancing', 'Pressure check', 'Disposal of old tyre'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_010',
    name: 'Puncture Repair',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Quick puncture repair service to get you back on road',
    basePrice: 80,
    duration: 20,
    features: ['Puncture identification', 'Tube patching', 'Pressure check', 'Quality seal'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_011',
    name: 'Suspension Service',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Complete suspension maintenance for comfortable ride',
    basePrice: 400,
    duration: 60,
    features: ['Suspension inspection', 'Shock absorber service', 'Fork oil change', 'Performance testing'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_012',
    name: 'Electrical Repair',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Expert electrical repairs for switches, wiring, and components',
    basePrice: 150,
    duration: 45,
    features: ['Wiring inspection', 'Switch replacement', 'Connection check', 'Safety testing'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_013',
    name: 'Bike Wash + Polish',
    vehicleType: 'bike',
    category: 'maintenance',
    description: 'Professional bike washing and polishing service',
    basePrice: 200,
    duration: 45,
    features: ['Exterior wash', 'Polish application', 'Chrome cleaning', 'Tire shine'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_014',
    name: 'Painting / Denting',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Professional painting and denting work (per panel)',
    basePrice: 800,
    duration: 180,
    features: ['Dent repair', 'Surface preparation', 'Professional painting', 'Quality finish'],
    icon: 'motorcycle'
  },
  {
    id: 'srv_015',
    name: 'Roadside Assistance',
    vehicleType: 'bike',
    category: 'repair',
    description: 'Emergency roadside assistance including jump start and nearby towing',
    basePrice: 300,
    duration: 30,
    features: ['Jump start service', 'Minor repairs', 'Nearby towing', '24/7 availability'],
    icon: 'motorcycle'
  },

  // Car Services (Four-Wheeler)
  {
    id: 'srv_016',
    name: 'General Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Essential car maintenance with oil change, filter, and fluid top-up',
    basePrice: 1000,
    duration: 90,
    features: ['Engine oil change', 'Oil filter replacement', 'Fluid level check', 'Basic inspection', 'Tyre pressure check'],
    icon: 'car'
  },
  {
    id: 'srv_017',
    name: 'Periodic Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'OEM schedule maintenance with plugs, coolant, and brake inspection',
    basePrice: 2500,
    duration: 150,
    features: ['Engine oil & filter change', 'Spark plug replacement', 'Coolant service', 'Brake inspection', 'Air filter replacement'],
    icon: 'car'
  },
  {
    id: 'srv_018',
    name: 'Major Service',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Comprehensive service with full diagnostics, brakes, and clutch check',
    basePrice: 4000,
    duration: 240,
    features: ['Complete diagnostics', 'Brake system service', 'Clutch inspection', 'Suspension check', 'Electrical diagnostics', 'Comprehensive report'],
    icon: 'car'
  },
  {
    id: 'srv_019',
    name: 'Engine Oil Change',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Professional engine oil replacement with quality oil',
    basePrice: 800,
    duration: 45,
    features: ['Premium engine oil', 'Oil filter replacement', 'Dipstick check', 'Proper disposal'],
    icon: 'car'
  },
  {
    id: 'srv_020',
    name: 'AC Service',
    vehicleType: 'car',
    category: 'repair',
    description: 'Complete AC service with gas refill and filter replacement',
    basePrice: 1000,
    duration: 90,
    features: ['AC gas refill', 'Filter replacement', 'Vent cleaning', 'Cooling performance test'],
    icon: 'car'
  },
  {
    id: 'srv_021',
    name: 'Brake Pad Replacement',
    vehicleType: 'car',
    category: 'repair',
    description: 'Professional brake pad replacement for front/rear set',
    basePrice: 1500,
    duration: 120,
    features: ['Brake pad replacement', 'Disc inspection', 'Brake fluid check', 'Performance testing'],
    icon: 'car'
  },
  {
    id: 'srv_022',
    name: 'Clutch Overhaul',
    vehicleType: 'car',
    category: 'repair',
    description: 'Complete clutch system overhaul for smooth operation',
    basePrice: 3500,
    duration: 180,
    features: ['Clutch plate replacement', 'Pressure plate service', 'Release bearing check', 'Performance testing'],
    icon: 'car'
  },
  {
    id: 'srv_023',
    name: 'Battery Replacement',
    vehicleType: 'car',
    category: 'repair',
    description: 'High-capacity battery replacement (35-65Ah) with warranty',
    basePrice: 3500,
    duration: 45,
    features: ['Premium battery', 'Terminal cleaning', 'Charging system test', '18-month warranty'],
    icon: 'car'
  },
  {
    id: 'srv_024',
    name: 'Tyre Replacement',
    vehicleType: 'car',
    category: 'repair',
    description: 'Professional tyre replacement with balancing (per tyre)',
    basePrice: 2500,
    duration: 60,
    features: ['Tyre replacement', 'Wheel balancing', 'Alignment check', 'Pressure setting'],
    icon: 'car'
  },
  {
    id: 'srv_025',
    name: 'Wheel Alignment + Balancing',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Precision wheel alignment and balancing for smooth driving',
    basePrice: 500,
    duration: 75,
    features: ['4-wheel alignment', 'Wheel balancing', 'Toe adjustment', 'Test drive'],
    icon: 'car'
  },
  {
    id: 'srv_026',
    name: 'Suspension Work',
    vehicleType: 'car',
    category: 'repair',
    description: 'Complete suspension system inspection and repair',
    basePrice: 1200,
    duration: 120,
    features: ['Shock absorber check', 'Strut inspection', 'Bushing replacement', 'Performance testing'],
    icon: 'car'
  },
  {
    id: 'srv_027',
    name: 'Electrical Repairs',
    vehicleType: 'car',
    category: 'repair',
    description: 'Expert electrical repairs for alternator, starter, and wiring',
    basePrice: 500,
    duration: 90,
    features: ['Electrical diagnostics', 'Wiring repair', 'Component replacement', 'System testing'],
    icon: 'car'
  },
  {
    id: 'srv_028',
    name: 'Car Wash + Interior Cleaning',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Professional car wash with interior cleaning service',
    basePrice: 400,
    duration: 60,
    features: ['Exterior wash', 'Interior vacuuming', 'Dashboard cleaning', 'Window cleaning'],
    icon: 'car'
  },
  {
    id: 'srv_029',
    name: 'Full Car Detailing',
    vehicleType: 'car',
    category: 'maintenance',
    description: 'Complete detailing with exterior polish and interior shampooing',
    basePrice: 1800,
    duration: 180,
    features: ['Exterior polishing', 'Interior shampooing', 'Chrome polishing', 'Tire dressing', 'Wax application'],
    icon: 'car'
  },
  {
    id: 'srv_030',
    name: 'Painting / Denting',
    vehicleType: 'car',
    category: 'repair',
    description: 'Professional painting and denting work (per panel)',
    basePrice: 1200,
    duration: 240,
    features: ['Dent repair', 'Surface preparation', 'Professional painting', 'Color matching', 'Quality finish'],
    icon: 'car'
  },
  {
    id: 'srv_031',
    name: 'Roadside Assistance',
    vehicleType: 'car',
    category: 'repair',
    description: 'Emergency roadside assistance including towing and jump start',
    basePrice: 700,
    duration: 45,
    features: ['Emergency towing', 'Jump start service', 'Flat tire assistance', '24/7 availability'],
    icon: 'car'
  }
];
