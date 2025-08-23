export interface ServiceData {
  id: string;
  name: string;
  subtitle: string;
  vehicleType: 'bike' | 'car';
  priceMin: number;
  priceMax: number;
  icon: string;
  popular?: boolean;
  type?: 'combo' | 'individual';
  includedServices?: string[];
  savings?: string;
}

export interface AddonData {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  description: string;
}

export const BIKE_SERVICES: ServiceData[] = [
  {
    id: 'bike-general',
    name: 'General Service',
    subtitle: 'Basic maintenance and inspection combo',
    vehicleType: 'bike',
    priceMin: 400,
    priceMax: 600,
    icon: 'wrench',
    popular: true,
    type: 'combo',
    includedServices: [
      'Engine oil check & top-up',
      'Chain lubrication & adjustment',
      'Brake inspection',
      'Tire pressure check',
      'Battery terminal cleaning',
      'Basic electrical check'
    ],
    savings: 'Save ₹200 vs individual services'
  },
  {
    id: 'bike-periodic',
    name: 'Periodic Service',
    subtitle: 'Comprehensive maintenance package',
    vehicleType: 'bike',
    priceMin: 700,
    priceMax: 1000,
    icon: 'calendar',
    type: 'combo',
    includedServices: [
      'Complete engine oil change',
      'Air filter cleaning/replacement',
      'Spark plug inspection',
      'Chain & sprocket service',
      'Brake adjustment',
      'Carburetor cleaning',
      'All fluid level checks'
    ],
    savings: 'Save ₹350 vs individual services'
  },
  {
    id: 'bike-full',
    name: 'Full Service',
    subtitle: 'Complete bike overhaul package',
    vehicleType: 'bike',
    priceMin: 1200,
    priceMax: 1500,
    icon: 'shield-check',
    type: 'combo',
    includedServices: [
      'Engine complete service',
      'Transmission service',
      'Suspension check & service',
      'Complete brake service',
      'Electrical system check',
      'Body wash & polish',
      'Safety inspection',
      '30-day service warranty'
    ],
    savings: 'Save ₹500 vs individual services'
  },
  {
    id: 'bike-oil',
    name: 'Engine Oil Change',
    subtitle: 'Fresh oil and filter replacement',
    vehicleType: 'bike',
    priceMin: 300,
    priceMax: 500,
    icon: 'droplets',
    type: 'individual'
  },
  {
    id: 'bike-brake',
    name: 'Brake Pad Replacement',
    subtitle: 'New brake pads for safety',
    vehicleType: 'bike',
    priceMin: 400,
    priceMax: 700,
    icon: 'disc',
    type: 'individual'
  },
  {
    id: 'bike-clutch',
    name: 'Clutch Plate Replacement',
    subtitle: 'Smooth gear shifting',
    vehicleType: 'bike',
    priceMin: 800,
    priceMax: 1200,
    icon: 'settings',
    type: 'individual'
  },
  {
    id: 'bike-chain',
    name: 'Chain & Sprocket Replacement',
    subtitle: 'New chain and sprocket set',
    vehicleType: 'bike',
    priceMin: 1200,
    priceMax: 1800,
    icon: 'link',
    type: 'individual'
  },
  {
    id: 'bike-battery',
    name: 'Battery Replacement',
    subtitle: 'New battery with warranty',
    vehicleType: 'bike',
    priceMin: 1800,
    priceMax: 2800,
    icon: 'battery',
    type: 'individual'
  },
  {
    id: 'bike-tyre',
    name: 'Tyre Replacement',
    subtitle: 'Per tyre with balancing',
    vehicleType: 'bike',
    priceMin: 1200,
    priceMax: 2000,
    icon: 'circle',
    type: 'individual'
  },
  {
    id: 'bike-puncture',
    name: 'Puncture Repair',
    subtitle: 'Quick puncture fix',
    vehicleType: 'bike',
    priceMin: 80,
    priceMax: 150,
    icon: 'band-aid',
    type: 'individual'
  },
  {
    id: 'bike-suspension',
    name: 'Suspension Service',
    subtitle: 'Smooth ride comfort',
    vehicleType: 'bike',
    priceMin: 400,
    priceMax: 800,
    icon: 'spring',
    type: 'individual'
  },
  {
    id: 'bike-electrical',
    name: 'Electrical Repair',
    subtitle: 'Wiring and component fixes',
    vehicleType: 'bike',
    priceMin: 150,
    priceMax: 400,
    icon: 'zap',
    type: 'individual'
  },
  {
    id: 'bike-wash',
    name: 'Bike Wash + Polish',
    subtitle: 'Clean and shiny finish',
    vehicleType: 'bike',
    priceMin: 200,
    priceMax: 400,
    icon: 'sparkles',
    type: 'individual'
  },
  {
    id: 'bike-paint',
    name: 'Painting/Denting',
    subtitle: 'Per panel restoration',
    vehicleType: 'bike',
    priceMin: 800,
    priceMax: 2000,
    icon: 'palette',
    type: 'individual'
  },
  {
    id: 'bike-roadside',
    name: 'Roadside Assistance',
    subtitle: 'Emergency help 24/7',
    vehicleType: 'bike',
    priceMin: 300,
    priceMax: 700,
    icon: 'phone-call',
    type: 'individual'
  }
];

