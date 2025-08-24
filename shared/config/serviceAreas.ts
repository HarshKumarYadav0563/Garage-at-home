// Delhi-NCR Service Areas Configuration
export const NCR_CITIES = [
  'delhi',
  'gurugram', 
  'noida',
  'ghaziabad',
  'faridabad'
] as const;

export const VEHICLES = ['bike', 'car'] as const;

export type NCRCity = typeof NCR_CITIES[number];
export type VehicleType = typeof VEHICLES[number];

// City display names
export const CITY_DISPLAY_NAMES: Record<NCRCity, string> = {
  delhi: 'Delhi',
  gurugram: 'Gurugram', 
  noida: 'Noida',
  ghaziabad: 'Ghaziabad',
  faridabad: 'Faridabad'
};

// Vehicle display names
export const VEHICLE_DISPLAY_NAMES: Record<VehicleType, string> = {
  bike: 'Bike',
  car: 'Car'
};

// City aliases for normalization
export const CITY_ALIASES: Record<string, NCRCity> = {
  'gurgaon': 'gurugram',
  'ggn': 'gurugram',
  'greater-noida': 'noida',
  'gr-noida': 'noida',
  'new-delhi': 'delhi',
  'south-delhi': 'delhi',
  'north-delhi': 'delhi',
  'east-delhi': 'delhi',
  'west-delhi': 'delhi',
  'central-delhi': 'delhi'
};

// City pricing multipliers (0 = no change, positive = increase, negative = decrease)
export const CITY_MULTIPLIERS: Record<NCRCity, number> = {
  delhi: 0,        // Base pricing
  gurugram: 5,     // +5% premium
  noida: 0,        // Base pricing
  ghaziabad: -5,   // -5% discount
  faridabad: -5    // -5% discount
};

// Helper functions
export const normalizeCity = (city: string): NCRCity | null => {
  const normalized = city.toLowerCase().replace(/[^a-z]/g, '-');
  
  // Check direct match
  if (NCR_CITIES.includes(normalized as NCRCity)) {
    return normalized as NCRCity;
  }
  
  // Check aliases
  if (CITY_ALIASES[normalized]) {
    return CITY_ALIASES[normalized];
  }
  
  return null;
};

export const isNCR = (city: string): boolean => {
  return normalizeCity(city) !== null;
};

// Route validation
export const isValidRoute = (vehicle: string, city: string): boolean => {
  return VEHICLES.includes(vehicle as VehicleType) && 
         NCR_CITIES.includes(city as NCRCity);
};

// Generate SEO metadata
export const generateSEOMetadata = (vehicle: VehicleType, city: NCRCity) => {
  const vehicleName = VEHICLE_DISPLAY_NAMES[vehicle];
  const cityName = CITY_DISPLAY_NAMES[city];
  
  return {
    title: `Doorstep ${vehicleName} Service in ${cityName} | Garage At Home (Delhi-NCR)`,
    description: `Affordable doorstep ${vehicle} servicing in ${cityName}, Delhi-NCR. Rated 4.9★ by 25,000+ customers. Transparent pricing & fast slots.`,
    canonical: `/services/${vehicle}/${city}`,
    keywords: `${vehicle} service ${cityName}, doorstep ${vehicle} repair, ${vehicleName.toLowerCase()} maintenance ${cityName}, vehicle service at home`
  };
};

// Get all valid routes for sitemap
export const getAllServiceRoutes = (): Array<{vehicle: VehicleType, city: NCRCity}> => {
  const routes = [];
  for (const vehicle of VEHICLES) {
    for (const city of NCR_CITIES) {
      routes.push({ vehicle, city });
    }
  }
  return routes;
};

// Default city fallback
export const DEFAULT_CITY: NCRCity = 'delhi';

// Business ratings data
export const BUSINESS_RATINGS = {
  rating: 4.9,
  reviewCount: 25000,
  verified: true
};