import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield, Clock, Phone } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { useLocation } from 'wouter';
import { phoneAuthService } from '@/lib/phoneAuth';

export default function OTPStep() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { 
    customer, 
    address, 
    selectedServices, 
    selectedAddons, 
    selectedVehicle,
    otp, 
    setOTP, 
    setCurrentStep, 
    setTrackingId,
    getFinalTotal
  } = useBookingStore();

  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Auto-send OTP on component mount
  useEffect(() => {
    // Initialize reCAPTCHA for Firebase Auth after a short delay
    const timer = setTimeout(() => {
      try {
        phoneAuthService.initializeRecaptcha('recaptcha-container');
        
        if (!otp.sessionId) {
          sendOTP();
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        toast({
          title: "Initialization Error",
          description: "Please refresh the page and try again",
          variant: "destructive"
        });
      }
    }, 500);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      phoneAuthService.cleanup();
    };
  }, []);

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOTP = async () => {
    setIsSending(true);
    try {
      // Use Firebase to send OTP
      const result = await phoneAuthService.sendOTP(customer.phone);
      
      if (result.success) {
        setOTP({
          phone: customer.phone,
          sessionId: result.sessionId || '',
          verified: false
        });
        setResendTimer(60); // 60 second cooldown
        toast({
          title: "OTP Sent",
          description: `Verification code sent to +91${customer.phone} via SMS`
        });
      } else {
        throw new Error(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to send OTP',
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const verifyOTP = async () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP with Firebase
      const result = await phoneAuthService.verifyOTP(otpValue);
      
      if (!result.success) {
        throw new Error(result.error || 'Invalid OTP');
      }
      
      // Get Firebase ID token for server verification
      const firebaseToken = await result.user?.getIdToken();

      // Create booking
      const bookingResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: selectedVehicle,
          city: address.city || 'ncr',
          services: selectedServices,
          addons: selectedAddons,
          estTotal: { min: getFinalTotal(), max: getFinalTotal() },
          customer: customer,
          address: address,
          firebaseToken: firebaseToken
        })
      });

      const bookingData = await bookingResponse.json();
      
      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || 'Booking failed');
      }

      // Success - set tracking ID and navigate
      setTrackingId(bookingData.trackingId);
      setOTP({ ...otp, verified: true, code: otpValue });
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking ${bookingData.trackingId} has been received. We'll contact you shortly.`
      });

      // Navigate to tracking page
      setLocation(`/track/${bookingData.trackingId}`);
      
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : 'Please try again',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            onClick={() => {
              setCurrentStep('details');
              setLocation('/details');
            }}
            className="text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Verify Your Number</h1>
          <p className="text-gray-400">Enter the 6-digit code sent to your mobile</p>
        </motion.div>

        {/* Phone Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-emerald-400 font-medium text-sm">Verification sent to</p>
                  <p className="text-white text-sm">+91 {customer.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* OTP Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                Enter Verification Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otpValue} 
                  onChange={setOtpValue}
                  data-testid="input-otp"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={1} className="bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={2} className="bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={3} className="bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={4} className="bg-white/5 border-white/10 text-white" />
                    <InputOTPSlot index={5} className="bg-white/5 border-white/10 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Resend Button */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-gray-400 text-sm flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Resend in {resendTimer}s
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={sendOTP}
                    disabled={isSending}
                    className="text-emerald-400 hover:text-emerald-300"
                    data-testid="button-resend-otp"
                  >
                    {isSending ? 'Sending...' : 'Resend Code'}
                  </Button>
                )}
              </div>

              {/* Verify Button */}
              <Button
                onClick={verifyOTP}
                disabled={otpValue.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700 py-3"
                data-testid="button-verify-otp"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying & Booking...
                  </>
                ) : (
                  'Verify & Book Service'
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-xs">
            This helps us confirm your identity and secure your booking.
          </p>
        </motion.div>
        
        {/* Hidden reCAPTCHA container for Firebase Auth */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}