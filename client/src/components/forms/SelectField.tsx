import { forwardRef } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  ({ id, label, placeholder, error, required, options, value, onValueChange, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            ref={ref}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            data-testid={`select-${id}`}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                data-testid={`option-${option.value}`}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-red-500 text-sm" data-testid={`error-${id}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';
