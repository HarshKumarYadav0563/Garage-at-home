export interface Review {
  id: string;
  customerName: string;
  location: string;
  city: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 'rev_001',
    customerName: 'Amit Kumar',
    location: 'Doranda, Ranchi',
    city: 'ranchi',
    rating: 5,
    comment: 'Excellent service! The mechanic came on time and fixed my bike\'s brake issue perfectly. Very professional and reasonable pricing.',
    service: 'Brake Service',
    date: '2024-01-20'
  },
  {
    id: 'rev_002',
    customerName: 'Priya Singh',
    location: 'Kanke, Ranchi',
    city: 'ranchi',
    rating: 5,
    comment: 'Amazing convenience! Got my scooter serviced at home. The app tracking feature is really helpful to see progress.',
    service: 'Oil Change',
    date: '2024-01-18'
  },
  {
    id: 'rev_003',
    customerName: 'Raj Patel',
    location: 'Harmu, Ranchi',
    city: 'ranchi',
    rating: 5,
    comment: 'Best bike service in Ranchi! Transparent pricing and skilled mechanics. Will definitely use again.',
    service: 'General Service',
    date: '2024-01-15'
  },
  {
    id: 'rev_004',
    customerName: 'Sunita Sharma',
    location: 'Bailey Road, Patna',
    city: 'patna',
    rating: 5,
    comment: 'Very satisfied with the car AC service. Cool air is back and the mechanic was very knowledgeable.',
    service: 'AC Service',
    date: '2024-01-22'
  },
  {
    id: 'rev_005',
    customerName: 'Rahul Gupta',
    location: 'Boring Road, Patna',
    city: 'patna',
    rating: 4,
    comment: 'Good service quality and reasonable rates. Booking was easy and mechanic arrived on time.',
    service: 'Oil Change',
    date: '2024-01-19'
  },
  {
    id: 'rev_006',
    customerName: 'Anjali Jain',
    location: 'C-Scheme, Jaipur',
    city: 'jaipur',
    rating: 5,
    comment: 'Fantastic doorstep service! My car runs so much better after the service. Highly recommended.',
    service: 'Full Service',
    date: '2024-01-17'
  }
];

export function getReviewsByCity(city: string): Review[] {
  return reviews.filter(review => review.city === city).slice(0, 3);
}
