import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartService {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  vehicle: 'bike' | 'car';
  city: string;
  type?: 'combo' | 'individual';
}

interface CartStore {
  // State
  services: CartService[];
  isOpen: boolean;
  
  // Computed
  get itemCount(): number;
  get total(): number;
  
  // Actions
  addService: (service: CartService) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: CartService) => boolean; // Returns if item was added
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      services: [],
      isOpen: false,
      
      // Computed getters
      get itemCount() {
        return get().services.length;
      },
      
      get total() {
        return get().services.reduce((sum, service) => sum + service.price, 0);
      },
      
      // Actions
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
          return false; // Item was removed
        } else {
          get().addService(service);
          return true; // Item was added
        }
      },
      
      clear: () => {
        set({ services: [], isOpen: false });
      },
      
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'garage-cart-storage',
      partialize: (state) => ({
        services: state.services
      })
    }
  )
);