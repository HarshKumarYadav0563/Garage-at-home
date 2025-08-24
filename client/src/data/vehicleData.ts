export interface VehicleBrand {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  name: string;
  type: 'bike' | 'car';
}

export const BIKE_BRANDS: VehicleBrand[] = [
  {
    id: 'honda',
    name: 'Honda',
    models: [
      { id: 'activa-6g', name: 'Activa 6G', type: 'bike' },
      { id: 'activa-125', name: 'Activa 125', type: 'bike' },
      { id: 'dio', name: 'Dio', type: 'bike' },
      { id: 'grazia', name: 'Grazia', type: 'bike' },
      { id: 'shine', name: 'Shine', type: 'bike' },
      { id: 'unicorn', name: 'Unicorn', type: 'bike' },
      { id: 'cb-hornet', name: 'CB Hornet 160R', type: 'bike' },
      { id: 'sp-125', name: 'SP 125', type: 'bike' },
    ]
  },
  {
    id: 'tvs',
    name: 'TVS',
    models: [
      { id: 'jupiter', name: 'Jupiter', type: 'bike' },
      { id: 'ntorq', name: 'Ntorq 125', type: 'bike' },
      { id: 'xl-100', name: 'XL100', type: 'bike' },
      { id: 'radeon', name: 'Radeon', type: 'bike' },
      { id: 'apache-rtr-160', name: 'Apache RTR 160', type: 'bike' },
      { id: 'apache-rr-310', name: 'Apache RR 310', type: 'bike' },
      { id: 'star-city', name: 'Star City Plus', type: 'bike' },
    ]
  },
  {
    id: 'bajaj',
    name: 'Bajaj',
    models: [
      { id: 'chetak', name: 'Chetak Electric', type: 'bike' },
      { id: 'platina', name: 'Platina', type: 'bike' },
      { id: 'pulsar-150', name: 'Pulsar 150', type: 'bike' },
      { id: 'pulsar-220f', name: 'Pulsar 220F', type: 'bike' },
      { id: 'avenger', name: 'Avenger', type: 'bike' },
      { id: 'ct-100', name: 'CT 100', type: 'bike' },
      { id: 'dominar-400', name: 'Dominar 400', type: 'bike' },
    ]
  },
  {
    id: 'hero',
    name: 'Hero',
    models: [
      { id: 'splendor-plus', name: 'Splendor Plus', type: 'bike' },
      { id: 'hf-deluxe', name: 'HF Deluxe', type: 'bike' },
      { id: 'passion-pro', name: 'Passion Pro', type: 'bike' },
      { id: 'glamour', name: 'Glamour', type: 'bike' },
      { id: 'destini-125', name: 'Destini 125', type: 'bike' },
      { id: 'pleasure-plus', name: 'Pleasure Plus', type: 'bike' },
      { id: 'xtreme-160r', name: 'Xtreme 160R', type: 'bike' },
    ]
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    models: [
      { id: 'fascino', name: 'Fascino 125', type: 'bike' },
      { id: 'ray-zr', name: 'Ray ZR', type: 'bike' },
      { id: 'fz-s', name: 'FZ-S', type: 'bike' },
      { id: 'mt-15', name: 'MT-15', type: 'bike' },
      { id: 'r15-v4', name: 'R15 V4', type: 'bike' },
      { id: 'saluto', name: 'Saluto', type: 'bike' },
    ]
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    models: [
      { id: 'access-125', name: 'Access 125', type: 'bike' },
      { id: 'burgman', name: 'Burgman Street', type: 'bike' },
      { id: 'gixxer', name: 'Gixxer', type: 'bike' },
      { id: 'gixxer-sf', name: 'Gixxer SF', type: 'bike' },
      { id: 'hayate', name: 'Hayate EP', type: 'bike' },
    ]
  }
];

