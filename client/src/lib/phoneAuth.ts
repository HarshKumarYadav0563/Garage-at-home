import { auth } from './firebase';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  ConfirmationResult,
  ApplicationVerifier 
} from 'firebase/auth';

class PhoneAuthService {
  private recaptchaVerifier: RecaptchaVerifier | null = null;
  private confirmationResult: ConfirmationResult | null = null;

  // Initialize reCAPTCHA verifier
  initializeRecaptcha(containerId: string): void {
    try {
      if (this.recaptchaVerifier) {
        this.recaptchaVerifier.clear();
      }

      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          this.initializeRecaptcha(containerId); // Reinitialize on expiry
        }
      });
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
    }
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized');
      }

      // Ensure phone number has country code
      const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
      
      this.confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        this.recaptchaVerifier
      );

      return {
        success: true,
        sessionId: this.confirmationResult.verificationId
      };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        error: error.message || 'Failed to send OTP'
      };
    }
  }

  // Verify OTP
  async verifyOTP(code: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      if (!this.confirmationResult) {
        throw new Error('No confirmation result available');
      }

      const result = await this.confirmationResult.confirm(code);
      return {
        success: true,
        user: result.user
      };
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        error: error.message || 'Invalid OTP'
      };
    }
  }

  // Clean up
  cleanup(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
      this.recaptchaVerifier = null;
    }
    this.confirmationResult = null;
  }
}

export const phoneAuthService = new PhoneAuthService();
export default phoneAuthService;