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
        top: '100px',
        left: '20px',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '15px',
        borderRadius: '12px',
        zIndex: 999999,
        fontSize: '16px',
        fontWeight: 'bold',
        border: '3px solid yellow',
        boxShadow: '0 8px 30px rgba(255,255,0,0.8)',
        transform: 'scale(1.2)'
      }}
    >
      🛒 CART: {selectedServices.length} items
      {estimate && <div>TOTAL: ₹{String(estimate.total)}</div>}
    </div>
  );
}