export const CAR_BRANDS: VehicleBrand[] = [
  {
    id: 'maruti-suzuki',
    name: 'Maruti Suzuki',
    models: [
      { id: 'alto-800', name: 'Alto 800', type: 'car' },
      { id: 'alto-k10', name: 'Alto K10', type: 'car' },
      { id: 'wagon-r', name: 'Wagon R', type: 'car' },
      { id: 'swift', name: 'Swift', type: 'car' },
      { id: 'dzire', name: 'Dzire', type: 'car' },
      { id: 'baleno', name: 'Baleno', type: 'car' },
      { id: 'vitara-brezza', name: 'Vitara Brezza', type: 'car' },
      { id: 'ertiga', name: 'Ertiga', type: 'car' },
      { id: 'ciaz', name: 'Ciaz', type: 'car' },
      { id: 'xl6', name: 'XL6', type: 'car' },
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    models: [
      { id: 'eon', name: 'Eon', type: 'car' },
      { id: 'santro', name: 'Santro', type: 'car' },
      { id: 'grand-i10', name: 'Grand i10 Nios', type: 'car' },
      { id: 'i20', name: 'i20', type: 'car' },
      { id: 'aura', name: 'Aura', type: 'car' },
      { id: 'venue', name: 'Venue', type: 'car' },
      { id: 'verna', name: 'Verna', type: 'car' },
      { id: 'creta', name: 'Creta', type: 'car' },
      { id: 'alcazar', name: 'Alcazar', type: 'car' },
    ]
  },
  {
    id: 'tata',
    name: 'Tata',
    models: [
      { id: 'tiago', name: 'Tiago', type: 'car' },
      { id: 'tigor', name: 'Tigor', type: 'car' },
      { id: 'altroz', name: 'Altroz', type: 'car' },
      { id: 'nexon', name: 'Nexon', type: 'car' },
      { id: 'harrier', name: 'Harrier', type: 'car' },
      { id: 'safari', name: 'Safari', type: 'car' },
      { id: 'punch', name: 'Punch', type: 'car' },
    ]
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    models: [
      { id: 'bolero', name: 'Bolero', type: 'car' },
      { id: 'scorpio', name: 'Scorpio', type: 'car' },
      { id: 'xuv300', name: 'XUV300', type: 'car' },
      { id: 'xuv500', name: 'XUV500', type: 'car' },
      { id: 'xuv700', name: 'XUV700', type: 'car' },
      { id: 'thar', name: 'Thar', type: 'car' },
    ]
  },
  {
    id: 'honda',
    name: 'Honda',
    models: [
      { id: 'amaze', name: 'Amaze', type: 'car' },
      { id: 'jazz', name: 'Jazz', type: 'car' },
      { id: 'wr-v', name: 'WR-V', type: 'car' },
      { id: 'city', name: 'City', type: 'car' },
      { id: 'cr-v', name: 'CR-V', type: 'car' },
    ]
  },
  {
    id: 'toyota',
    name: 'Toyota',
    models: [
      { id: 'etios', name: 'Etios', type: 'car' },
      { id: 'glanza', name: 'Glanza', type: 'car' },
      { id: 'yaris', name: 'Yaris', type: 'car' },
      { id: 'innova-crysta', name: 'Innova Crysta', type: 'car' },
      { id: 'fortuner', name: 'Fortuner', type: 'car' },
      { id: 'camry', name: 'Camry', type: 'car' },
    ]
  },
  {
    id: 'kia',
    name: 'Kia',
    models: [
      { id: 'sonet', name: 'Sonet', type: 'car' },
      { id: 'seltos', name: 'Seltos', type: 'car' },
      { id: 'carens', name: 'Carens', type: 'car' },
    ]
  },
  {
    id: 'skoda',
    name: 'Skoda',
    models: [
      { id: 'rapid', name: 'Rapid', type: 'car' },
      { id: 'kushaq', name: 'Kushaq', type: 'car' },
      { id: 'slavia', name: 'Slavia', type: 'car' },
    ]
  }
];

export function getBrandsForVehicleType(vehicleType: 'bike' | 'car'): VehicleBrand[] {
  return vehicleType === 'bike' ? BIKE_BRANDS : CAR_BRANDS;
}

export function getModelsForBrand(brandId: string, vehicleType: 'bike' | 'car'): VehicleModel[] {
  const brands = getBrandsForVehicleType(vehicleType);
  const brand = brands.find(b => b.id === brandId);
  return brand ? brand.models : [];
}