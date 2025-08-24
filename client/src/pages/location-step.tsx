import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { useLocation } from 'wouter';

// NCR cities for validation
const NCR_CITIES = ['delhi', 'gurugram', 'noida', 'ghaziabad', 'faridabad'];

export default function LocationStep() {
  const { toast } = useToast();
  const { address, setAddress, setCurrentStep } = useBookingStore();
  const [, setLocationRoute] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState(address.text || '');
  const [pincode, setPincode] = useState(address.pincode || '');

  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocode to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      
      const city = data.address?.city || data.address?.town || data.address?.village || '';
      const addressText = data.display_name || `${latitude}, ${longitude}`;
      
      // Check if city is in NCR
      const isNcrCity = NCR_CITIES.some(ncrCity => 
        city.toLowerCase().includes(ncrCity) || addressText.toLowerCase().includes(ncrCity)
      );
      
      if (!isNcrCity) {
        // Show waitlist modal for non-NCR cities
        toast({
          title: "Service Area",
          description: "We currently serve NCR only. Join our waitlist for updates!",
          variant: "destructive"
        });
        return;
      }
      
      setAddress({
        text: addressText,
        lat: latitude,
        lng: longitude,
        city: city.toLowerCase(),
        pincode: data.address?.postcode || ''
      });
      
      toast({
        title: "Location detected",
        description: "Your location has been detected successfully!"
      });
      
      // Navigate to mechanic selection
      setTimeout(() => {
        setCurrentStep('mechanic');
        setLocationRoute('/mechanic');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to detect location. Please enter manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualAddress.trim() || !pincode.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both address and pincode",
        variant: "destructive"
      });
      return;
    }

    // Basic NCR validation based on pincode
    const ncrPincodes = [
      /^11\d{4}$/, // Delhi
      /^122\d{3}$/, // Gurugram
      /^201\d{3}$/, // Noida
      /^201\d{3}$/, // Ghaziabad  
      /^121\d{3}$/, // Faridabad
    ];
    
    const isNcrPincode = ncrPincodes.some(pattern => pattern.test(pincode));
    
    if (!isNcrPincode) {
      toast({
        title: "Service Area",
        description: "We currently serve NCR only. Join our waitlist for updates!",
        variant: "destructive"
      });
      return;
    }

    setAddress({
      text: manualAddress,
      pincode: pincode,
      city: 'ncr' // General NCR for manual entry
    });

    toast({
      title: "Address saved",
      description: "Your address has been saved successfully!"
    });
    
    // Navigate to mechanic selection
    setTimeout(() => {
      setCurrentStep('mechanic');
      setLocationRoute('/mechanic');
    }, 1500);
  };

  const handleContinue = () => {
    if (!address.text) {
      toast({
        title: "Missing Address",
        description: "Please set your location first",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('details');
    setLocationRoute('/details');
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
              setCurrentStep('services');
              setLocationRoute('/services');
            }}
            className="text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Your Location</h1>
          <p className="text-gray-400">Where should our mechanic visit you?</p>
        </motion.div>

        {/* Location Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Navigation className="w-5 h-5 mr-2 text-emerald-400" />
                Auto-detect Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Let us automatically detect your location for the fastest service.
              </p>
              <Button
                onClick={handleUseCurrentLocation}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Detecting Location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Current Location
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Manual Address Entry */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Or Enter Manually</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your full address"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  data-testid="input-address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-gray-300">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  data-testid="input-pincode"
                />
              </div>
              
              <Button
                onClick={handleManualSubmit}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                data-testid="button-save-address"
              >
                Save Address
              </Button>
            </CardContent>
          </Card>

          {/* Current Address Display */}
          {address.text && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-emerald-400 font-medium text-sm">Selected Address</p>
                  <p className="text-white text-sm mt-1">{address.text}</p>
                  {address.pincode && (
                    <p className="text-gray-400 text-xs mt-1">Pincode: {address.pincode}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!address.text}
            className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-600 hover:via-sky-600 hover:to-indigo-700 py-3"
            data-testid="button-continue-details"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}