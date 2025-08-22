import { create } from 'zustand';

interface BookingStore {
  // Step 1: Vehicle
  vehicleType: 'bike' | 'car' | null;
  vehicleBrand: string;
  vehicleModel: string;
  
  // Step 2: Service
  serviceId: string;
  serviceName: string;
  
  // Step 3: Location
  address: string;
  lat: number | null;
  lng: number | null;
  
  // Step 4: Time slot
  slotStart: Date | null;
  slotEnd: Date | null;
  
  // Step 5: Customer details
  customerName: string;
  customerPhone: string;
  
  // Selected mechanic
  selectedMechanicId: string;
  
  // Actions
  setVehicle: (type: 'bike' | 'car', brand: string, model: string) => void;
  setService: (id: string, name: string) => void;
  setLocation: (address: string, lat: number, lng: number) => void;
  setTimeSlot: (start: Date, end: Date) => void;
  setCustomerDetails: (name: string, phone: string) => void;
  setSelectedMechanic: (mechanicId: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  // Initial state
  vehicleType: null,
  vehicleBrand: '',
  vehicleModel: '',
  serviceId: '',
  serviceName: '',
  address: '',
  lat: null,
  lng: null,
  slotStart: null,
  slotEnd: null,
  customerName: '',
  customerPhone: '',
  selectedMechanicId: '',
  
  // Actions
  setVehicle: (type, brand, model) => set({
    vehicleType: type,
    vehicleBrand: brand,
    vehicleModel: model,
  }),
  
  setService: (id, name) => set({
    serviceId: id,
    serviceName: name,
  }),
  
  setLocation: (address, lat, lng) => set({
    address,
    lat,
    lng,
  }),
  
  setTimeSlot: (start, end) => set({
    slotStart: start,
    slotEnd: end,
  }),
  
  setCustomerDetails: (name, phone) => set({
    customerName: name,
    customerPhone: phone,
  }),
  
  setSelectedMechanic: (mechanicId) => set({
    selectedMechanicId: mechanicId,
  }),
  
  reset: () => set({
    vehicleType: null,
    vehicleBrand: '',
    vehicleModel: '',
    serviceId: '',
    serviceName: '',
    address: '',
    lat: null,
    lng: null,
    slotStart: null,
    slotEnd: null,
    customerName: '',
    customerPhone: '',
    selectedMechanicId: '',
  }),
}));
