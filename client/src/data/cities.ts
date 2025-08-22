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
    name: 'Ranchi',
    slug: 'ranchi',
    state: 'Jharkhand',
    lat: 23.3441,
    lng: 85.3096,
    areas: ['Doranda', 'Kanke', 'Harmu', 'Bariatu', 'Ratu Road', 'Lalpur'],
    description: 'Professional doorstep bike and car service in Ranchi with expert mechanics, transparent pricing, and same-day service.'
  },
  {
    name: 'Patna',
    slug: 'patna',
    state: 'Bihar', 
    lat: 25.5941,
    lng: 85.1376,
    areas: ['Boring Road', 'Bailey Road', 'Kankarbagh', 'Patliputra', 'Raja Bazar', 'Danapur'],
    description: 'Reliable doorstep vehicle service in Patna covering all major areas with skilled mechanics and quality parts.'
  },
  {
    name: 'Jaipur',
    slug: 'jaipur', 
    state: 'Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    areas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Jagatpura', 'Tonk Road'],
    description: 'Premium doorstep vehicle service in Jaipur with certified mechanics and genuine spare parts.'
  }
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}
