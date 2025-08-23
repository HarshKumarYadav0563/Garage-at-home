export interface ServiceData {
  id: string;
  name: string;
  subtitle: string;
  vehicleType: 'bike' | 'car';
  price: number;
  icon: string;
  popular?: boolean;
  type?: 'combo' | 'individual';
  includedServices?: string[];
  savings?: string;
}

export interface AddonData {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const BIKE_SERVICES: ServiceData[] = [
  {
    id: 'bike-general',
    name: 'General Service',
    subtitle: 'Basic maintenance and inspection combo',
    vehicleType: 'bike',
    price: 499,
    icon: 'wrench',
    popular: true,
    type: 'combo',
    includedServices: [
      'Doorstep Service',
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
    price: 799,
    icon: 'calendar',
    type: 'combo',
    includedServices: [
      'Doorstep Service',
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
    price: 1299,
    icon: 'shield-check',
    type: 'combo',
    includedServices: [
      'FREE Doorstep Service',
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
    price: 399,
    icon: 'droplets',
    type: 'individual'
  },
  {
    id: 'bike-brake',
    name: 'Brake Pad Replacement',
    subtitle: 'New brake pads for safety',
    vehicleType: 'bike',
    price: 549,
    icon: 'disc',
    type: 'individual'
  },
  {
    id: 'bike-clutch',
    name: 'Clutch Plate Replacement',
    subtitle: 'Smooth gear shifting',
    vehicleType: 'bike',
    price: 999,
    icon: 'settings',
    type: 'individual'
  },
  {
    id: 'bike-chain',
    name: 'Chain & Sprocket Replacement',
    subtitle: 'New chain and sprocket set',
    vehicleType: 'bike',
    price: 1499,
    icon: 'link',
    type: 'individual'
  },
  {
    id: 'bike-battery',
    name: 'Battery Replacement',
    subtitle: 'New battery with warranty',
    vehicleType: 'bike',
    price: 2299,
    icon: 'battery',
    type: 'individual'
  },
  {
    id: 'bike-tyre',
    name: 'Tyre Replacement',
    subtitle: 'Per tyre with balancing',
    vehicleType: 'bike',
    price: 1599,
    icon: 'circle',
    type: 'individual'
  },
  {
    id: 'bike-puncture',
    name: 'Puncture Repair',
    subtitle: 'Quick puncture fix',
    vehicleType: 'bike',
    price: 99,
    icon: 'band-aid',
    type: 'individual'
  },
  {
    id: 'bike-suspension',
    name: 'Suspension Service',
    subtitle: 'Smooth ride comfort',
    vehicleType: 'bike',
    price: 599,
    icon: 'spring',
    type: 'individual'
  },
  {
    id: 'bike-electrical',
    name: 'Electrical Repair',
    subtitle: 'Wiring and component fixes',
    vehicleType: 'bike',
    price: 299,
    icon: 'zap',
    type: 'individual'
  },
  {
    id: 'bike-wash',
    name: 'Bike Wash + Polish',
    subtitle: 'Clean and shiny finish',
    vehicleType: 'bike',
    price: 299,
    icon: 'sparkles',
    type: 'individual'
  },
  {
    id: 'bike-paint',
    name: 'Painting/Denting',
    subtitle: 'Per panel restoration',
    vehicleType: 'bike',
    price: 1399,
    icon: 'palette',
    type: 'individual'
  },
  {
    id: 'bike-roadside',
    name: 'Roadside Assistance',
    subtitle: 'Emergency help 24/7',
    vehicleType: 'bike',
    price: 499,
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
    price: 1399,
    icon: 'wrench',
    popular: true,
    type: 'combo',
    includedServices: [
      'FREE Doorstep Service',
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
    price: 2999,
    icon: 'calendar',
    type: 'combo',
    includedServices: [
      'FREE Doorstep Service',
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
    price: 4999,
    icon: 'shield-check',
    type: 'combo',
    includedServices: [
      'FREE Doorstep Service',
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
    price: 999,
    icon: 'droplets',
    type: 'individual'
  },
  {
    id: 'car-ac',
    name: 'AC Service',
    subtitle: 'Gas refill and cleaning',
    vehicleType: 'car',
    price: 1399,
    icon: 'snowflake',
    type: 'individual'
  },
  {
    id: 'car-brake',
    name: 'Brake Pad Replacement',
    subtitle: 'Front/rear brake service',
    vehicleType: 'car',
    price: 1999,
    icon: 'disc',
    type: 'individual'
  },
  {
    id: 'car-clutch',
    name: 'Clutch Overhaul',
    subtitle: 'Complete clutch service',
    vehicleType: 'car',
    price: 4499,
    icon: 'settings',
    type: 'individual'
  },
  {
    id: 'car-battery',
    name: 'Battery Replacement',
    subtitle: '35-65Ah with warranty',
    vehicleType: 'car',
    price: 4199,
    icon: 'battery',
    type: 'individual'
  },
  {
    id: 'car-tyre',
    name: 'Tyre Replacement',
    subtitle: 'Per tyre with alignment',
    vehicleType: 'car',
    price: 3199,
    icon: 'circle',
    type: 'individual'
  },
  {
    id: 'car-alignment',
    name: 'Wheel Alignment + Balancing',
    subtitle: 'Precise wheel setup',
    vehicleType: 'car',
    price: 699,
    icon: 'target',
    type: 'individual'
  },
  {
    id: 'car-suspension',
    name: 'Suspension Work',
    subtitle: 'Smooth ride quality',
    vehicleType: 'car',
    price: 1799,
    icon: 'spring',
    type: 'individual'
  },
  {
    id: 'car-electrical',
    name: 'Electrical Repairs',
    subtitle: 'Alternator, starter, wiring',
    vehicleType: 'car',
    price: 849,
    icon: 'zap',
    type: 'individual'
  },
  {
    id: 'car-wash',
    name: 'Car Wash + Interior Cleaning',
    subtitle: 'Complete cleaning service',
    vehicleType: 'car',
    price: 599,
    icon: 'sparkles',
    type: 'individual'
  },
  {
    id: 'car-detailing',
    name: 'Full Car Detailing',
    subtitle: 'Premium polish and shampoo',
    vehicleType: 'car',
    price: 2399,
    icon: 'star',
    type: 'individual'
  },
  {
    id: 'car-paint',
    name: 'Painting/Denting',
    subtitle: 'Per panel with color match',
    vehicleType: 'car',
    price: 1799,
    icon: 'palette',
    type: 'individual'
  },
  {
    id: 'car-roadside',
    name: 'Roadside Assistance',
    subtitle: 'Towing and emergency help',
    vehicleType: 'car',
    price: 1099,
    icon: 'phone-call',
    type: 'individual'
  }
];

export const ADDONS: AddonData[] = [
  {
    id: 'doorstep-service',
    name: 'Doorstep Service',
    price: 249,
    description: 'Service at your location - Required for individual services'
  },
  {
    id: 'pickup-drop',
    name: 'Pickup & Drop',
    price: 199,
    description: 'Vehicle pickup and drop service'
  },
  {
    id: 'diagnosis',
    name: 'Diagnosis',
    price: 299,
    description: 'Complete diagnostic check'
  },
  {
    id: 'emergency',
    name: 'Emergency 2-Hour',
    price: 299,
    description: 'Priority 2-hour service'
  },
  {
    id: 'warranty',
    name: 'Extended Warranty',
    price: 449,
    description: 'Additional warranty coverage'
  }
];

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