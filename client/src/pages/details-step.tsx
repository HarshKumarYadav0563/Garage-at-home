import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useBookingStore } from '@/store/booking';

const customerDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name must be less than 60 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  contactPref: z.enum(['phone', 'email', 'whatsapp'], {
    required_error: 'Please select a contact preference'
  })
});

type CustomerDetailsForm = z.infer<typeof customerDetailsSchema>;

export default function DetailsStep() {
  const { toast } = useToast();
  const { customer, address, setCustomer, setCurrentStep } = useBookingStore();

  const form = useForm<CustomerDetailsForm>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      name: customer.name || '',
      phone: customer.phone || '',
      email: customer.email || '',
      contactPref: customer.contactPref || 'phone'
    }
  });

  const onSubmit = (data: CustomerDetailsForm) => {
    setCustomer({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      contactPref: data.contactPref
    });

    toast({
      title: "Details saved",
      description: "Your contact details have been saved successfully!"
    });

    setCurrentStep('otp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentStep('location')}
            className="text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Location
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Contact Details</h1>
          <p className="text-gray-400">How should we reach you for updates?</p>
        </motion.div>

        {/* Address Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium text-sm">Service Location</p>
                  <p className="text-white text-sm">{address.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Details Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="w-5 h-5 mr-2 text-emerald-400" />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                            data-testid="input-name"
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
                        <FormLabel className="text-gray-300 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="10-digit mobile number"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email Address <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="your@email.com"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                            data-testid="input-email"
                          />
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
                        <FormLabel className="text-gray-300 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Preferred Contact Method
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              className="bg-white/5 border-white/10 text-white"
                              data-testid="select-contact-pref"
                            >
                              <SelectValue placeholder="How should we contact you?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="phone" className="text-white hover:bg-gray-700">Phone Call</SelectItem>
                            <SelectItem value="whatsapp" className="text-white hover:bg-gray-700">WhatsApp</SelectItem>
                            <SelectItem value="email" className="text-white hover:bg-gray-700">Email</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700 py-3"
                    data-testid="button-continue-otp"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Continue to Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-xs">
            Your details are secure and will only be used to provide you with our service.
          </p>
        </motion.div>
      </div>
    </div>
  );
}