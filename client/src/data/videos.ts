export interface Video {
  id: string;
  title: string;
  description: string;
  embedId: string; // YouTube embed ID
  thumbnail: string;
  duration: string;
  category: string;
  tags: string[];
  publishedAt: string;
  views: number;
  transcript: string; // For SEO
  schema: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    embedUrl: string;
  };
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'How Garage At Home Works - Complete Process Explained',
    description: 'Watch how our doorstep vehicle service works from booking to completion. See our certified mechanics in action and understand why thousands trust us with their vehicle care.',
    embedId: 'dQw4w9WgXcQ', // Placeholder YouTube ID
    thumbnail: '/api/placeholder/640/360',
    duration: 'PT5M30S', // ISO 8601 duration format
    category: 'How It Works',
    tags: ['doorstep service', 'vehicle maintenance', 'garage at home', 'process'],
    publishedAt: '2024-01-15',
    views: 25000,
    transcript: `Welcome to Garage At Home, where professional vehicle care comes to your doorstep. In this video, we'll show you exactly how our service works and why it's the preferred choice for vehicle maintenance across Delhi NCR.\n\nStep 1: Easy Booking\nStart by visiting our website or calling our helpline. Select your vehicle type - bike or car - and choose from our comprehensive range of services. Pick a convenient date and time slot that works for your schedule.\n\nStep 2: Professional Assignment\nOnce you book, our system immediately assigns a certified mechanic near your location. You'll receive a confirmation message with the mechanic's details, including their photo, certification level, and customer ratings.\n\nStep 3: Arrival and Setup\nOur mechanic arrives at your specified location with all necessary tools and genuine spare parts. They'll set up a clean workspace and begin with a thorough inspection of your vehicle.\n\nStep 4: Transparent Service\nEvery step of the service is explained clearly. You can watch the entire process and ask questions. We use only genuine parts and provide transparent pricing with no hidden charges.\n\nStep 5: Quality Check\nAfter completing the service, our mechanic conducts a comprehensive quality check and provides you with a detailed service report. You'll also receive photos of the work completed.\n\nStep 6: Digital Payment and Warranty\nComplete your payment digitally for a contactless experience. All our services come with warranty and 24/7 customer support for any follow-up needs.\n\nWith over 50,000 satisfied customers across Delhi NCR, Garage At Home is revolutionizing vehicle maintenance. Book your service today and experience the convenience of professional vehicle care at your doorstep.`,
    schema: {
      name: 'How Garage At Home Works - Complete Process Explained',
      description: 'Watch how our doorstep vehicle service works from booking to completion. See our certified mechanics in action.',
      thumbnailUrl: 'https://garagewala.com/video-thumbnails/how-it-works.jpg',
      uploadDate: '2024-01-15',
      duration: 'PT5M30S',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    id: '2',
    title: 'Bike Service at Home - Live Service Demo in Delhi',
    description: 'Watch a live bike service being performed at a customer\'s home in Delhi. See the quality of work, genuine parts usage, and professional standards maintained by our mechanics.',
    embedId: 'dQw4w9WgXcQ', // Placeholder YouTube ID
    thumbnail: '/api/placeholder/640/360',
    duration: 'PT8M15S',
    category: 'Service Demo',
    tags: ['bike service', 'Delhi', 'live demo', 'doorstep repair'],
    publishedAt: '2024-01-10',
    views: 18500,
    transcript: `Join us for a live bike service demonstration at a customer's home in Delhi. This unedited video shows our complete service process and the professional standards we maintain.\n\nLocation: South Delhi, Customer: Mr. Rajesh Kumar\nVehicle: Honda Activa 6G, Service Type: Comprehensive Service\n\nMechanic Introduction:\nMeet Suresh, our certified mechanic with 8 years of experience in two-wheeler maintenance. He's completed over 3,000 doorstep services and holds certifications from multiple manufacturers.\n\nService Process:\n00:30 - Initial vehicle inspection and documentation\n01:15 - Engine oil drainage and filter removal\n02:45 - Air filter cleaning and replacement\n04:20 - Chain cleaning and lubrication\n05:40 - Brake adjustment and testing\n06:55 - Battery check and terminal cleaning\n07:30 - Final quality check and test ride\n\nCustomer Experience:\n\"I was amazed by the professionalism and quality of work. Suresh explained every step and used genuine Honda parts. The convenience of getting my bike serviced while I worked from home is unbeatable.\" - Rajesh Kumar\n\nService Completion:\nTotal time: 1 hour 20 minutes\nParts used: All genuine Honda components\nWarranty: 6 months on parts, 30 days on labor\nCost: ₹1,299 (saved ₹400 compared to traditional garage)\n\nWhy Choose Garage At Home?\n- Certified and trained mechanics\n- Genuine spare parts with warranty\n- Transparent pricing with no hidden costs\n- Real-time service tracking\n- 30+ service points across Delhi NCR\n\nBook your doorstep bike service today and experience the same quality and convenience shown in this video.`,
    schema: {
      name: 'Bike Service at Home - Live Service Demo in Delhi',
      description: 'Watch a live bike service being performed at a customer\'s home in Delhi with genuine parts and professional standards.',
      thumbnailUrl: 'https://garagewala.com/video-thumbnails/bike-service-demo.jpg',
      uploadDate: '2024-01-10',
      duration: 'PT8M15S',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    id: '3',
    title: 'Car AC Service at Home - Noida Customer Experience',
    description: 'Complete car AC service demonstration at a customer\'s residence in Noida. Watch our expert technician service a car AC system with professional tools and genuine parts.',
    embedId: 'dQw4w9WgXcQ', // Placeholder YouTube ID
    thumbnail: '/api/placeholder/640/360',
    duration: 'PT12M40S',
    category: 'Service Demo',
    tags: ['car AC service', 'Noida', 'air conditioning', 'car maintenance'],
    publishedAt: '2024-01-05',
    views: 32000,
    transcript: `Experience a professional car AC service at home with our expert technician in Noida. This comprehensive demonstration shows why our AC services are rated #1 in customer satisfaction.\n\nCustomer: Ms. Priya Sharma, Sector 62, Noida\nVehicle: Hyundai Creta 2020, Issue: Poor cooling and unusual noise\n\nTechnician Profile:\nMeet Amit, our specialist AC technician with 10+ years experience and factory training from major car manufacturers. He's equipped with professional AC service tools and diagnostic equipment.\n\nDetailed Service Process:\n\n01:00 - Initial AC system diagnosis\n- Temperature readings at vents\n- Visual inspection of AC components\n- Computerized diagnostic check\n\n02:30 - AC gas pressure testing\n- Checking refrigerant levels\n- Pressure readings and leak detection\n- System evacuation procedure\n\n04:15 - Cabin air filter replacement\n- Location and removal of old filter\n- Cleaning of filter housing\n- Installation of genuine replacement filter\n\n06:00 - Evaporator and condenser cleaning\n- Professional foam cleaning process\n- Drainage system clearing\n- Antibacterial treatment application\n\n08:30 - AC gas refilling and testing\n- Vacuum process for optimal performance\n- Precise gas measurement and refilling\n- System performance testing\n\n10:15 - Final quality check\n- Temperature verification (achieved 8°C at vents)\n- All controls and modes testing\n- Customer demonstration and explanation\n\nCustomer Feedback:\n\"Incredible service! My car AC is now cooling better than when it was new. The technician was professional, explained everything clearly, and completed the work in my office parking. Highly recommended!\" - Priya Sharma\n\nService Details:\nDuration: 1.5 hours\nParts: Genuine cabin filter, premium AC gas\nCost: ₹2,499 (includes all materials)\nWarranty: 6 months on gas refill, 3 months on cleaning\nNext service: Recommended after 12 months\n\nWhy Our AC Service Stands Out:\n- Factory-trained technicians with manufacturer certifications\n- Professional AC service equipment and tools\n- Genuine refrigerant gas and authentic spare parts\n- Comprehensive cleaning and sanitization\n- Transparent pricing with detailed service report\n- 24/7 customer support and service warranty\n\nBeat the Delhi NCR heat with our professional car AC service. Book online or call us for immediate assistance.`,
    schema: {
      name: 'Car AC Service at Home - Noida Customer Experience',
      description: 'Complete car AC service demonstration showing professional AC repair and maintenance at customer location.',
      thumbnailUrl: 'https://garagewala.com/video-thumbnails/car-ac-service.jpg',
      uploadDate: '2024-01-05',
      duration: 'PT12M40S',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    id: '4',
    title: 'Emergency Roadside Assistance - Real Customer Rescue',
    description: 'Watch our emergency roadside assistance team help a stranded customer on NH-8 Gurgaon. See how we provide 24/7 support and get vehicles back on the road quickly.',
    embedId: 'dQw4w9WgXcQ', // Placeholder YouTube ID
    thumbnail: '/api/placeholder/640/360',
    duration: 'PT6M20S',
    category: 'Emergency Service',
    tags: ['emergency service', 'roadside assistance', 'Gurgaon', 'breakdown'],
    publishedAt: '2024-01-20',
    views: 15500,
    transcript: `Experience our emergency roadside assistance in action as we help a customer stranded on NH-8 Gurgaon. This real-time rescue operation shows our commitment to 24/7 customer support.\n\nEmergency Call Details:\nTime: 11:30 PM, Location: NH-8 near Udyog Vihar\nCustomer: Mr. Arun Mehta, Vehicle: Maruti Swift\nIssue: Car won't start, suspected battery failure\nResponse Team: Emergency unit dispatched from Sector 18\n\nReal-Time Response:\n\n00:00 - Emergency call received\nCustomer reports car breakdown on highway\nGPS location shared for precise assistance\nEmergency team dispatched within 3 minutes\n\n01:30 - Team arrival at breakdown location\nSafety first: Warning triangles and hazard lights setup\nInitial vehicle assessment and customer interaction\nProfessional introduction and situation briefing\n\n02:45 - Problem diagnosis\nBattery voltage testing with professional equipment\nElectrical system check and connection inspection\nConfirmed: Battery completely drained\n\n03:30 - Jump start procedure\nSafety protocol followed for highway emergency\nProfessional jump start cables and procedure\nEngine successfully started on first attempt\n\n04:15 - System check and advice\nAlternator charging system verification\nBattery condition assessment and recommendations\nCustomer education on battery maintenance\n\n05:00 - Service completion\nSafety equipment removed after ensuring vehicle stability\nDigital payment processing on-site\nCustomer satisfaction confirmation\n\nCustomer Testimonial:\n\"At 11:30 PM on a busy highway, I thought I was stuck for hours. Garage At Home's emergency team reached me in just 25 minutes and had my car running in 10 minutes. Professional, quick, and reasonably priced. This is exactly the kind of service every driver needs.\" - Arun Mehta\n\nService Summary:\nResponse time: 25 minutes\nProblem resolution: 10 minutes\nTotal time: 35 minutes\nCost: ₹350 (emergency call-out + jump start)\nRecommendation: Battery replacement scheduled for next day\n\nOur Emergency Services Cover:\n- 24/7 availability across Delhi NCR\n- Battery jump start and replacement\n- Flat tire repair and spare tire installation\n- Emergency fuel delivery\n- Lockout assistance\n- Minor breakdown repairs\n- Towing services to nearest garage\n\nDon't let breakdowns ruin your day. Save our emergency number and get help when you need it most.`,
    schema: {
      name: 'Emergency Roadside Assistance - Real Customer Rescue',
      description: '24/7 emergency roadside assistance demonstration showing quick response and professional breakdown support.',
      thumbnailUrl: 'https://garagewala.com/video-thumbnails/emergency-service.jpg',
      uploadDate: '2024-01-20',
      duration: 'PT6M20S',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  }
];

export const getVideosByCategory = (category: string): Video[] => {
  return videos.filter(video => video.category === category);
};

export const getFeaturedVideos = (limit: number = 3): Video[] => {
  return videos
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getRecentVideos = (limit: number = 4): Video[] => {
  return videos
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};