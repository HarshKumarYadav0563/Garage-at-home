import { create } from 'zustand';

export interface BookingService {
  id: string;
  name: string;
  vehicleType: 'bike' | 'car';
  price: number;
  type?: 'combo' | 'individual';
  vehicleBrand?: string;
  vehicleModel?: string;
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
  contactPref: 'phone' | 'email' | 'whatsapp';
}

export interface AddressDetails {
  text: string;
  lat?: number;
  lng?: number;
  pincode?: string;
  city?: string;
}

export interface OTPDetails {
  phone: string;
  sessionId?: string;
  verified: boolean;
  code?: string;
}

export interface EstTotal {
  min: number;
  max: number;
}

interface BookingStore {
  // Selection state
  selectedVehicle: 'bike' | 'car';
  selectedBrand: string;
  selectedModel: string;
  selectedServices: BookingService[];
  selectedAddons: BookingAddon[];
  
  // Location and customer details
  address: AddressDetails;
  customer: CustomerDetails;
  otp: OTPDetails;
  estTotal: EstTotal;
  
  // Tracking
  trackingId: string | null;
  
  // UI state
  currentStep: 'services' | 'location' | 'details' | 'otp' | 'tracking';
  showSummary: boolean;
  searchQuery: string;
  showPriceRanges: boolean;
  
  // Actions
  setSelectedVehicle: (vehicle: 'bike' | 'car') => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedModel: (model: string) => void;
  toggleService: (service: BookingService) => void;
  toggleAddon: (addon: BookingAddon) => void;
  setAddress: (address: Partial<AddressDetails>) => void;
  setCustomer: (customer: Partial<CustomerDetails>) => void;
  setOTP: (otp: Partial<OTPDetails>) => void;
  setEstTotal: (total: EstTotal) => void;
  setTrackingId: (id: string) => void;
  setCurrentStep: (step: 'services' | 'location' | 'details' | 'otp' | 'tracking') => void;
  setShowSummary: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setShowPriceRanges: (show: boolean) => void;
  clearBooking: () => void;
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

const initialAddress: AddressDetails = {
  text: '',
  lat: undefined,
  lng: undefined,
  pincode: '',
  city: ''
};

const initialOTP: OTPDetails = {
  phone: '',
  sessionId: undefined,
  verified: false,
  code: ''
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  selectedVehicle: 'bike',
  selectedBrand: '',
  selectedModel: '',
  selectedServices: [],
  selectedAddons: [],
  address: initialAddress,
  customer: initialCustomer,
  otp: initialOTP,
  estTotal: { min: 0, max: 0 },
  trackingId: null,
  currentStep: 'services',
  showSummary: false,
  searchQuery: '',
  showPriceRanges: false,
  
  // Actions
  setSelectedVehicle: (vehicle) => set((state) => {
    if (state.selectedVehicle === vehicle) return state; // Prevent unnecessary updates
    return { 
      selectedVehicle: vehicle, 
      selectedBrand: '', // Clear brand when switching vehicle type
      selectedModel: '', // Clear model when switching vehicle type
      selectedServices: [] 
    };
  }),
  
  setSelectedBrand: (brand) => set((state) => ({
    selectedBrand: brand,
    selectedModel: '' // Clear model when changing brand
  })),
  
  setSelectedModel: (model) => set((state) => ({
    selectedModel: model
  })),
  
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
      
      // Add the new service with vehicle details
      const serviceWithVehicleDetails = {
        ...service,
        vehicleBrand: state.selectedBrand,
        vehicleModel: state.selectedModel
      };
      newSelectedServices.push(serviceWithVehicleDetails);
      
      return {
        selectedServices: newSelectedServices,
        showSummary: true // Automatically show summary when service is added
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
        selectedAddons: [...state.selectedAddons, addon],
        showSummary: true // Automatically show summary when addon is added
      };
    }
  }),
  
  setAddress: (addressUpdate) => set((state) => ({
    address: { ...state.address, ...addressUpdate }
  })),
  
  setCustomer: (customerUpdate) => set((state) => ({
    customer: { ...state.customer, ...customerUpdate }
  })),
  
  setOTP: (otpUpdate) => set((state) => ({
    otp: { ...state.otp, ...otpUpdate }
  })),
  
  setEstTotal: (total) => set({ estTotal: total }),
  
  setTrackingId: (id) => set({ trackingId: id }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setShowSummary: (show) => set({ showSummary: show }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setShowPriceRanges: (show) => set({ showPriceRanges: show }),
  
  clearBooking: () => set({
    selectedBrand: '',
    selectedModel: '',
    selectedServices: [],
    selectedAddons: [],
    address: initialAddress,
    customer: initialCustomer,
    otp: initialOTP,
    estTotal: { min: 0, max: 0 },
    trackingId: null,
    currentStep: 'services'
  }),
  
  hydrate: (data) => set((state) => ({ ...state, ...data })),
  
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