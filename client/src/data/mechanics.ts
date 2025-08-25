export interface MechanicData {
  id: string;
  name: string;
  phone: string;
  lat: number;
  lng: number;
  city: string;
  skills: string[];
  ratingAvg: number;
  jobsDone: number;
  serviceRadiusKm: number;
  isActive: boolean;
  nextSlots: string[];
}

export const mechanicsData: MechanicData[] = [
  {
    id: 'mech_001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    lat: 28.4595,
    lng: 77.0266,
    city: 'ncr',
    skills: ['oil_change', 'brake_service', 'general_repair'],
    ratingAvg: 4.8,
    jobsDone: 250,
    serviceRadiusKm: 15,
    isActive: true,
    nextSlots: ['2024-01-25T15:00:00Z', '2024-01-25T17:00:00Z', '2024-01-26T10:00:00Z']
  },
  {
    id: 'mech_002',
    name: 'Amit Singh',
    phone: '+91 87654 32109',
    lat: 28.5355,
    lng: 77.3910,
    city: 'ncr',
    skills: ['ac_service', 'oil_change', 'brake_service'],
    ratingAvg: 4.9,
    jobsDone: 180,
    serviceRadiusKm: 20,
    isActive: true,
    nextSlots: ['2024-01-25T16:30:00Z', '2024-01-26T09:00:00Z']
  },
  {
    id: 'mech_003',
    name: 'Manoj Patel',
    phone: '+91 76543 21098',
    lat: 28.3949,
    lng: 77.3178,
    city: 'ncr',
    skills: ['oil_change', 'general_repair'],
    ratingAvg: 4.7,
    jobsDone: 320,
    serviceRadiusKm: 12,
    isActive: true,
    nextSlots: ['2024-01-26T10:00:00Z', '2024-01-26T14:00:00Z']
  },
  {
    id: 'mech_004',
    name: 'Suresh Yadav',
    phone: '+91 98321 54760',
    lat: 28.2180,
    lng: 77.1025,
    city: 'ncr',
    skills: ['oil_change', 'brake_service', 'ac_service'],
    ratingAvg: 4.6,
    jobsDone: 195,
    serviceRadiusKm: 18,
    isActive: true,
    nextSlots: ['2024-01-25T14:00:00Z', '2024-01-26T11:00:00Z']
  },
  {
    id: 'mech_005',
    name: 'Vikash Kumar',
    phone: '+91 87123 45698',
    lat: 28.6692,
    lng: 77.4538,
    city: 'ncr',
    skills: ['general_repair', 'oil_change'],
    ratingAvg: 4.5,
    jobsDone: 145,
    serviceRadiusKm: 15,
    isActive: true,
    nextSlots: ['2024-01-25T18:00:00Z', '2024-01-26T13:00:00Z']
  },
  {
    id: 'mech_006',
    name: 'Ramesh Sharma',
    phone: '+91 91234 56789',
    lat: 28.6139,
    lng: 77.2090,
    city: 'ncr',
    skills: ['ac_service', 'brake_service', 'general_repair'],
    ratingAvg: 4.8,
    jobsDone: 280,
    serviceRadiusKm: 22,
    isActive: true,
    nextSlots: ['2024-01-25T12:00:00Z', '2024-01-26T15:00:00Z']
  },
  {
    id: 'mech_007',
    name: 'Dinesh Gupta',
    phone: '+91 98765 12340',
    lat: 28.5706,
    lng: 77.3272,
    city: 'ncr',
    skills: ['oil_change', 'general_repair'],
    ratingAvg: 4.7,
    jobsDone: 210,
    serviceRadiusKm: 16,
    isActive: true,
    nextSlots: ['2024-01-25T16:00:00Z', '2024-01-26T12:00:00Z']
  },
  {
    id: 'mech_008',
    name: 'Anil Verma',
    phone: '+91 87654 98765',
    lat: 28.4089,
    lng: 77.3178,
    city: 'ncr',
    skills: ['brake_service', 'ac_service'],
    ratingAvg: 4.6,
    jobsDone: 165,
    serviceRadiusKm: 14,
    isActive: true,
    nextSlots: ['2024-01-26T08:00:00Z', '2024-01-26T16:00:00Z']
  },
  {
    id: 'mech_009',
    name: 'Santosh Kumar',
    phone: '+91 76543 87654',
    lat: 28.6304,
    lng: 77.3764,
    city: 'ncr',
    skills: ['oil_change', 'brake_service', 'general_repair'],
    ratingAvg: 4.9,
    jobsDone: 305,
    serviceRadiusKm: 20,
    isActive: true,
    nextSlots: ['2024-01-25T13:00:00Z', '2024-01-26T17:00:00Z']
  },
  {
    id: 'mech_010',
    name: 'Prakash Jain',
    phone: '+91 98321 67890',
    lat: 28.4743,
    lng: 77.1173,
    city: 'ncr',
    skills: ['ac_service', 'oil_change', 'general_repair'],
    ratingAvg: 4.8,
    jobsDone: 240,
    serviceRadiusKm: 18,
    isActive: true,
    nextSlots: ['2024-01-25T11:00:00Z', '2024-01-26T14:00:00Z']
  }
];

export function getMechanicsByCity(city: string): MechanicData[] {
  return mechanicsData.filter(mechanic => mechanic.city.toLowerCase() === city.toLowerCase());
}

export function getMechanicById(id: string): MechanicData | undefined {
  return mechanicsData.find(mechanic => mechanic.id === id);
}
