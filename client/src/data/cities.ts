export interface City {
  name: string;
  slug: string;
  state: string;
  lat: number;
  lng: number;
  areas: string[];
  description: string;
}

export const cities: City[] = [
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    lat: 28.7041,
    lng: 77.1025,
    areas: ['Connaught Place', 'Khan Market', 'Saket', 'Lajpat Nagar', 'Karol Bagh', 'Dwarka'],
    description: 'Professional doorstep bike and car service in Delhi with expert mechanics, transparent pricing, and same-day service.'
  },
  {
    name: 'Gurugram',
    slug: 'gurugram',
    state: 'Haryana', 
    lat: 28.4595,
    lng: 77.0266,
    areas: ['Cyber City', 'Golf Course Road', 'Sector 14', 'DLF Phase 1', 'MG Road', 'Udyog Vihar'],
    description: 'Reliable doorstep vehicle service in Gurugram covering all major areas with skilled mechanics and quality parts.'
  },
  {
    name: 'Noida',
    slug: 'noida', 
    state: 'Uttar Pradesh',
    lat: 28.5355,
    lng: 77.3910,
    areas: ['Sector 18', 'Sector 62', 'Film City', 'City Center', 'Greater Noida', 'Sector 78'],
    description: 'Premium doorstep vehicle service in Noida with certified mechanics and genuine spare parts.'
  },
  {
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.6692,
    lng: 77.4538,
    areas: ['Indirapuram', 'Vaishali', 'Crossings Republik', 'Kaushambi', 'Raj Nagar', 'Shipra Mall'],
    description: 'Professional doorstep vehicle service in Ghaziabad with expert mechanics and transparent pricing.'
  },
  {
    name: 'Faridabad',
    slug: 'faridabad',
    state: 'Haryana',
    lat: 28.4089,
    lng: 77.3178,
    areas: ['Sector 16', 'New Industrial Township', 'Ballabhgarh', 'Neharpar', 'Sector 81', 'Old Faridabad'],
    description: 'Reliable doorstep vehicle service in Faridabad covering all major residential and commercial areas.'
  }
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}
