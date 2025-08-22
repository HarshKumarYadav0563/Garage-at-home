import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  error?: string;
  required?: boolean;
}

export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ id, label, placeholder = "+91 98765 43210", error, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={id}
          ref={ref}
          type="tel"
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          data-testid={`input-${id}`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Enter 10-digit mobile number or with +91
        </p>
      </div>
    );
  }
);

PhoneField.displayName = 'PhoneField';
