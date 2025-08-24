import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NCRCity, VehicleType } from '@shared/config/serviceAreas';
import { ServicePricing, AddonPricing, EstimateTotal, calculateEstimate } from '@/lib/pricing';

// Booking steps
export type BookingStep = 'services' | 'customer' | 'address' | 'slot' | 'review';

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
  // Current step
  currentStep: BookingStep;
  
  // Step 1: Service Selection
  selectedVehicle: VehicleType;
  selectedCity: NCRCity;
  selectedServices: string[];
  selectedAddons: string[];
  searchQuery: string;
  showSummary: boolean;
  
  // Step 2: Customer Details
  customer?: CustomerData;
  
  // Step 3: Address & Location
  address?: AddressData;
  
  // Step 4: Time Slot
  selectedSlot?: TimeSlot;
  
  // Step 5: Review & Booking
  estimate?: EstimateTotal;
  consentGiven: boolean;
  
  // UI State
  isSubmitting: boolean;
  trackingId?: string;
  
  // Actions
  setCurrentStep: (step: BookingStep) => void;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  setSelectedCity: (city: NCRCity) => void;
  toggleService: (serviceId: string) => void;
  toggleAddon: (addonId: string) => void;
  setSearchQuery: (query: string) => void;
  setShowSummary: (show: boolean) => void;
  setCustomer: (customer: CustomerData) => void;
  setAddress: (address: AddressData) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
  setConsentGiven: (consent: boolean) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setTrackingId: (trackingId: string) => void;
  calculateEstimate: () => void;
  getSubtotal: () => number;
  canProceedToStep: (step: BookingStep) => boolean;
  reset: () => void;
  clearBooking: () => void;
}

// Default state
const defaultState = {
  currentStep: 'services' as BookingStep,
  selectedVehicle: 'bike' as VehicleType,
  selectedCity: 'delhi' as NCRCity,
  selectedServices: [],
  selectedAddons: [],
  searchQuery: '',
  showSummary: false,
  customer: undefined,
  address: undefined,
  selectedSlot: undefined,
  estimate: undefined,
  consentGiven: false,
  isSubmitting: false,
  trackingId: undefined,
};

export const useBookingStore = create<BookingStore>()(persist(
  (set, get) => ({
    ...defaultState,
    
    // Step navigation
    setCurrentStep: (step) => set({ currentStep: step }),
    
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
      
      if (isSelected) {
        set({ 
          selectedServices: selectedServices.filter(id => id !== serviceId)
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
    
    setShowSummary: (show) => set({ showSummary: show }),
    
    // Customer details
    setCustomer: (customer) => set({ customer }),
    
    // Address
    setAddress: (address) => set({ address }),
    
    // Time slot
    setSelectedSlot: (slot) => set({ selectedSlot: slot }),
    
    // Review & consent
    setConsentGiven: (consent) => set({ consentGiven: consent }),
    
    // Submission state
    setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
    
    setTrackingId: (trackingId) => set({ trackingId }),
    
    // Calculate pricing estimate
    calculateEstimate: () => {
      const { selectedServices, selectedAddons, selectedVehicle, selectedCity } = get();
      
      if (selectedServices.length === 0) {
        set({ estimate: undefined });
        return;
      }
      
      const estimate = calculateEstimate(
        selectedServices,
        selectedAddons,
        selectedVehicle,
        selectedCity
      );
      
      set({ estimate });
    },
    
    // Get subtotal for compatibility
    getSubtotal: () => {
      const { estimate } = get();
      return estimate?.subtotal.min || 0;
    },
    
    // Step validation
    canProceedToStep: (step) => {
      const state = get();
      
      switch (step) {
        case 'services':
          return true;
        case 'customer':
          return state.selectedServices.length > 0;
        case 'address':
          return Boolean(state.customer?.name && state.customer?.phone);
        case 'slot':
          return Boolean(state.address?.text);
        case 'review':
          return Boolean(state.selectedSlot);
        default:
          return false;
      }
    },
    
    // Reset to initial state
    reset: () => set(defaultState),
    
    // Clear booking data but keep current vehicle/city
    clearBooking: () => {
      const { selectedVehicle, selectedCity } = get();
      set({
        ...defaultState,
        selectedVehicle,
        selectedCity,
      });
    },
  }),
  {
    name: 'garage-booking-store',
    partialize: (state) => ({
      selectedVehicle: state.selectedVehicle,
      selectedCity: state.selectedCity,
      selectedServices: state.selectedServices,
      selectedAddons: state.selectedAddons,
      customer: state.customer,
      address: state.address,
      selectedSlot: state.selectedSlot,
    }),
  }
));
