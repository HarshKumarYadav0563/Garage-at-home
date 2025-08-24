import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Phone, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OtpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  onVerified: (otpToken: string) => void;
}

export function OtpDialog({ isOpen, onClose, phone, onVerified }: OtpDialogProps) {
  const [step, setStep] = useState<'send' | 'verify'>('send');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus OTP input
  useEffect(() => {
    if (step === 'verify') {
      const input = document.getElementById('otp-input');
      input?.focus();
    }
  }, [step]);

  const sendOtp = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      
      const data = await response.json();
      setSessionId(data.sessionId);
      setStep('verify');
      setCountdown(30); // 30 seconds before resend
      setAttempts(attempts + 1);
      
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${phone}`,
      });
      
    } catch (error) {
      console.error('Send OTP error:', error);
      setError('Failed to send OTP. Please try again.');
      toast({
        title: "Failed to Send OTP",
        description: "Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone, 
          sessionId, 
          code: otp 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid OTP');
      }
      
      const data = await response.json();
      
      if (data.verified) {
        toast({
          title: "Phone Verified!",
          description: "Your phone number has been verified successfully.",
        });
        onVerified(data.otpToken);
        onClose();
      } else {
        throw new Error('Invalid OTP');
      }
      
    } catch (error) {
      console.error('Verify OTP error:', error);
      setError('Invalid OTP. Please try again.');
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please check and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
    setError('');
    
    // Auto-verify when 6 digits are entered
    if (numericValue.length === 6) {
      setTimeout(() => verifyOtp(), 500);
    }
  };

  const handleResend = () => {
    setOtp('');
    setError('');
    sendOtp();
  };

  const handleBack = () => {
    setStep('send');
    setOtp('');
    setError('');
    setSessionId('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-6 h-6 text-emerald-400" />
            Phone Verification
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {step === 'send' ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <Phone className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Verify Your Phone Number</h3>
                <p className="text-gray-400 text-sm">
                  We'll send a 6-digit verification code to your phone number
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Phone Number:</span>
                </div>
                <p className="text-white font-medium mt-1">{phone}</p>
              </div>
              
              <Button
                onClick={sendOtp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3"
                data-testid="button-send-otp"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Verification Code
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enter Verification Code</h3>
                <p className="text-gray-400 text-sm">
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  id="otp-input"
                  type="text"
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl font-mono tracking-widest bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  data-testid="input-otp"
                />
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="text-gray-400 hover:text-white p-0"
                    data-testid="button-back"
                  >
                    ← Change Number
                  </Button>
                  
                  {countdown > 0 ? (
                    <span className="text-gray-400">
                      Resend in {countdown}s
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={handleResend}
                      disabled={isLoading}
                      className="text-emerald-400 hover:text-emerald-300 p-0"
                      data-testid="button-resend"
                    >
                      Resend Code
                    </Button>
                  )}
                </div>
              </div>
              
              <Button
                onClick={verifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3"
                data-testid="button-verify-otp"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify & Continue
                  </>
                )}
              </Button>
              
              {attempts > 0 && (
                <div className="text-center">
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                    Attempt {attempts}/3
                  </Badge>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Security Note */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-400 text-xs text-center">
              🔒 Your phone number is kept secure and used only for service verification
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}