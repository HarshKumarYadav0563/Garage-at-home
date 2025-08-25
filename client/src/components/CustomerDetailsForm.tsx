import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { User, Phone, MapPin, Hash, ArrowRight } from 'lucide-react';
import { customerSchema, CustomerData } from '@/lib/validators';
import { useBookingStore } from '@/store/booking';

interface CustomerDetailsFormProps {
  onSubmit: (data: CustomerData) => void;
}

export function CustomerDetailsForm({ onSubmit }: CustomerDetailsFormProps) {
  const { customer, setCustomer, city } = useBookingStore();
  const shouldReduceMotion = useReducedMotion();

  const form = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
    mode: 'onChange'
  });

  const handleSubmit = (data: CustomerData) => {
    setCustomer(data);
    onSubmit(data);
  };

  const cityName = {
    ncr: 'NCR',
    delhi: 'Delhi',
    gurgaon: 'Gurgaon',
    noida: 'Noida',
    faridabad: 'Faridabad',
    ghaziabad: 'Ghaziabad',
    other: 'Other'
  }[city] || 'NCR';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Customer Details</h3>
        <p className="text-gray-400 text-sm">
          Provide your details so our mechanic can reach you
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    onChange={(e) => {
                      field.onChange(e);
                      setCustomer({ name: e.target.value });
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    onChange={(e) => {
                      field.onChange(e);
                      setCustomer({ phone: e.target.value });
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Complete Address</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your complete address with landmarks"
                    rows={3}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none"
                    onChange={(e) => {
                      field.onChange(e);
                      setCustomer({ address: e.target.value });
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* City (auto-filled) */}
            <div>
              <label className="text-gray-300 text-sm font-medium flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span>City</span>
              </label>
              <Input
                value={cityName}
                disabled
                className="bg-white/5 border-white/10 text-gray-400"
              />
            </div>

            {/* Pincode Field */}
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <span>Pincode (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="400001"
                      maxLength={6}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                      onChange={(e) => {
                        field.onChange(e);
                        setCustomer({ pincode: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white py-4 sm:py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Continue to Slot Selection</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}