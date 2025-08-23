import { create } from 'zustand';

export interface BookingService {
  id: string;
  name: string;
  vehicleType: 'bike' | 'car';
  priceMin: number;
  priceMax: number;
}

export interface BookingAddon {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

export interface TimeSlot {
  date: 'today' | 'tomorrow';
  time: '10-12' | '12-2' | '2-4' | '4-6';
  label: string;
}

interface BookingStore {
  // Selection state
  selectedVehicle: 'bike' | 'car';
  city: 'mumbai' | 'delhi' | 'bangalore' | 'other';
  selectedServices: BookingService[];
  selectedAddons: BookingAddon[];
  
  // Customer details
  customer: CustomerDetails;
  selectedSlot: TimeSlot | null;
  
  // UI state
  currentStep: 'services' | 'details' | 'confirmation';
  showSummary: boolean;
  searchQuery: string;
  showPriceRanges: boolean;
  
  // Actions
  setSelectedVehicle: (vehicle: 'bike' | 'car') => void;
  setCity: (city: 'mumbai' | 'delhi' | 'bangalore' | 'other') => void;
  toggleService: (service: BookingService) => void;
  toggleAddon: (addon: BookingAddon) => void;
  setCustomer: (customer: Partial<CustomerDetails>) => void;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  setCurrentStep: (step: 'services' | 'details' | 'confirmation') => void;
  setShowSummary: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setShowPriceRanges: (show: boolean) => void;
  clearBooking: () => void;
  
  // Computed
  getSubtotal: () => { min: number; max: number };
  getCityMultiplier: () => number;
  getAdjustedPrice: (priceMin: number, priceMax: number) => { min: number; max: number };
}

const initialCustomer: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  pincode: ''
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  selectedVehicle: 'bike',
  city: 'mumbai',
  selectedServices: [],
  selectedAddons: [],
  customer: initialCustomer,
  selectedSlot: null,
  currentStep: 'services',
  showSummary: false,
  searchQuery: '',
  showPriceRanges: true,
  
  // Actions
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle, selectedServices: [] }),
  
  setCity: (city) => set({ city }),
  
  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find(s => s.id === service.id);
    if (exists) {
      return {
        selectedServices: state.selectedServices.filter(s => s.id !== service.id)
      };
    } else {
      return {
        selectedServices: [...state.selectedServices, service]
      };
    }
  }),
  
  toggleAddon: (addon) => set((state) => {
    const exists = state.selectedAddons.find(a => a.id === addon.id);
    if (exists) {
      return {
        selectedAddons: state.selectedAddons.filter(a => a.id !== addon.id)
      };
    } else {
      return {
        selectedAddons: [...state.selectedAddons, addon]
      };
    }
  }),
  
  setCustomer: (customerUpdate) => set((state) => ({
    customer: { ...state.customer, ...customerUpdate }
  })),
  
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setShowSummary: (show) => set({ showSummary: show }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setShowPriceRanges: (show) => set({ showPriceRanges: show }),
  
  clearBooking: () => set({
    selectedServices: [],
    selectedAddons: [],
    customer: initialCustomer,
    selectedSlot: null,
    currentStep: 'services'
  }),
  
  // Computed functions
  getCityMultiplier: () => {
    const city = get().city;
    switch (city) {
      case 'mumbai': return 1.10;
      case 'delhi': return 1.05;
      case 'bangalore': return 1.05;
      case 'other': return 1.00;
      default: return 1.00;
    }
  },
  
  getAdjustedPrice: (priceMin, priceMax) => {
    const multiplier = get().getCityMultiplier();
    return {
      min: Math.round(priceMin * multiplier),
      max: Math.round(priceMax * multiplier)
    };
  },
  
  getSubtotal: () => {
    const state = get();
    const multiplier = state.getCityMultiplier();
    
    let min = 0;
    let max = 0;
    
    // Add services
    state.selectedServices.forEach(service => {
      min += Math.round(service.priceMin * multiplier);
      max += Math.round(service.priceMax * multiplier);
    });
    
    // Add addons
    state.selectedAddons.forEach(addon => {
      min += Math.round(addon.priceMin * multiplier);
      max += Math.round(addon.priceMax * multiplier);
    });
    
    return { min, max };
  }
}));