export interface Testimonial {
  id: string;
  name: string;
  location: string;
  city: string;
  vehicle: 'bike' | 'car';
  service: string;
  rating: number;
  reviewText: string;
  date: string;
  verified: boolean;
  profileImage?: string;
  serviceImages?: string[];
  schema: {
    author: {
      '@type': string;
      name: string;
    };
    reviewRating: {
      '@type': string;
      ratingValue: number;
      bestRating: number;
    };
    reviewBody: string;
    datePublished: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Connaught Place, Delhi',
    city: 'Delhi',
    vehicle: 'bike',
    service: 'Complete Bike Service',
    rating: 5,
    reviewText: 'Excellent service! My Honda Activa was serviced right in my office parking. The mechanic, Suresh, was professional and explained every step. Used genuine parts and completed the work in just 1 hour. Saved me a trip to the garage and got better service than expected. Highly recommend for busy professionals in Delhi.',
    date: '2024-01-18',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    serviceImages: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
    schema: {
      author: {
        '@type': 'Person',
        name: 'Rajesh Kumar'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Excellent service! My Honda Activa was serviced right in my office parking. The mechanic was professional and explained every step. Used genuine parts and completed the work in just 1 hour.',
      datePublished: '2024-01-18'
    }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'DLF Phase 3, Gurugram',
    city: 'Gurugram',
    vehicle: 'car',
    service: 'Car AC Service',
    rating: 5,
    reviewText: 'Outstanding AC service at my home! My Hyundai Creta\'s AC wasn\'t cooling properly. The technician arrived on time with professional equipment, diagnosed the issue, and fixed it completely. Now the AC cools better than when the car was new. Very transparent pricing and excellent customer service. Will definitely use again.',
    date: '2024-01-15',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    serviceImages: ['/api/placeholder/300/200'],
    schema: {
      author: {
        '@type': 'Person',
        name: 'Priya Sharma'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Outstanding AC service at my home! The technician diagnosed and fixed the AC issue completely. Now it cools better than when the car was new.',
      datePublished: '2024-01-15'
    }
  },
  {
    id: '3',
    name: 'Amit Singh',
    location: 'Sector 62, Noida',
    city: 'Noida',
    vehicle: 'bike',
    service: 'Battery Replacement',
    rating: 5,
    reviewText: 'My bike wouldn\'t start in the morning. Called Garage At Home and they reached within 30 minutes. Quick diagnosis showed battery failure. They had a replacement battery and installed it on the spot. Fair pricing, genuine Exide battery, and now my bike starts perfectly. Great service for Noida residents!',
    date: '2024-01-12',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Amit Singh'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Quick diagnosis and battery replacement at my location. Fair pricing, genuine battery, and excellent service for Noida residents.',
      datePublished: '2024-01-12'
    }
  },
  {
    id: '4',
    name: 'Neha Gupta',
    location: 'Indirapuram, Ghaziabad',
    city: 'Ghaziabad',
    vehicle: 'car',
    service: 'General Service',
    rating: 4,
    reviewText: 'Good service experience for my Maruti Swift. The mechanic was knowledgeable and completed the service professionally. Oil change, filter replacement, and general checkup all done at my society parking. Pricing was reasonable and work quality was good. Only minor delay in arrival time, otherwise satisfied with the service.',
    date: '2024-01-10',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Neha Gupta'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 4,
        bestRating: 5
      },
      reviewBody: 'Good service experience. The mechanic was knowledgeable and completed the service professionally. Reasonable pricing and good work quality.',
      datePublished: '2024-01-10'
    }
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    location: 'Sector 21, Faridabad',
    city: 'Faridabad',
    vehicle: 'bike',
    service: 'Chain Cleaning & Lubrication',
    rating: 5,
    reviewText: 'Excellent chain service for my Royal Enfield. The mechanic cleaned the chain thoroughly and applied high-quality lubricant. Also checked the sprockets and adjusted the tension perfectly. The bike runs much smoother now. Great value for money and convenient doorstep service in Faridabad.',
    date: '2024-01-08',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Vikram Mehta'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Excellent chain service. Thorough cleaning, high-quality lubricant, and perfect tension adjustment. Great value for money and convenient doorstep service.',
      datePublished: '2024-01-08'
    }
  },
  {
    id: '6',
    name: 'Sunita Agarwal',
    location: 'Laxmi Nagar, Delhi',
    city: 'Delhi',
    vehicle: 'car',
    service: 'Brake Service',
    rating: 5,
    reviewText: 'My car brakes were making noise and feeling spongy. The Garage At Home technician replaced the brake pads and serviced the brake oil. Very professional work and the brakes feel like new. Safety is important and they did an excellent job. Reasonable pricing and no need to visit a garage.',
    date: '2024-01-05',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Sunita Agarwal'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Professional brake service with pad replacement and oil servicing. Excellent job on safety-critical work. Reasonable pricing without garage visit.',
      datePublished: '2024-01-05'
    }
  },
  {
    id: '7',
    name: 'Rahul Verma',
    location: 'Golf Course Road, Gurugram',
    city: 'Gurugram',
    vehicle: 'bike',
    service: 'Comprehensive Service',
    rating: 5,
    reviewText: 'Premium service for my Bajaj Pulsar 220. Complete service including engine oil, air filter, spark plug, chain lubrication, and brake adjustment. The mechanic was very experienced and used only genuine parts. Service completed in my office parking during lunch break. Perfect for working professionals!',
    date: '2024-01-03',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Rahul Verma'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: 'Premium comprehensive service with genuine parts. Experienced mechanic completed service during lunch break. Perfect for working professionals.',
      datePublished: '2024-01-03'
    }
  },
  {
    id: '8',
    name: 'Kavita Jain',
    location: 'Sector 50, Noida',
    city: 'Noida',
    vehicle: 'car',
    service: 'Engine Oil Change',
    rating: 4,
    reviewText: 'Simple and efficient oil change service at home. Used genuine Castrol oil and new filter. The process was clean and professional. Mechanic explained the oil grade and next service schedule. Convenient and time-saving for busy schedules. Good value for the convenience provided.',
    date: '2024-01-01',
    verified: true,
    profileImage: '/api/placeholder/64/64',
    schema: {
      author: {
        '@type': 'Person',
        name: 'Kavita Jain'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 4,
        bestRating: 5
      },
      reviewBody: 'Efficient oil change with genuine products. Clean, professional process with good explanation. Convenient and time-saving for busy schedules.',
      datePublished: '2024-01-01'
    }
  }
];

export const getTestimonialsByCity = (city: string): Testimonial[] => {
  return testimonials.filter(testimonial => 
    testimonial.city.toLowerCase() === city.toLowerCase()
  );
};

export const getTestimonialsByVehicle = (vehicle: 'bike' | 'car'): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.vehicle === vehicle);
};

export const getFeaturedTestimonials = (limit: number = 6): Testimonial[] => {
  return testimonials
    .filter(testimonial => testimonial.rating >= 4)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAverageRating = (): number => {
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return Number((totalRating / testimonials.length).toFixed(1));
};

export const getRatingDistribution = (): Record<number, number> => {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  testimonials.forEach(testimonial => {
    distribution[testimonial.rating]++;
  });
  
  return distribution;
};

export const getTotalReviews = (): number => {
  return testimonials.length;
};