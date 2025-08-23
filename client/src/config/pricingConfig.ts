import { 
  Wrench, Car, Bike, Shield, Clock, Home, Zap, 
  Settings, Droplets, Disc, Battery, Wind, Paintbrush, Phone
} from 'lucide-react';

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  badge?: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  bikePrice: string;
  carPrice: string;
  icon: any;
}

export interface AddOnService {
  id: string;
  title: string;
  price: string;
  icon: any;
}

export const bikePlans: PricingPlan[] = [
  {
    id: 'bike-basic',
    name: 'Basic Service',
    price: '₹400 - 600',
    tagline: 'Essential maintenance for your bike',
    features: [
      'Engine oil change',
      'Basic safety check',
      'Brake inspection',
      'Chain lubrication',
      '1 month warranty',
      'Doorstep service'
    ],
    buttonText: 'Choose Basic'
  },
  {
    id: 'bike-standard',
    name: 'Standard Service',
    price: '₹700 - 1,000',
    tagline: 'Complete periodic maintenance',
    badge: 'Best Value',
    popular: true,
    features: [
      'Engine oil & filter change',
      'Brake pad inspection',
      'Clutch adjustment',
      'Spark plug check',
      'Chain cleaning & lubrication',
      'Battery check',
      '3 months warranty',
      'Free pickup & drop'
    ],
    buttonText: 'Choose Standard'
  },
  {
    id: 'bike-premium',
    name: 'Premium Service',
    price: '₹1,200 - 1,500',
    tagline: 'Comprehensive full service',
    features: [
      'Complete engine service',
      'Brake system overhaul',
      'Clutch plate replacement',
      'Carburetor cleaning',
      'Electrical system check',
      'Tyre pressure & alignment',
      'Complete wash & detailing',
      '6 months warranty',
      'Emergency support'
    ],
    buttonText: 'Choose Premium'
  }
];

export const carPlans: PricingPlan[] = [
  {
    id: 'car-basic',
    name: 'Basic Service',
    price: '₹1,000 - 1,800',
    tagline: 'Essential car maintenance',
    features: [
      'Engine oil change',
      'Basic safety inspection',
      'Brake fluid check',
      'Battery test',
      'Tyre pressure check',
      '1 month warranty',
      'Doorstep service'
    ],
    buttonText: 'Choose Basic'
  },
  {
    id: 'car-standard',
    name: 'Standard Service',
    price: '₹2,500 - 3,500',
    tagline: 'Comprehensive periodic service',
    badge: 'Most Popular',
    popular: true,
    features: [
      'Engine oil & filter change',
      'Brake pad inspection',
      'AC gas top-up',
      'Battery & alternator check',
      'Suspension inspection',
      'Wheel alignment check',
      '3 months warranty',
      'Free pickup & drop'
    ],
    buttonText: 'Choose Standard'
  },
  {
    id: 'car-premium',
    name: 'Premium Service',
    price: '₹4,000 - 6,000',
    tagline: 'Complete major service',
    features: [
      'Complete engine overhaul',
      'Brake system service',
      'AC complete service',
      'Suspension repair',
      'Electrical system check',
      'Paint touch-up',
      'Interior deep cleaning',
      '6 months warranty',
      '24/7 emergency support'
    ],
    buttonText: 'Choose Premium'
  }
];

export const addOnServices: AddOnService[] = [
  {
    id: 'pickup-drop',
    title: 'Pickup & Drop',
    price: '₹150 - 300',
    icon: Car
  },
  {
    id: 'home-diagnosis',
    title: 'Home Diagnosis',
    price: '₹200 - 400',
    icon: Home
  },
  {
    id: 'emergency-service',
    title: 'Emergency 2-Hour Service',
    price: '+₹200 - 400',
    icon: Zap
  },
  {
    id: 'extended-warranty',
    title: 'Extended Warranty',
    price: '₹300 - 600',
    icon: Shield
  }
];

export const detailedServices: ServiceItem[] = [
  {
    id: 'oil-change',
    title: 'Engine Oil Change',
    description: 'High-quality engine oil replacement with filter',
    bikePrice: '₹300 - 500',
    carPrice: '₹800 - 1,200',
    icon: Droplets
  },
  {
    id: 'brake-replacement',
    title: 'Brake Pad Replacement',
    description: 'Premium brake pads for safe stopping',
    bikePrice: '₹400 - 700',
    carPrice: '₹1,500 - 2,500',
    icon: Disc
  },
  {
    id: 'clutch-work',
    title: 'Clutch Service',
    description: 'Clutch plate and pressure plate service',
    bikePrice: '₹800 - 1,200',
    carPrice: '₹3,000 - 5,000',
    icon: Settings
  },
  {
    id: 'battery-service',
    title: 'Battery Replacement',
    description: 'High-performance battery with warranty',
    bikePrice: '₹1,500 - 2,500',
    carPrice: '₹3,000 - 6,000',
    icon: Battery
  },
  {
    id: 'ac-service',
    title: 'AC Service',
    description: 'Complete AC system cleaning and gas refill',
    bikePrice: 'N/A',
    carPrice: '₹1,200 - 2,000',
    icon: Wind
  },
  {
    id: 'painting',
    title: 'Paint Touch-up',
    description: 'Professional paint restoration service',
    bikePrice: '₹1,000 - 2,000',
    carPrice: '₹3,000 - 8,000',
    icon: Paintbrush
  },
  {
    id: 'roadside-assistance',
    title: 'Roadside Assistance',
    description: '24/7 emergency breakdown service',
    bikePrice: '₹200 - 400',
    carPrice: '₹400 - 800',
    icon: Phone
  }
];

export const comparisonFeatures = [
  { feature: 'Engine Oil Change', basic: true, standard: true, premium: true },
  { feature: 'Brake Inspection', basic: true, standard: true, premium: true },
  { feature: 'Warranty', basic: '1 Month', standard: '3 Months', premium: '6 Months' },
  { feature: 'Pickup & Drop', basic: false, standard: true, premium: true },
  { feature: 'Complete Wash', basic: false, standard: false, premium: true },
  { feature: 'Detailed Report', basic: false, standard: true, premium: true },
  { feature: 'Emergency Support', basic: false, standard: false, premium: true },
  { feature: 'Extended Service', basic: false, standard: false, premium: true }
];

export const pricingFAQs = [
  {
    question: 'Are spare parts included in the service cost?',
    answer: 'Service charges cover labor and basic consumables. Spare parts like brake pads, filters, or batteries are charged separately at transparent market rates.'
  },
  {
    question: 'Do prices vary by city?',
    answer: 'Yes, prices may vary slightly based on local market conditions and service availability. The ranges shown cover most major cities.'
  },
  {
    question: 'How fast can the service be completed?',
    answer: 'Basic services take 1-2 hours, Standard services 2-4 hours, and Premium services can take 4-8 hours depending on the work required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, UPI, credit/debit cards, and digital wallets. Payment is due after service completion.'
  },
  {
    question: 'Is there a cancellation policy?',
    answer: 'You can cancel or reschedule up to 2 hours before the appointment without any charges.'
  },
  {
    question: 'What if I need additional work during service?',
    answer: 'Our mechanic will inform you of any additional work needed and get your approval before proceeding. No surprise charges.'
  }
];