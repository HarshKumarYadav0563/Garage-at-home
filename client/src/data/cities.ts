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
    name: 'NCR',
    slug: 'ncr',
    state: 'Delhi NCR',
    lat: 28.6139,
    lng: 77.2090,
    areas: ['Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Delhi'],
    description: 'Professional doorstep bike and car service in NCR with expert mechanics, transparent pricing, and same-day service.'
  }
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}
