import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { MapPin, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUiStore } from '@/stores/useUiStore';
import { apiRequest } from '@/lib/queryClient';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid Indian phone number'),
  city: z.string().min(1, 'City is required'),
  email: z.string().email('Enter valid email address').optional().or(z.literal(''))
});

type WaitlistForm = z.infer<typeof waitlistSchema>;

export default function Waitlist() {
  const [, setLocation] = useLocation();
  const { addToast } = useUiStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      email: ''
    }
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistForm) => {
      const res = await apiRequest('POST', '/api/waitlist', data);
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      addToast({
        type: 'success',
        title: 'Added to Waitlist!',
        message: 'We\'ll notify you when we expand to your city'
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to Join',
        message: 'Please try again'
      });
    }
  });

  const handleSubmit = (data: WaitlistForm) => {
    waitlistMutation.mutate(data);
  };

  const handleBack = () => {
    setLocation('/');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">You're on the List!</h1>
            <p className="text-gray-300 mb-8">
              We'll notify you as soon as we start serving your area. Get ready for premium doorstep vehicle service!
            </p>
            <Button 
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 pb-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Join Our Waitlist
          </h1>
          <p className="text-gray-300">
            Be the first to know when we expand to your city
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            data-testid="input-waitlist-name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            data-testid="input-waitlist-phone"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-base font-medium">
                          Your City *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your city name"
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                            data-testid="input-waitlist-city"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

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
                              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                              data-testid="input-waitlist-email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-3"
                  >
                    {waitlistMutation.isPending ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </form>
              </Form>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
                <p className="text-blue-300 text-sm text-center">
                  Currently serving NCR region (Delhi, Gurugram, Noida, Ghaziabad, Faridabad)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}