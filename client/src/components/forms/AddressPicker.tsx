import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { getCurrentLocation } from '@/lib/geo';
import { useUiStore } from '@/stores/useUiStore';

interface AddressPickerProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onLocationSelect?: (address: string, lat: number, lng: number) => void;
}

export const AddressPicker = forwardRef<HTMLInputElement, AddressPickerProps>(
  ({ id, label, placeholder = "Enter your complete address", error, required, onLocationSelect, ...props }, ref) => {
    const { addToast } = useUiStore();

    const handleDetectLocation = async () => {
      try {
        const { lat, lng } = await getCurrentLocation();
        // In production, this would use a reverse geocoding service
        const mockAddress = `Detected Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        onLocationSelect?.(mockAddress, lat, lng);
        addToast({
          type: 'success',
          title: 'Location detected',
          message: 'Your current location has been detected'
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Location access denied',
          message: 'Please allow location access or enter address manually'
        });
      }
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        <div className="flex gap-2">
          <Input
            id={id}
            ref={ref}
            type="text"
            placeholder={placeholder}
            className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid={`input-${id}`}
            {...props}
          />
          
          <Button
            type="button"
            variant="outline"
            onClick={handleDetectLocation}
            className="px-3 py-3 border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors"
            data-testid={`button-detect-location-${id}`}
          >
            <MapPin className="w-5 h-5" />
          </Button>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
        
        <p className="text-xs text-gray-500">
          Click the location icon to detect your current location automatically
        </p>
      </div>
    );
  }
);

AddressPicker.displayName = 'AddressPicker';
