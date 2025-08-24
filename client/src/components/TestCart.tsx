import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';

export function TestCart() {
  const { selectedServices, estimate } = useBookingStore();
  
  console.log('=== TEST CART DEBUG ===', {
    selectedServices,
    estimate,
    length: selectedServices.length
  });
  
  // Force show always for testing with higher z-index
  return (
    <div 
      className="fixed bottom-4 right-4 bg-red-500 p-3 rounded-lg text-white text-sm font-bold shadow-2xl" 
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center space-x-2">
        <ShoppingCart className="w-4 h-4" />
        <span>TEST ({selectedServices.length})</span>
        {estimate && <span>₹{String(estimate.total)}</span>}
      </div>
    </div>
  );
}