export const CAR_SERVICES: ServiceData[] = [
  {
    id: 'car-general',
    name: 'General Service',
    subtitle: 'Essential maintenance combo package',
    vehicleType: 'car',
    priceMin: 1000,
    priceMax: 1800,
    icon: 'wrench',
    popular: true,
    type: 'combo',
    includedServices: [
      'Engine oil & filter change',
      'Brake fluid check',
      'Battery inspection',
      'Tire pressure & tread check',
      'Lights & indicators test',
      'Fluid level checks',
      'Basic diagnostic scan'
    ],
    savings: 'Save ₹400 vs individual services'
  },
  {
    id: 'car-periodic',
    name: 'Periodic Service',
    subtitle: 'Comprehensive maintenance package',
    vehicleType: 'car',
    priceMin: 2500,
    priceMax: 3500,
    icon: 'calendar',
    type: 'combo',
    includedServices: [
      'Complete engine service',
      'Air & cabin filter replacement',
      'Brake system inspection',
      'Suspension check',
      'AC performance test',
      'Electrical system check',
      'Transmission service',
      'Computer diagnostic'
    ],
    savings: 'Save ₹800 vs individual services'
  },
  {
    id: 'car-major',
    name: 'Major Service',
    subtitle: 'Complete car overhaul package',
    vehicleType: 'car',
    priceMin: 4000,
    priceMax: 6000,
    icon: 'shield-check',
    type: 'combo',
    includedServices: [
      'Complete engine overhaul',
      'Transmission service',
      'Brake system service',
      'AC system service',
      'Suspension service',
      'Electrical system service',
      'Body inspection & wash',
      'Road test & final check',
      '90-day service warranty'
    ],
    savings: 'Save ₹1200 vs individual services'
  },
  {
    id: 'car-oil',
    name: 'Engine Oil Change',
    subtitle: 'Premium oil and filter',
    vehicleType: 'car',
    priceMin: 800,
    priceMax: 1200,
    icon: 'droplets',
    type: 'individual'
  },
  {
    id: 'car-ac',
    name: 'AC Service',
    subtitle: 'Gas refill and cleaning',
    vehicleType: 'car',
    priceMin: 1000,
    priceMax: 1800,
    icon: 'snowflake',
    type: 'individual'
  },
  {
    id: 'car-brake',
    name: 'Brake Pad Replacement',
    subtitle: 'Front/rear brake service',
    vehicleType: 'car',
    priceMin: 1500,
    priceMax: 2500,
    icon: 'disc',
    type: 'individual'
  },
  {
    id: 'car-clutch',
    name: 'Clutch Overhaul',
    subtitle: 'Complete clutch service',
    vehicleType: 'car',
    priceMin: 3500,
    priceMax: 5500,
    icon: 'settings',
    type: 'individual'
  },
  {
    id: 'car-battery',
    name: 'Battery Replacement',
    subtitle: '35-65Ah with warranty',
    vehicleType: 'car',
    priceMin: 3500,
    priceMax: 5000,
    icon: 'battery',
    type: 'individual'
  },
  {
    id: 'car-tyre',
    name: 'Tyre Replacement',
    subtitle: 'Per tyre with alignment',
    vehicleType: 'car',
    priceMin: 2500,
    priceMax: 4000,
    icon: 'circle',
    type: 'individual'
  },
  {
    id: 'car-alignment',
    name: 'Wheel Alignment + Balancing',
    subtitle: 'Precise wheel setup',
    vehicleType: 'car',
    priceMin: 500,
    priceMax: 900,
    icon: 'target',
    type: 'individual'
  },
  {
    id: 'car-suspension',
    name: 'Suspension Work',
    subtitle: 'Smooth ride quality',
    vehicleType: 'car',
    priceMin: 1200,
    priceMax: 2500,
    icon: 'spring',
    type: 'individual'
  },
  {
    id: 'car-electrical',
    name: 'Electrical Repairs',
    subtitle: 'Alternator, starter, wiring',
    vehicleType: 'car',
    priceMin: 500,
    priceMax: 1200,
    icon: 'zap',
    type: 'individual'
  },
  {
    id: 'car-wash',
    name: 'Car Wash + Interior Cleaning',
    subtitle: 'Complete cleaning service',
    vehicleType: 'car',
    priceMin: 400,
    priceMax: 800,
    icon: 'sparkles',
    type: 'individual'
  },
  {
    id: 'car-detailing',
    name: 'Full Car Detailing',
    subtitle: 'Premium polish and shampoo',
    vehicleType: 'car',
    priceMin: 1800,
    priceMax: 3000,
    icon: 'star',
    type: 'individual'
  },
  {
    id: 'car-paint',
    name: 'Painting/Denting',
    subtitle: 'Per panel with color match',
    vehicleType: 'car',
    priceMin: 1200,
    priceMax: 2500,
    icon: 'palette',
    type: 'individual'
  },
  {
    id: 'car-roadside',
    name: 'Roadside Assistance',
    subtitle: 'Towing and emergency help',
    vehicleType: 'car',
    priceMin: 700,
    priceMax: 1500,
    icon: 'phone-call',
    type: 'individual'
  }
];

