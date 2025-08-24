import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { User, Phone, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBookingStore } from '@/store/booking';
import { useUiStore } from '@/stores/useUiStore';

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name must be less than 60 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid Indian phone number'),
  email: z.string().email('Enter valid email address').optional().or(z.literal('')),
  contactPref: z.enum(['phone', 'email', 'both']).default('phone')
});

type CustomerForm = z.infer<typeof customerSchema>;

export default function DetailsStep() {
  const [, setLocation] = useLocation();
  const { customer, setCustomer, address } = useBookingStore();
  const { addToast } = useUiStore();

  const form = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email || '',
      contactPref: customer.contactPref || 'phone'
    }
  });

  const handleSubmit = (data: CustomerForm) => {
    setCustomer({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      contactPref: data.contactPref
    });

    setLocation('/book/otp');
  };

  const handleBack = () => {
    setLocation('/book/location');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Details
          </h1>
          <p className="text-gray-300">
            We need these details to coordinate the service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                              data-testid="input-name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Enter 10-digit mobile number"
                              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                              data-testid="input-phone"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Email Address (Optional)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                              data-testid="input-email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Contact Preference */}
                  <FormField
                    control={form.control}
                    name="contactPref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Preferred Contact Method
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-3 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value="phone" 
                                id="phone"
                                className="border-white/30 text-emerald-500"
                              />
                              <Label htmlFor="phone" className="text-white text-sm">
                                Phone Call
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value="email" 
                                id="email"
                                className="border-white/30 text-emerald-500"
                              />
                              <Label htmlFor="email" className="text-white text-sm">
                                Email
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value="both" 
                                id="both"
                                className="border-white/30 text-emerald-500"
                              />
                              <Label htmlFor="both" className="text-white text-sm">
                                Both Phone & Email
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Service Address Display */}
                  <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-4">
                    <Label className="text-gray-300 text-sm font-medium">Service Address</Label>
                    <p className="text-white mt-1">{address.text}</p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mt-8"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Location
          </Button>

          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={!form.formState.isValid}
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 disabled:opacity-50"
          >
            Continue to Verification
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}