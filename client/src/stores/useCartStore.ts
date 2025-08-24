import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartService {
  id: string;
  title: string;
  subtitle?: string;
  priceMin: number;
  priceMax: number;
  vehicle: 'bike' | 'car';
  city: string;
  type?: 'combo' | 'individual';
}

export interface CartAddon {
  id: string;
  title: string;
  priceMin: number;
  priceMax: number;
}

export interface CartTotals {
  min: number;
  max: number;
}

interface CartStore {
  // State
  services: CartService[];
  addons: CartAddon[];
  isCartOpen: boolean;
  
  // Computed
  totals: CartTotals;
  itemCount: number;
  
  // Actions
  addService: (service: CartService) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: CartService) => void;
  addAddon: (addon: CartAddon) => void;
  removeAddon: (addonId: string) => void;
  clear: () => void;
  
  // UI Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Persistence
  hydrate: () => void;
}

const calculateTotals = (services: CartService[], addons: CartAddon[]): CartTotals => {
  const servicesMin = services.reduce((sum, service) => sum + service.priceMin, 0);
  const servicesMax = services.reduce((sum, service) => sum + service.priceMax, 0);
  const addonsMin = addons.reduce((sum, addon) => sum + addon.priceMin, 0);
  const addonsMax = addons.reduce((sum, addon) => sum + addon.priceMax, 0);
  
  return {
    min: servicesMin + addonsMin,
    max: servicesMax + addonsMax
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      services: [],
      addons: [],
      isCartOpen: false,
      
      // Computed getters
      get totals() {
        const { services, addons } = get();
        return calculateTotals(services, addons);
      },
      
      get itemCount() {
        return get().services.length;
      },
      
      // Service actions
      addService: (service) => {
        const { services } = get();
        const exists = services.find(s => s.id === service.id);
        if (!exists) {
          set({ services: [...services, service] });
        }
      },
      
      removeService: (serviceId) => {
        const { services } = get();
        set({ services: services.filter(s => s.id !== serviceId) });
      },
      
      toggleService: (service) => {
        const { services } = get();
        const exists = services.find(s => s.id === service.id);
        if (exists) {
          get().removeService(service.id);
        } else {
          get().addService(service);
        }
      },
      
      // Addon actions
      addAddon: (addon) => {
        const { addons } = get();
        const exists = addons.find(a => a.id === addon.id);
        if (!exists) {
          set({ addons: [...addons, addon] });
        }
      },
      
      removeAddon: (addonId) => {
        const { addons } = get();
        set({ addons: addons.filter(a => a.id !== addonId) });
      },
      
      // Clear all
      clear: () => {
        set({ services: [], addons: [], isCartOpen: false });
      },
      
      // UI actions
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      // Persistence
      hydrate: () => {
        // SSR-safe hydration handled by persist middleware
      }
    }),
    {
      name: 'garage-cart-storage',
      partialize: (state) => ({
        services: state.services,
        addons: state.addons
      })
    }
  )
);