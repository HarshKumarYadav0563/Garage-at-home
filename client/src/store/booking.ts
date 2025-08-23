import { create } from 'zustand';

export interface BookingService {
  id: string;
  name: string;
  vehicleType: 'bike' | 'car';
  price: number;
  type?: 'combo' | 'individual';
}

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
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
  getSubtotal: () => number;
  getAdjustedPrice: (priceMin: number, priceMax: number) => { min: number; max: number };
  getDoortepCharge: () => number;
  getFinalTotal: () => number;
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
  selectedServices: [],
  selectedAddons: [],
  customer: initialCustomer,
  selectedSlot: null,
  currentStep: 'services',
  showSummary: false,
  searchQuery: '',
  showPriceRanges: false,
  
  // Actions
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle, selectedServices: [] }),
  
  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find(s => s.id === service.id);
    if (exists) {
      return {
        selectedServices: state.selectedServices.filter(s => s.id !== service.id)
      };
    } else {
      let newSelectedServices = [...state.selectedServices];
      
      if (service.type === 'combo') {
        // If selecting a combo service, clear ALL other services (combos and individuals)
        newSelectedServices = [];
      } else {
        // If selecting an individual service, remove any existing combo services
        newSelectedServices = newSelectedServices.filter(s => s.type !== 'combo');
      }
      
      // Add the new service
      newSelectedServices.push(service);
      
      return {
        selectedServices: newSelectedServices
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
  getAdjustedPrice: (priceMin, priceMax) => {
    return {
      min: priceMin,
      max: priceMax
    };
  },
  
  getSubtotal: () => {
    const state = get();
    
    let total = 0;
    
    // Add services
    state.selectedServices.forEach(service => {
      total += service.price;
    });
    
    // Add addons
    state.selectedAddons.forEach(addon => {
      total += addon.price;
    });
    
    return total;
  },

  getDoortepCharge: () => {
    const state = get();
    const subtotal = state.getSubtotal();
    
    // If cart total is below ₹999, add ₹99 doorstep charge
    return subtotal > 0 && subtotal < 999 ? 99 : 0;
  },

  getFinalTotal: () => {
    const state = get();
    const subtotal = state.getSubtotal();
    const doorstepCharge = state.getDoortepCharge();
    
    return subtotal + doorstepCharge;
  }
}));