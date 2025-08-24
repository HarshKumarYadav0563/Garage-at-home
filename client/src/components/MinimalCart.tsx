import { useBookingStore } from '@/stores/useBookingStore';

export function MinimalCart() {
  const { selectedServices, estimate } = useBookingStore();
  
  console.log('=== MINIMAL CART ===', {
    services: selectedServices,
    hasServices: selectedServices.length > 0,
    estimate
  });
  
  if (selectedServices.length === 0) {
    return null;
  }
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        zIndex: 99999,
        fontSize: '14px',
        fontWeight: 'bold',
        border: '2px solid white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}
    >
      CART: {selectedServices.length} items
      {estimate && <div>₹{String(estimate.total)}</div>}
    </div>
  );
}