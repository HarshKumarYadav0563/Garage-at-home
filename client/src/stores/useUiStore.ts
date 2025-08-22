import { create } from 'zustand';

interface UiStore {
  isMobileMenuOpen: boolean;
  toasts: Toast[];
  
  setMobileMenuOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export const useUiStore = create<UiStore>((set, get) => ({
  isMobileMenuOpen: false,
  toasts: [],
  
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }]
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },
  
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  })),
}));
