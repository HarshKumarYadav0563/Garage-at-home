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
    title: `Book ${vehicleName} Service at Home in ${cityName} | Garage At Home`,
    description: `Affordable doorstep ${vehicle} servicing in ${cityName}, Delhi-NCR. Certified mechanics, transparent pricing, fast service.`,
    canonical: `/services/${vehicle}/${city}`
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