import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NCRCity, VehicleType } from '@shared/config/serviceAreas';
import { ServicePricing, AddonPricing, EstimateTotal, calculateEstimate } from '@/lib/pricing';

// Booking steps for full flow
export type BookingStep = 'services' | 'model' | 'details' | 'otp' | 'confirmation';

// Vehicle model interface
export interface VehicleModel {
  make: string;
  model: string;
  variant?: string;
}

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

// OTP verification state
export interface OtpState {
  phone?: string;
  sessionId?: string;
  verified: boolean;
  otpToken?: string;
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
  
  // Step 2: Vehicle Model
  vehicleModel?: VehicleModel;
  
  // Step 3: Customer Details & Address
  customer?: CustomerData;
  address?: AddressData;
  selectedSlot?: TimeSlot;
  
  // Step 4: OTP Verification
  otp: OtpState;
  
  // Step 5: Booking State
  estimate?: EstimateTotal;
  isSubmitting: boolean;
  trackingId?: string;
  
  // UI State
  showCartFab: boolean;
  showSummaryDrawer: boolean;
  showWaitlistModal: boolean;
  
  // Actions
  setCurrentStep: (step: BookingStep) => void;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  setSelectedCity: (city: NCRCity) => void;
  toggleService: (serviceId: string) => void;
  toggleAddon: (addonId: string) => void;
  setSearchQuery: (query: string) => void;
  setVehicleModel: (model: VehicleModel) => void;
  setCustomer: (customer: CustomerData) => void;
  setAddress: (address: AddressData) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
  setOtp: (otp: Partial<OtpState>) => void;
  setEstimate: (estimate: EstimateTotal) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setTrackingId: (trackingId: string) => void;
  setShowCartFab: (show: boolean) => void;
  setShowSummaryDrawer: (show: boolean) => void;
  setShowWaitlistModal: (show: boolean) => void;
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
  vehicleModel: undefined,
  customer: undefined,
  address: undefined,
  selectedSlot: undefined,
  otp: {
    verified: false
  },
  estimate: undefined,
  isSubmitting: false,
  trackingId: undefined,
  showCartFab: false,
  showSummaryDrawer: false,
  showWaitlistModal: false,
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
        const newServices = selectedServices.filter(id => id !== serviceId);
        set({ 
          selectedServices: newServices,
          showCartFab: newServices.length > 0
        });
      } else {
        set({ 
          selectedServices: [...selectedServices, serviceId],
          showCartFab: true
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
    
    // Vehicle model
    setVehicleModel: (model) => set({ vehicleModel: model }),
    
    // Customer details
    setCustomer: (customer) => set({ customer }),
    
    // Address
    setAddress: (address) => set({ address }),
    
    // Time slot
    setSelectedSlot: (slot) => set({ selectedSlot: slot }),
    
    // OTP
    setOtp: (otp) => set({ otp: { ...get().otp, ...otp } }),
    
    // Booking state
    setEstimate: (estimate) => set({ estimate }),
    setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
    setTrackingId: (trackingId) => set({ trackingId }),
    
    // UI state
    setShowCartFab: (show) => set({ showCartFab: show }),
    setShowSummaryDrawer: (show) => set({ showSummaryDrawer: show }),
    setShowWaitlistModal: (show) => set({ showWaitlistModal: show }),
    
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
        case 'model':
          return state.selectedServices.length > 0;
        case 'details':
          return Boolean(state.vehicleModel?.make && state.vehicleModel?.model);
        case 'otp':
          return Boolean(state.customer?.name && state.customer?.phone && state.address?.text && state.selectedSlot);
        case 'confirmation':
          return state.otp.verified;
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
      vehicleModel: state.vehicleModel,
      customer: state.customer,
      address: state.address,
      selectedSlot: state.selectedSlot,
    }),
  }
));