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
  
  // Force show always for testing
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-red-500 p-4 rounded-full text-white">
      <div className="flex items-center space-x-2">
        <ShoppingCart className="w-5 h-5" />
        <span>TEST CART ({selectedServices.length})</span>
        {estimate && <span>₹{String(estimate.total)}</span>}
      </div>
    </div>
  );
}