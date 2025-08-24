import { NCRCity, CITY_MULTIPLIERS } from '@shared/config/serviceAreas';

export interface PriceRange {
  min: number;
  max: number;
}

export interface ServicePricing {
  id: string;
  title: string;
  subtitle: string;
  priceRange: PriceRange;
  vehicleType: 'bike' | 'car';
  category: 'maintenance' | 'repair' | 'enhancement' | 'emergency';
  duration?: string;
  popular?: boolean;
}

export interface AddonPricing {
  id: string;
  title: string;
  description: string;
  priceRange: PriceRange;
  required?: boolean;
}

// Bike Services with affordable ranges
export const BIKE_SERVICES: ServicePricing[] = [
  {
    id: 'bike-general',
    title: 'General Service',
    subtitle: 'Basic maintenance and inspection',
    priceRange: { min: 400, max: 600 },
    vehicleType: 'bike',
    category: 'maintenance',
    duration: '1-2 hours',
    popular: true
  },
  {
    id: 'bike-periodic', 
    title: 'Periodic Service',
    subtitle: 'Comprehensive maintenance package',
    priceRange: { min: 700, max: 1000 },
    vehicleType: 'bike',
    category: 'maintenance',
    duration: '2-3 hours'
  },
  {
    id: 'bike-full',
    title: 'Full Service',
    subtitle: 'Complete bike overhaul',
    priceRange: { min: 1200, max: 1500 },
    vehicleType: 'bike', 
    category: 'maintenance',
    duration: '3-4 hours'
  },
  {
    id: 'bike-oil',
    title: 'Oil Change',
    subtitle: 'Engine oil and filter replacement',
    priceRange: { min: 300, max: 500 },
    vehicleType: 'bike',
    category: 'maintenance',
    duration: '30-45 min'
  },
  {
    id: 'bike-brake',
    title: 'Brake Service',
    subtitle: 'Brake pad replacement and adjustment',
    priceRange: { min: 400, max: 700 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '45-60 min'
  },
  {
    id: 'bike-clutch',
    title: 'Clutch Repair',
    subtitle: 'Clutch plate and cable service',
    priceRange: { min: 800, max: 1200 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '1-2 hours'
  },
  {
    id: 'bike-tyres',
    title: 'Tyre Replacement',
    subtitle: 'New tyres with balancing',
    priceRange: { min: 1200, max: 2000 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '45-60 min'
  },
  {
    id: 'bike-battery',
    title: 'Battery Replacement',
    subtitle: 'New battery with warranty',
    priceRange: { min: 1800, max: 2500 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '30-45 min'
  },
  {
    id: 'bike-ac',
    title: 'AC Service',
    subtitle: 'AC gas refill and maintenance', 
    priceRange: { min: 500, max: 800 },
    vehicleType: 'bike',
    category: 'maintenance',
    duration: '45-60 min'
  },
  {
    id: 'bike-alignment',
    title: 'Wheel Alignment',
    subtitle: 'Wheel alignment and balancing',
    priceRange: { min: 200, max: 400 },
    vehicleType: 'bike',
    category: 'maintenance',
    duration: '30-45 min'
  },
  {
    id: 'bike-suspension',
    title: 'Suspension Service',
    subtitle: 'Suspension repair and maintenance',
    priceRange: { min: 600, max: 1000 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '1-2 hours'
  },
  {
    id: 'bike-electrical',
    title: 'Electrical Repair',
    subtitle: 'Wiring and electrical component fixes',
    priceRange: { min: 300, max: 600 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '45-90 min'
  },
  {
    id: 'bike-wash',
    title: 'Bike Wash',
    subtitle: 'Complete wash and cleaning',
    priceRange: { min: 200, max: 350 },
    vehicleType: 'bike',
    category: 'enhancement',
    duration: '30-45 min'
  },
  {
    id: 'bike-detailing',
    title: 'Bike Detailing',
    subtitle: 'Premium wash and polish',
    priceRange: { min: 400, max: 700 },
    vehicleType: 'bike',
    category: 'enhancement',
    duration: '1-2 hours'
  },
  {
    id: 'bike-painting',
    title: 'Painting/Denting',
    subtitle: 'Body repair and painting',
    priceRange: { min: 800, max: 1500 },
    vehicleType: 'bike',
    category: 'repair',
    duration: '2-4 hours'
  },
  {
    id: 'bike-rsa',
    title: 'Roadside Assistance',
    subtitle: 'Emergency roadside help',
    priceRange: { min: 300, max: 600 },
    vehicleType: 'bike',
    category: 'emergency',
    duration: 'On-demand'
  }
];

// Car Services with affordable ranges
export const CAR_SERVICES: ServicePricing[] = [
  {
    id: 'car-general',
    title: 'General Service',
    subtitle: 'Basic maintenance and inspection',
    priceRange: { min: 1000, max: 1800 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '2-3 hours',
    popular: true
  },
  {
    id: 'car-periodic',
    title: 'Periodic Service', 
    subtitle: 'Comprehensive maintenance package',
    priceRange: { min: 2500, max: 3500 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '3-4 hours'
  },
  {
    id: 'car-major',
    title: 'Major Service',
    subtitle: 'Complete car overhaul',
    priceRange: { min: 4000, max: 6000 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '4-6 hours'
  },
  {
    id: 'car-oil',
    title: 'Oil Change',
    subtitle: 'Engine oil and filter replacement',
    priceRange: { min: 800, max: 1200 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '45-60 min'
  },
  {
    id: 'car-brake',
    title: 'Brake Service',
    subtitle: 'Brake pad replacement and service',
    priceRange: { min: 1500, max: 2500 },
    vehicleType: 'car',
    category: 'repair',
    duration: '1-2 hours'
  },
  {
    id: 'car-clutch',
    title: 'Clutch Repair',
    subtitle: 'Clutch plate and assembly service',
    priceRange: { min: 3000, max: 5000 },
    vehicleType: 'car',
    category: 'repair',
    duration: '3-4 hours'
  },
  {
    id: 'car-tyres',
    title: 'Tyre Replacement',
    subtitle: 'New tyres with alignment',
    priceRange: { min: 3000, max: 6000 },
    vehicleType: 'car',
    category: 'repair',
    duration: '1-2 hours'
  },
  {
    id: 'car-battery',
    title: 'Battery Replacement',
    subtitle: 'New battery with warranty',
    priceRange: { min: 3500, max: 5500 },
    vehicleType: 'car',
    category: 'repair',
    duration: '45-60 min'
  },
  {
    id: 'car-ac',
    title: 'AC Service',
    subtitle: 'AC gas refill and maintenance',
    priceRange: { min: 1200, max: 2000 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '1-2 hours'
  },
  {
    id: 'car-alignment',
    title: 'Wheel Alignment',
    subtitle: 'Wheel alignment and balancing',
    priceRange: { min: 600, max: 1000 },
    vehicleType: 'car',
    category: 'maintenance',
    duration: '45-60 min'
  },
  {
    id: 'car-suspension',
    title: 'Suspension Service',
    subtitle: 'Suspension repair and maintenance',
    priceRange: { min: 2000, max: 3500 },
    vehicleType: 'car',
    category: 'repair',
    duration: '2-3 hours'
  },
  {
    id: 'car-electrical',
    title: 'Electrical Repair',
    subtitle: 'Alternator, starter, wiring repairs',
    priceRange: { min: 800, max: 1500 },
    vehicleType: 'car',
    category: 'repair',
    duration: '1-3 hours'
  },
  {
    id: 'car-wash',
    title: 'Car Wash',
    subtitle: 'Complete exterior and interior cleaning',
    priceRange: { min: 400, max: 700 },
    vehicleType: 'car',
    category: 'enhancement',
    duration: '45-60 min'
  },
  {
    id: 'car-detailing',
    title: 'Car Detailing',
    subtitle: 'Premium wash, polish and interior',
    priceRange: { min: 1500, max: 2500 },
    vehicleType: 'car',
    category: 'enhancement',
    duration: '2-3 hours'
  },
  {
    id: 'car-painting',
    title: 'Painting/Denting',
    subtitle: 'Body repair and painting',
    priceRange: { min: 2000, max: 4000 },
    vehicleType: 'car',
    category: 'repair',
    duration: '4-8 hours'
  },
  {
    id: 'car-rsa',
    title: 'Roadside Assistance',
    subtitle: 'Emergency towing and roadside help',
    priceRange: { min: 800, max: 1500 },
    vehicleType: 'car',
    category: 'emergency',
    duration: 'On-demand'
  }
];

// Add-ons with affordable pricing
export const ADDONS: AddonPricing[] = [
  {
    id: 'pickup-drop',
    title: 'Pickup & Drop',
    description: 'Vehicle pickup and drop service',
    priceRange: { min: 150, max: 300 }
  },
  {
    id: 'diagnosis',
    title: 'Comprehensive Diagnosis',
    description: 'Complete diagnostic scan and report',
    priceRange: { min: 200, max: 400 }
  },
  {
    id: 'emergency-2hr',
    title: 'Emergency 2-Hour Service',
    description: 'Priority service within 2 hours',
    priceRange: { min: 200, max: 400 }
  },
  {
    id: 'extended-warranty',
    title: 'Extended Warranty',
    description: 'Additional warranty coverage',
    priceRange: { min: 300, max: 600 }
  }
];

// City multiplier application
export const applyCityMultiplier = (priceRange: PriceRange, city: NCRCity): PriceRange => {
  const multiplier = CITY_MULTIPLIERS[city];
  const factor = 1 + (multiplier / 100);
  
  return {
    min: Math.round(priceRange.min * factor),
    max: Math.round(priceRange.max * factor)
  };
};

// Calculate total pricing
export interface EstimateTotal {
  subtotal: PriceRange;
  addons: PriceRange;
  total: PriceRange;
  doorstepCharge: number;
}

export const calculateEstimate = (
  services: string[],
  addons: string[],
  vehicleType: 'bike' | 'car',
  city: NCRCity
): EstimateTotal => {
  const serviceList = vehicleType === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
  
  // Get selected services
  const selectedServices = services.map(id => 
    serviceList.find(s => s.id === id)
  ).filter(Boolean) as ServicePricing[];
  
  // Get selected addons
  const selectedAddons = addons.map(id =>
    ADDONS.find(a => a.id === id)
  ).filter(Boolean) as AddonPricing[];
  
  // Calculate service subtotal
  const serviceSubtotal = selectedServices.reduce((acc, service) => {
    const cityAdjusted = applyCityMultiplier(service.priceRange, city);
    return {
      min: acc.min + cityAdjusted.min,
      max: acc.max + cityAdjusted.max
    };
  }, { min: 0, max: 0 });
  
  // Calculate addon total
  const addonTotal = selectedAddons.reduce((acc, addon) => {
    const cityAdjusted = applyCityMultiplier(addon.priceRange, city);
    return {
      min: acc.min + cityAdjusted.min,
      max: acc.max + cityAdjusted.max
    };
  }, { min: 0, max: 0 });
  
  // Doorstep charge (free for combo services > ₹1000)
  const hasPremiumService = selectedServices.some(s => s.priceRange.min >= 1000);
  const doorstepCharge = (hasPremiumService || addons.includes('pickup-drop')) ? 0 : 99;
  
  return {
    subtotal: serviceSubtotal,
    addons: addonTotal,
    total: {
      min: serviceSubtotal.min + addonTotal.min + doorstepCharge,
      max: serviceSubtotal.max + addonTotal.max + doorstepCharge
    },
    doorstepCharge
  };
};

// Format price range for display
export const formatPriceRange = (priceRange: PriceRange): string => {
  if (priceRange.min === priceRange.max) {
    return `₹${priceRange.min.toLocaleString()}`;
  }
  return `₹${priceRange.min.toLocaleString()}–₹${priceRange.max.toLocaleString()}`;
};

// Get service by ID
export const getServiceById = (id: string, vehicleType: 'bike' | 'car'): ServicePricing | undefined => {
  const serviceList = vehicleType === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
  return serviceList.find(s => s.id === id);
};

// Get addon by ID
export const getAddonById = (id: string): AddonPricing | undefined => {
  return ADDONS.find(a => a.id === id);
};