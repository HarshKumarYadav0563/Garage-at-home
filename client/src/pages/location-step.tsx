import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { MapPin, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBookingStore } from '@/store/booking';
import { useUiStore } from '@/stores/useUiStore';
import { getCurrentLocation } from '@/lib/geo';

export default function LocationStep() {
  const [, setLocation] = useLocation();
  const { address, setAddress, city } = useBookingStore();
  const { addToast } = useUiStore();
  
  const [addressText, setAddressText] = useState(address.text);
  const [pincode, setPincode] = useState(address.pincode || '');
  const [isDetecting, setIsDetecting] = useState(false);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      const { lat, lng } = await getCurrentLocation();
      
      // Mock reverse geocoding - in production use actual reverse geocoding service
      const detectedAddress = `Detected Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      
      setAddressText(detectedAddress);
      setAddress({
        text: detectedAddress,
        lat,
        lng,
        pincode
      });
      
      addToast({
        type: 'success',
        title: 'Location Detected',
        message: 'Your current location has been detected successfully'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Location Access Denied',
        message: 'Please allow location access or enter address manually'
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleContinue = () => {
    if (!addressText.trim()) {
      addToast({
        type: 'error',
        title: 'Address Required',
        message: 'Please enter your service address'
      });
      return;
    }

    setAddress({
      text: addressText,
      lat: address.lat,
      lng: address.lng,
      pincode
    });

    setLocation('/book/details');
  };

  const handleBack = () => {
    setLocation(`/services/${useBookingStore.getState().vehicle}/${city}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Where should we come?
          </h1>
          <p className="text-gray-300">
            We'll send a professional mechanic to your location
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
                {/* Quick Location Detection */}
                <div className="text-center">
                  <Button
                    onClick={handleDetectLocation}
                    disabled={isDetecting}
                    variant="outline"
                    size="lg"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500"
                  >
                    <Navigation className={`w-5 h-5 mr-2 ${isDetecting ? 'animate-spin' : ''}`} />
                    {isDetecting ? 'Detecting Location...' : 'Use My Current Location'}
                  </Button>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 border-t border-white/10"></div>
                  <span className="px-4 text-gray-400 text-sm">OR</span>
                  <div className="flex-1 border-t border-white/10"></div>
                </div>

                {/* Manual Address Entry */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-white text-base font-medium">
                      Complete Address *
                    </Label>
                    <textarea
                      id="address"
                      value={addressText}
                      onChange={(e) => setAddressText(e.target.value)}
                      placeholder="Enter your complete address including building name, area, landmarks..."
                      className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                      rows={3}
                      data-testid="input-address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode" className="text-white text-base font-medium">
                      Pincode (Optional)
                    </Label>
                    <Input
                      id="pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode for better location accuracy"
                      className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                      data-testid="input-pincode"
                    />
                  </div>
                </div>

                {/* Service Area Note */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-blue-300 font-medium">Service Area</p>
                      <p className="text-blue-200 mt-1">
                        Currently serving NCR region: Delhi, Gurugram, Noida, Ghaziabad, and Faridabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            Back to Services
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!addressText.trim()}
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-600 disabled:opacity-50"
          >
            Continue to Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}