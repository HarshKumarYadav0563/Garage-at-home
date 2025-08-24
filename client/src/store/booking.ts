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
  email?: string;
  contactPref: 'phone' | 'email' | 'both';
}

export interface Address {
  text: string;
  lat?: number;
  lng?: number;
  pincode?: string;
  area?: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OtpDetails {
  phone: string;
  sessionId?: string;
  verified: boolean;
}

export interface EstimatedTotal {
  min: number;
  max: number;
}

interface BookingStore {
  // Route params
  vehicle: 'bike' | 'car' | null;
  vehicleModel: string;
  city: string;
  
  // Services selection
  services: BookingService[];
  addons: BookingAddon[];
  
  // Customer details
  customer: CustomerDetails;
  address: Address;
  selectedMechanic: any;
  
  // OTP verification
  otp: OtpDetails;
  
  // Estimated total
  estTotal: EstimatedTotal;
  
  // UI state
  currentStep: 'vehicle' | 'model' | 'services' | 'location' | 'mechanics' | 'details' | 'otp' | 'tracking';
  showSummary: boolean;
  searchQuery: string;
  showPriceRanges: boolean;
  
  // Actions
  setVehicleAndCity: (vehicle: 'bike' | 'car', city: string) => void;
  setVehicleModel: (model: string) => void;
  addService: (service: BookingService) => void;
  removeService: (serviceId: string) => void;
  addAddon: (addon: BookingAddon) => void;
  removeAddon: (addonId: string) => void;
  setCustomer: (customer: Partial<CustomerDetails>) => void;
  setAddress: (address: Address) => void;
  setSelectedMechanic: (mechanic: any) => void;
  setOtpDetails: (otp: Partial<OtpDetails>) => void;
  setCurrentStep: (step: 'vehicle' | 'model' | 'services' | 'location' | 'mechanics' | 'details' | 'otp' | 'tracking') => void;
  setShowSummary: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setShowPriceRanges: (show: boolean) => void;
  clear: () => void;
  hydrate: (data: Partial<BookingStore>) => void;
  
  // Computed
  getSubtotal: () => number;
  getAdjustedPrice: (priceMin: number, priceMax: number) => { min: number; max: number };
  getDoortepCharge: () => number;
  getFinalTotal: () => number;
}

const initialCustomer: CustomerDetails = {
  name: '',
  phone: '',
  email: '',
  contactPref: 'phone'
};

const initialAddress: Address = {
  text: '',
  lat: undefined,
  lng: undefined,
  pincode: ''
};

const initialOtp: OtpDetails = {
  phone: '',
  sessionId: undefined,
  verified: false
};

const initialEstTotal: EstimatedTotal = {
  min: 0,
  max: 0
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  vehicle: null,
  vehicleModel: '',
  city: '',
  services: [],
  addons: [],
  customer: initialCustomer,
  address: initialAddress,
  selectedMechanic: null,
  otp: initialOtp,
  estTotal: initialEstTotal,
  currentStep: 'vehicle',
  showSummary: false,
  searchQuery: '',
  showPriceRanges: false,
  
  // Actions
  setVehicleAndCity: (vehicle, city) => set({ vehicle, city }),
  
  setVehicleModel: (vehicleModel) => set({ vehicleModel }),
  
  addService: (service) => set((state) => {
    // If selecting a combo service, clear ALL other services
    if (service.type === 'combo') {
      return {
        services: [service],
        showSummary: true
      };
    } else {
      // If selecting an individual service, remove any existing combo services
      const filteredServices = state.services.filter(s => s.type !== 'combo');
      const exists = filteredServices.find(s => s.id === service.id);
      
      if (exists) {
        return state; // Service already selected
      }
      
      return {
        services: [...filteredServices, service],
        showSummary: true
      };
    }
  }),
  
  removeService: (serviceId) => set((state) => ({
    services: state.services.filter(s => s.id !== serviceId)
  })),
  
  addAddon: (addon) => set((state) => {
    const exists = state.addons.find(a => a.id === addon.id);
    if (exists) {
      return state;
    }
    return {
      addons: [...state.addons, addon],
      showSummary: true
    };
  }),
  
  removeAddon: (addonId) => set((state) => ({
    addons: state.addons.filter(a => a.id !== addonId)
  })),
  
  setCustomer: (customerUpdate) => set((state) => ({
    customer: { ...state.customer, ...customerUpdate }
  })),
  
  setAddress: (address) => set({ address }),
  
  setSelectedMechanic: (selectedMechanic) => set({ selectedMechanic }),
  
  setOtpDetails: (otpUpdate) => set((state) => ({
    otp: { ...state.otp, ...otpUpdate }
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setShowSummary: (show) => set({ showSummary: show }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setShowPriceRanges: (show) => set({ showPriceRanges: show }),
  
  clear: () => set({
    vehicle: null,
    vehicleModel: '',
    city: '',
    services: [],
    addons: [],
    customer: initialCustomer,
    address: initialAddress,
    selectedMechanic: null,
    otp: initialOtp,
    estTotal: initialEstTotal,
    currentStep: 'vehicle',
    showSummary: false,
    searchQuery: '',
    showPriceRanges: false
  }),
  
  hydrate: (data) => set((state) => ({ ...state, ...data })),
  
  // Computed functions
  getAdjustedPrice: (priceMin, priceMax) => ({
    min: priceMin,
    max: priceMax
  }),
  
  getSubtotal: () => {
    const state = get();
    
    let total = 0;
    
    // Add services - with null safety
    if (state.services && Array.isArray(state.services)) {
      state.services.forEach(service => {
        if (service && typeof service.price === 'number') {
          total += service.price;
        }
      });
    }
    
    // Add addons - with null safety
    if (state.addons && Array.isArray(state.addons)) {
      state.addons.forEach(addon => {
        if (addon && typeof addon.price === 'number') {
          total += addon.price;
        }
      });
    }
    
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