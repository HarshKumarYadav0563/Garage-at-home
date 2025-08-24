import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, MapPin, User, Phone, Car, Bike, Calendar, Loader2 } from 'lucide-react';
import { useBookingStore } from '@/stores/useBookingStore';
import { useToast } from '@/hooks/use-toast';
import { BIKE_SERVICES, CAR_SERVICES } from '@/lib/pricing';

interface BookingConfirmationProps {
  onComplete: (trackingId: string) => void;
}

export function BookingConfirmation({ onComplete }: BookingConfirmationProps) {
  const {
    selectedServices,
    selectedAddons,
    selectedVehicle,
    selectedCity,
    vehicleModel,
    customer,
    address,
    selectedSlot,
    estimate,
    isSubmitting,
    setIsSubmitting,
    setTrackingId,
    otp
  } = useBookingStore();

  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);

  const allServices = selectedVehicle === 'bike' ? BIKE_SERVICES : CAR_SERVICES;
  const allAddons: any[] = []; // Addons will be integrated later
  
  const selectedServiceItems = selectedServices.map(id => 
    allServices.find(service => service.id === id)
  ).filter(Boolean);
  
  const selectedAddonItems = selectedAddons.map(id => 
    allAddons.find(addon => addon.id === id)
  ).filter(Boolean);

  const handleConfirmBooking = async () => {
    if (!customer || !address || !selectedSlot || !otp.verified) {
      toast({
        title: "Missing Information",
        description: "Please complete all required steps.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    setIsSubmitting(true);

    try {
      const bookingData = {
        customer: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email || '',
          contactPreference: customer.contactPreference
        },
        vehicle: {
          type: selectedVehicle,
          make: vehicleModel?.make || '',
          model: vehicleModel?.model || '',
          variant: vehicleModel?.variant || ''
        },
        address: {
          text: address.text,
          pincode: address.pincode || '',
          lat: address.lat,
          lng: address.lng
        },
        slot: {
          date: selectedSlot.date,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          startISO: selectedSlot.startISO,
          endISO: selectedSlot.endISO
        },
        services: selectedServices,
        addons: selectedAddons,
        city: selectedCity,
        estimate,
        otpToken: otp.otpToken
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (result.ok && result.trackingId) {
        setTrackingId(result.trackingId);
        onComplete(result.trackingId);
        
        toast({
          title: "Booking Confirmed!",
          description: "Your service request has been submitted successfully.",
        });
      } else {
        throw new Error(result.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Confirm Your Booking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Details */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-white">{customer?.phone}</span>
              </div>
              {customer?.email && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{customer.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Contact via:</span>
                <span className="text-white capitalize">{customer?.contactPreference}</span>
              </div>
            </div>
            <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              ✓ Phone Verified
            </Badge>
          </div>

          {/* Vehicle Details */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              {selectedVehicle === 'bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
              Vehicle Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-white capitalize">{selectedVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Make:</span>
                <span className="text-white">{vehicleModel?.make}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Model:</span>
                <span className="text-white">{vehicleModel?.model}</span>
              </div>
              {vehicleModel?.variant && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Variant:</span>
                  <span className="text-white">{vehicleModel.variant}</span>
                </div>
              )}
            </div>
          </div>

          {/* Service Location */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Service Location
            </h3>
            <p className="text-white text-sm">{address?.text}</p>
            {address?.pincode && (
              <p className="text-gray-400 text-sm">Pincode: {address.pincode}</p>
            )}
          </div>

          {/* Service Time */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Service Time
            </h3>
            <p className="text-white text-sm">{selectedSlot?.label}</p>
          </div>

          {/* Selected Services */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-3">Selected Services</h3>
            <div className="space-y-2">
              {selectedServiceItems.map((service) => (
                <div key={service?.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">{service?.name}</span>
                  <span className="text-white">₹{service?.price.min} - ₹{service?.price.max}</span>
                </div>
              ))}
              {selectedAddonItems.map((addon) => (
                <div key={addon?.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">{addon?.name}</span>
                  <span className="text-white">₹{addon?.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          {estimate && (
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-xl">
              <h3 className="text-white font-medium mb-3">Price Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{estimate.subtotal.min} - ₹{estimate.subtotal.max}</span>
                </div>
                <div className="flex justify-between text-white font-medium pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>₹{estimate.total.min} - ₹{estimate.total.max}</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmBooking}
            disabled={isConfirming || isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-confirm-booking"
          >
            {isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirming Booking...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Booking
              </>
            )}
          </Button>

          {/* Terms */}
          <p className="text-gray-500 text-xs text-center">
            By confirming this booking, you agree to our terms of service and privacy policy.
            Payment will be collected after service completion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}