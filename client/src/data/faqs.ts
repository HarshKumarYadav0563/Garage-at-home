export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  city?: string;
  vehicle?: 'bike' | 'car';
  schema: {
    question: string;
    answer: {
      '@type': string;
      text: string;
    };
  };
}

export const faqs: FAQ[] = [
  // General Service FAQs
  {
    id: '1',
    question: 'How long does doorstep service take in Delhi NCR?',
    answer: 'Most doorstep services are completed within 45-90 minutes. Basic services like oil changes take 20-30 minutes, while comprehensive services may take up to 2 hours. Our mechanics arrive with all necessary tools and parts to complete the service efficiently at your location.',
    category: 'Service Duration',
    city: 'Delhi NCR',
    schema: {
      question: 'How long does doorstep service take in Delhi NCR?',
      answer: {
        '@type': 'Answer',
        text: 'Most doorstep services are completed within 45-90 minutes. Basic services like oil changes take 20-30 minutes, while comprehensive services may take up to 2 hours. Our mechanics arrive with all necessary tools and parts to complete the service efficiently at your location.'
      }
    }
  },
  {
    id: '2',
    question: 'What areas do you cover in Gurgaon for bike service?',
    answer: 'We provide doorstep bike service across all major areas in Gurgaon including DLF Phases 1-5, Sectors 14-115, Golf Course Road, Sohna Road, MG Road, Cyber City, and New Gurgaon. Our mechanics typically reach your location within 20-45 minutes depending on the area.',
    category: 'Service Areas',
    city: 'Gurgaon',
    vehicle: 'bike',
    schema: {
      question: 'What areas do you cover in Gurgaon for bike service?',
      answer: {
        '@type': 'Answer',
        text: 'We provide doorstep bike service across all major areas in Gurgaon including DLF Phases 1-5, Sectors 14-115, Golf Course Road, Sohna Road, MG Road, Cyber City, and New Gurgaon. Our mechanics typically reach your location within 20-45 minutes depending on the area.'
      }
    }
  },
  {
    id: '3',
    question: 'How much does car service cost in Noida?',
    answer: 'Car service costs in Noida start from ₹899 for basic service, ₹1,499 for comprehensive service, and ₹599 for oil changes. Prices include genuine parts, labor, and doorstep convenience. We offer transparent pricing with no hidden charges and provide digital invoices.',
    category: 'Pricing',
    city: 'Noida',
    vehicle: 'car',
    schema: {
      question: 'How much does car service cost in Noida?',
      answer: {
        '@type': 'Answer',
        text: 'Car service costs in Noida start from ₹899 for basic service, ₹1,499 for comprehensive service, and ₹599 for oil changes. Prices include genuine parts, labor, and doorstep convenience. We offer transparent pricing with no hidden charges and provide digital invoices.'
      }
    }
  },
  {
    id: '4',
    question: 'Do you provide emergency bike service in Faridabad?',
    answer: 'Yes, we provide 24/7 emergency bike service in Faridabad. Our emergency services include puncture repair, jump start, emergency fuel delivery, and roadside assistance. Emergency response time is typically 20-45 minutes across all sectors of Faridabad.',
    category: 'Emergency Service',
    city: 'Faridabad',
    vehicle: 'bike',
    schema: {
      question: 'Do you provide emergency bike service in Faridabad?',
      answer: {
        '@type': 'Answer',
        text: 'Yes, we provide 24/7 emergency bike service in Faridabad. Our emergency services include puncture repair, jump start, emergency fuel delivery, and roadside assistance. Emergency response time is typically 20-45 minutes across all sectors of Faridabad.'
      }
    }
  },
  {
    id: '5',
    question: 'What bike services are available at home in Ghaziabad?',
    answer: 'We offer complete bike services at home in Ghaziabad including engine oil change, chain cleaning & lubrication, brake adjustment, battery service, puncture repair, carburetor cleaning, and comprehensive servicing. All services use genuine parts with warranty.',
    category: 'Available Services',
    city: 'Ghaziabad',
    vehicle: 'bike',
    schema: {
      question: 'What bike services are available at home in Ghaziabad?',
      answer: {
        '@type': 'Answer',
        text: 'We offer complete bike services at home in Ghaziabad including engine oil change, chain cleaning & lubrication, brake adjustment, battery service, puncture repair, carburetor cleaning, and comprehensive servicing. All services use genuine parts with warranty.'
      }
    }
  },
  {
    id: '6',
    question: 'How do I book a car service appointment in Delhi?',
    answer: 'Booking car service in Delhi is simple: 1) Visit our website or call us, 2) Select your car model and required service, 3) Choose date and time slot, 4) Provide your address, 5) Our certified mechanic will arrive at your scheduled time with all necessary equipment and parts.',
    category: 'Booking Process',
    city: 'Delhi',
    vehicle: 'car',
    schema: {
      question: 'How do I book a car service appointment in Delhi?',
      answer: {
        '@type': 'Answer',
        text: 'Booking car service in Delhi is simple: 1) Visit our website or call us, 2) Select your car model and required service, 3) Choose date and time slot, 4) Provide your address, 5) Our certified mechanic will arrive at your scheduled time with all necessary equipment and parts.'
      }
    }
  },
  {
    id: '7',
    question: 'Is doorstep service reliable and safe?',
    answer: 'Yes, our doorstep service is completely reliable and safe. All mechanics are certified professionals with 5+ years experience, background verified, and insured. We use genuine parts, provide service warranties, and maintain transparent pricing. Real-time tracking and digital payments ensure security.',
    category: 'Safety & Reliability',
    schema: {
      question: 'Is doorstep service reliable and safe?',
      answer: {
        '@type': 'Answer',
        text: 'Yes, our doorstep service is completely reliable and safe. All mechanics are certified professionals with 5+ years experience, background verified, and insured. We use genuine parts, provide service warranties, and maintain transparent pricing. Real-time tracking and digital payments ensure security.'
      }
    }
  },
  {
    id: '8',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including UPI (PhonePe, Google Pay, Paytm), debit/credit cards, net banking, and cash. Digital payments are preferred for contactless service. All payments are secure and you receive digital invoices immediately after service completion.',
    category: 'Payment Methods',
    schema: {
      question: 'What payment methods do you accept?',
      answer: {
        '@type': 'Answer',
        text: 'We accept all major payment methods including UPI (PhonePe, Google Pay, Paytm), debit/credit cards, net banking, and cash. Digital payments are preferred for contactless service. All payments are secure and you receive digital invoices immediately after service completion.'
      }
    }
  },
  {
    id: '9',
    question: 'Do you provide warranty on parts and service?',
    answer: 'Yes, we provide comprehensive warranty on all parts and services. Genuine parts come with manufacturer warranty (6-12 months), service warranty is 30 days for labor, and engine oil changes have 3-month/3,000 km warranty. Extended warranties available for premium services.',
    category: 'Warranty',
    schema: {
      question: 'Do you provide warranty on parts and service?',
      answer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive warranty on all parts and services. Genuine parts come with manufacturer warranty (6-12 months), service warranty is 30 days for labor, and engine oil changes have 3-month/3,000 km warranty. Extended warranties available for premium services.'
      }
    }
  },
  {
    id: '10',
    question: 'Can I track my service progress in real-time?',
    answer: 'Yes, we provide real-time service tracking via WhatsApp and SMS updates. You receive notifications when the mechanic is assigned, en route, arrives, starts service, and completes the work. Photos of completed work and digital invoices are shared instantly.',
    category: 'Service Tracking',
    schema: {
      question: 'Can I track my service progress in real-time?',
      answer: {
        '@type': 'Answer',
        text: 'Yes, we provide real-time service tracking via WhatsApp and SMS updates. You receive notifications when the mechanic is assigned, en route, arrives, starts service, and completes the work. Photos of completed work and digital invoices are shared instantly.'
      }
    }
  }
];

export const getFAQsByCity = (city: string): FAQ[] => {
  return faqs.filter(faq => !faq.city || faq.city.toLowerCase().includes(city.toLowerCase()));
};

export const getFAQsByVehicle = (vehicle: 'bike' | 'car'): FAQ[] => {
  return faqs.filter(faq => !faq.vehicle || faq.vehicle === vehicle);
};

export const getFAQsByCategory = (category: string): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getFAQsForPage = (city?: string, vehicle?: 'bike' | 'car', limit: number = 6): FAQ[] => {
  let filteredFAQs = faqs;
  
  if (city) {
    filteredFAQs = filteredFAQs.filter(faq => !faq.city || faq.city.toLowerCase().includes(city.toLowerCase()));
  }
  
  if (vehicle) {
    filteredFAQs = filteredFAQs.filter(faq => !faq.vehicle || faq.vehicle === vehicle);
  }
  
  return filteredFAQs.slice(0, limit);
};