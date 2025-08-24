import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Car, Bike, CheckCircle } from 'lucide-react';

// Validation schema
const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  phone: z.string().regex(/^[+]?[91]?[0-9]{10}$/, 'Please enter a valid Indian phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  city: z.string().min(1, 'Please enter your city'),
  vehicleType: z.enum(['bike', 'car']).optional(),
  notes: z.string().max(200, 'Notes too long').optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  vehicleType?: 'bike' | 'car';
}

export function WaitlistModal({ isOpen, onClose, city = '', vehicleType }: WaitlistModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      city,
      vehicleType,
      email: '',
      notes: ''
    }
  });

  const selectedVehicleType = watch('vehicleType');

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        setIsSuccess(true);
        toast({
          title: "Added to Waitlist!",
          description: result.message,
          duration: 5000,
        });
      } else {
        throw new Error(result.message || 'Failed to join waitlist');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-white/20 backdrop-blur-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl">
            {isSuccess ? 'Welcome to the Waitlist!' : 'Join Our Waitlist'}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-white font-bold text-lg mb-2">
                You're on the list!
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                We'll notify you as soon as we launch in your area. Thank you for your interest!
              </p>
              
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 text-orange-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold text-sm">Service Unavailable</span>
                </div>
                <p className="text-gray-300 text-xs">
                  We're currently serving only Delhi-NCR. Join our waitlist to be notified when we expand to your area!
                </p>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-white text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 mt-1"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-white text-sm font-medium">
                  Phone Number *
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    {...register('phone')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 pl-10"
                    placeholder="9876543210"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email Address (Optional)
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 pl-10"
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city" className="text-white text-sm font-medium">
                  City *
                </Label>
                <Input
                  id="city"
                  {...register('city')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 mt-1"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* Vehicle Type */}
              <div>
                <Label className="text-white text-sm font-medium mb-2 block">
                  Interested in service for
                </Label>
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    onClick={() => setValue('vehicleType', 'bike')}
                    variant="outline"
                    className={`flex-1 h-12 ${
                      selectedVehicleType === 'bike'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Bike className="w-4 h-4 mr-2" />
                    Bike
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setValue('vehicleType', 'car')}
                    variant="outline"
                    className={`flex-1 h-12 ${
                      selectedVehicleType === 'car'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Car
                  </Button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-white text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 mt-1 resize-none"
                  placeholder="Any specific services you're interested in..."
                  rows={3}
                />
                {errors.notes && (
                  <p className="text-red-400 text-xs mt-1">{errors.notes.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 border-white/20 text-gray-300 hover:bg-white/10"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}