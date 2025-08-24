import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Shield, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBookingStore } from '@/store/booking';
import { useUiStore } from '@/stores/useUiStore';
import { apiRequest } from '@/lib/queryClient';

export default function OtpStep() {
  const [, setLocation] = useLocation();
  const {
    customer,
    otp,
    setOtpDetails,
    services,
    addons,
    address,
    vehicle,
    city,
    getFinalTotal
  } = useBookingStore();
  const { addToast } = useUiStore();
  
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP mutation
  const sendOtpMutation = useMutation({
    mutationFn: async (phone: string) => {
      const res = await apiRequest('POST', '/api/otp/send', { phone });
      return res.json();
    },
    onSuccess: (data) => {
      setOtpDetails({
        phone: customer.phone,
        sessionId: data.sessionId,
        verified: false
      });
      addToast({
        type: 'success',
        title: 'OTP Sent',
        message: 'Please check your phone for the OTP'
      });
      startTimer();
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Failed to Send OTP',
        message: 'Please try again'
      });
    }
  });

  // Verify OTP mutation
  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { phone: string; sessionId: string; code: string }) => {
      const res = await apiRequest('POST', '/api/otp/verify', data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.verified) {
        setOtpDetails({ verified: true });
        handleBookingSubmission(data.otpToken);
      } else {
        addToast({
          type: 'error',
          title: 'Invalid OTP',
          message: 'Please check and try again'
        });
        setOtpCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Verification Failed',
        message: 'Please try again'
      });
    }
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const res = await apiRequest('POST', '/api/leads', bookingData);
      return res.json();
    },
    onSuccess: (data) => {
      addToast({
        type: 'success',
        title: 'Booking Confirmed!',
        message: `Your booking ${data.trackingId} has been received.`
      });
      setLocation(`/track/${data.trackingId}`);
    },
    onError: (error: any) => {
      addToast({
        type: 'error',
        title: 'Booking Failed',
        message: error.message || 'Please try again'
      });
    }
  });

  const startTimer = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    // Send OTP on component mount
    if (customer.phone && !otp.sessionId) {
      sendOtpMutation.mutate(customer.phone);
    }
    
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      addToast({
        type: 'error',
        title: 'Incomplete OTP',
        message: 'Please enter all 6 digits'
      });
      return;
    }

    if (!otp.sessionId) {
      addToast({
        type: 'error',
        title: 'Session Expired',
        message: 'Please resend OTP'
      });
      return;
    }

    verifyOtpMutation.mutate({
      phone: customer.phone,
      sessionId: otp.sessionId,
      code
    });
  };

  const handleBookingSubmission = async (otpToken: string) => {
    try {
      const bookingData = {
        vehicle,
        city,
        services: services.map(s => ({
          id: s.id,
          name: s.name,
          price: s.price
        })),
        addons: addons.map(a => ({
          id: a.id,
          name: a.name,
          price: a.price
        })),
        estTotal: {
          min: getFinalTotal(),
          max: getFinalTotal()
        },
        customer: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          contactPref: customer.contactPref
        },
        address: {
          text: address.text,
          lat: address.lat,
          lng: address.lng,
          pincode: address.pincode
        },
        otpToken
      };

      createBookingMutation.mutate(bookingData);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Booking Error',
        message: 'Please try again'
      });
    }
  };

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    setOtpCode(['', '', '', '', '', '']);
    sendOtpMutation.mutate(customer.phone);
  };

  const handleBack = () => {
    setLocation('/book/details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 pb-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Verify Your Number
          </h1>
          <p className="text-gray-300">
            Enter the 6-digit code sent to +91-{customer.phone}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* OTP Input */}
                <div className="flex justify-center space-x-3">
                  {otpCode.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-lg font-bold bg-white/5 border-white/20 text-white focus:ring-emerald-500 focus:border-emerald-500"
                      data-testid={`input-otp-${index}`}
                    />
                  ))}
                </div>

                {/* Timer and Resend */}
                <div className="text-center">
                  {isResendDisabled ? (
                    <p className="text-gray-400 text-sm">
                      Resend OTP in {timeLeft}s
                    </p>
                  ) : (
                    <Button
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={sendOtpMutation.isPending}
                      className="text-emerald-400 hover:text-emerald-300 p-0"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Resend OTP
                    </Button>
                  )}
                </div>

                {/* Test OTP Note */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-blue-300 text-sm text-center">
                    For testing: Use <span className="font-mono font-bold">123456</span> or <span className="font-mono font-bold">000000</span>
                  </p>
                </div>

                {/* Verify Button */}
                <Button
                  onClick={handleVerifyOtp}
                  disabled={verifyOtpMutation.isPending || createBookingMutation.isPending}
                  className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 text-lg py-3"
                >
                  {verifyOtpMutation.isPending || createBookingMutation.isPending
                    ? 'Verifying...'
                    : 'Verify & Book Service'
                  }
                </Button>

                {/* Booking Summary */}
                <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-4">
                  <p className="text-gray-300 text-sm text-center">
                    Total Amount: <span className="font-bold text-white">₹{getFinalTotal()}</span>
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-1">
                    Payment will be collected after service completion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
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
            Back to Details
          </Button>
        </motion.div>
      </div>
    </div>
  );
}