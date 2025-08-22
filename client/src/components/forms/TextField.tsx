import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  error?: string;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, type = 'text', placeholder, error, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={id}
          ref={ref}
          type={type}
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
      </div>
    );
  }
);

TextField.displayName = 'TextField';