export const ADDONS: AddonData[] = [
  {
    id: 'pickup-drop',
    name: 'Pickup & Drop',
    priceMin: 150,
    priceMax: 300,
    description: 'Vehicle pickup and drop service'
  },
  {
    id: 'diagnosis',
    name: 'Diagnosis',
    priceMin: 200,
    priceMax: 400,
    description: 'Complete diagnostic check'
  },
  {
    id: 'emergency',
    name: 'Emergency 2-Hour',
    priceMin: 200,
    priceMax: 400,
    description: 'Priority 2-hour service'
  },
  {
    id: 'warranty',
    name: 'Extended Warranty',
    priceMin: 300,
    priceMax: 600,
    description: 'Additional warranty coverage'
  }
];

export const CITIES = [
  { id: 'mumbai', name: 'Mumbai', multiplier: 1.10 },
  { id: 'delhi', name: 'Delhi', multiplier: 1.05 },
  { id: 'bangalore', name: 'Bangalore', multiplier: 1.05 },
  { id: 'other', name: 'Other', multiplier: 1.00 }
] as const;

export const TIME_SLOTS = [
  { date: 'today', time: '10-12', label: 'Today 10AM-12PM' },
  { date: 'today', time: '12-2', label: 'Today 12PM-2PM' },
  { date: 'today', time: '2-4', label: 'Today 2PM-4PM' },
  { date: 'today', time: '4-6', label: 'Today 4PM-6PM' },
  { date: 'tomorrow', time: '10-12', label: 'Tomorrow 10AM-12PM' },
  { date: 'tomorrow', time: '12-2', label: 'Tomorrow 12PM-2PM' },
  { date: 'tomorrow', time: '2-4', label: 'Tomorrow 2PM-4PM' },
  { date: 'tomorrow', time: '4-6', label: 'Tomorrow 4PM-6PM' },
] as const;