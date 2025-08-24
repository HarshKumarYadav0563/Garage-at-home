import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { CustomerData } from '@/stores/useBookingStore';

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  contactPreference: z.enum(['call', 'whatsapp']),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerDetailsFormProps {
  value?: CustomerData;
  onChange: (customer: CustomerData) => void;
  onContinue: () => void;
}

export function CustomerDetailsForm({ value, onChange, onContinue }: CustomerDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: value?.name || '',
      phone: value?.phone || '',
      email: value?.email || '',
      contactPreference: value?.contactPreference || 'call'
    }
  });

  const contactPreference = watch('contactPreference');

  const onSubmit = (data: CustomerFormData) => {
    onChange(data);
    onContinue();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Label className="text-gray-300 text-sm font-medium">
                Full Name *
              </Label>
              <Input
                {...register('name')}
                placeholder="Enter your full name"
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                data-testid="input-customer-name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label className="text-gray-300 text-sm font-medium">
                Phone Number *
              </Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register('phone')}
                  placeholder="9876543210"
                  maxLength={10}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  data-testid="input-customer-phone"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                We'll send OTP to verify this number
              </p>
            </div>

            {/* Email (Optional) */}
            <div>
              <Label className="text-gray-300 text-sm font-medium">
                Email Address <span className="text-gray-500">(Optional)</span>
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  data-testid="input-customer-email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Contact Preference */}
            <div>
              <Label className="text-gray-300 text-sm font-medium mb-3 block">
                Preferred Contact Method *
              </Label>
              <RadioGroup
                value={contactPreference}
                onValueChange={(value) => setValue('contactPreference', value as 'call' | 'whatsapp')}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <RadioGroupItem value="call" id="call" className="peer sr-only" />
                  <Label
                    htmlFor="call"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer peer-checked:border-emerald-500/40 peer-checked:bg-emerald-500/10 transition-all hover:border-white/40"
                    data-testid="option-contact-call"
                  >
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Phone Call</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="whatsapp" id="whatsapp" className="peer sr-only" />
                  <Label
                    htmlFor="whatsapp"
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer peer-checked:border-emerald-500/40 peer-checked:bg-emerald-500/10 transition-all hover:border-white/40"
                    data-testid="option-contact-whatsapp"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <span className="text-white">WhatsApp</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3 rounded-xl transition-all"
              data-testid="button-continue-details"
            >
              <span>Continue to Address</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}