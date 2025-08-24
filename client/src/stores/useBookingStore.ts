import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NCRCity, VehicleType } from '@shared/config/serviceAreas';
import { ServicePricing, AddonPricing, EstimateTotal, calculateEstimate } from '@/lib/pricing';

// Simplified - no booking steps

// Customer data interface
export interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  contactPreference: 'call' | 'whatsapp';
}

// Address data interface
export interface AddressData {
  text: string;
  lat?: number;
  lng?: number;
  pincode?: string;
  locationType: 'geolocation' | 'search' | 'manual';
}

// Time slot interface
export interface TimeSlot {
  date: 'today' | 'tomorrow';
  startTime: string;
  endTime: string;
  startISO: string;
  endISO: string;
  label: string;
}

// Complete booking store interface
export interface BookingStore {
  
  // Step 1: Service Selection
  selectedVehicle: VehicleType;
  selectedCity: NCRCity;
  selectedServices: string[];
  selectedAddons: string[];
  searchQuery: string;
  
  
  // Actions
  setSelectedVehicle: (vehicle: VehicleType) => void;
  setSelectedCity: (city: NCRCity) => void;
  toggleService: (serviceId: string) => void;
  toggleAddon: (addonId: string) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

// Default state
const defaultState = {
  selectedVehicle: 'bike' as VehicleType,
  selectedCity: 'delhi' as NCRCity,
  selectedServices: [],
  selectedAddons: [],
  searchQuery: '',
};

export const useBookingStore = create<BookingStore>()(persist(
  (set, get) => ({
    ...defaultState,
    
    
    // Service selection
    setSelectedVehicle: (vehicle) => {
      set({ 
        selectedVehicle: vehicle,
        selectedServices: [], // Clear services when vehicle changes
        selectedAddons: [],
        estimate: undefined
      });
      get().calculateEstimate();
    },
    
    setSelectedCity: (city) => {
      set({ selectedCity: city });
      get().calculateEstimate();
    },
    
    toggleService: (serviceId) => {
      const { selectedServices } = get();
      const isSelected = selectedServices.includes(serviceId);
      
      console.log('🛒 TOGGLE SERVICE:', { serviceId, isSelected, currentServices: selectedServices });
      
      if (isSelected) {
        const newServices = selectedServices.filter(id => id !== serviceId);
        set({ 
          selectedServices: newServices
        });
      } else {
        set({ 
          selectedServices: [...selectedServices, serviceId]
        });
      }
      
      get().calculateEstimate();
    },
    
    toggleAddon: (addonId) => {
      const { selectedAddons } = get();
      const isSelected = selectedAddons.includes(addonId);
      
      if (isSelected) {
        set({ 
          selectedAddons: selectedAddons.filter(id => id !== addonId)
        });
      } else {
        set({ 
          selectedAddons: [...selectedAddons, addonId]
        });
      }
      
      get().calculateEstimate();
    },
    
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    
    
    // Reset to initial state
    reset: () => set(defaultState),
  }),
  {
    name: 'garage-booking-store',
    partialize: (state) => ({
      selectedVehicle: state.selectedVehicle,
      selectedCity: state.selectedCity,
      selectedServices: state.selectedServices,
      selectedAddons: state.selectedAddons,
    }),
  }
));
