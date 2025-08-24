import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { AddressData } from '@/stores/useBookingStore';
import { useToast } from '@/hooks/use-toast';

// NCR boundaries (simplified polygon)
const NCR_BOUNDS = {
  north: 28.9,
  south: 28.0,
  east: 77.5,
  west: 76.8
};

// Mock location data for development
const MOCK_LOCATIONS = [
  { name: 'Connaught Place, Delhi', lat: 28.6328, lng: 77.2197, pincode: '110001' },
  { name: 'Sector 18, Noida', lat: 28.5667, lng: 77.3262, pincode: '201301' },
  { name: 'MG Road, Gurugram', lat: 28.4595, lng: 77.0266, pincode: '122002' },
  { name: 'Rajouri Garden, Delhi', lat: 28.6469, lng: 77.1174, pincode: '110027' },
  { name: 'Sahibabad, Ghaziabad', lat: 28.6692, lng: 77.3507, pincode: '201005' }
];

interface AddressPickerProps {
  value?: AddressData;
  onChange: (address: AddressData) => void;
  onWaitlistNeeded: () => void;
}

export function AddressPicker({ value, onChange, onWaitlistNeeded }: AddressPickerProps) {
  const [address, setAddress] = useState(value?.text || '');
  const [pincode, setPincode] = useState(value?.pincode || '');
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof MOCK_LOCATIONS>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'none' | 'detected' | 'invalid'>('none');
  const { toast } = useToast();

  const isNcrLocation = (lat: number, lng: number): boolean => {
    return lat >= NCR_BOUNDS.south && 
           lat <= NCR_BOUNDS.north && 
           lng >= NCR_BOUNDS.west && 
           lng <= NCR_BOUNDS.east;
  };

  const handleUseMyLocation = async () => {
    setIsDetecting(true);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const { latitude: lat, longitude: lng } = position.coords;
      
      // Check if location is in NCR
      if (!isNcrLocation(lat, lng)) {
        setLocationStatus('invalid');
        onWaitlistNeeded();
        toast({
          title: "Location Outside Service Area",
          description: "We currently only serve Delhi NCR. Join our waitlist for updates!",
          variant: "destructive",
        });
        return;
      }

      // Mock reverse geocoding - in production, use a real service
      const detectedAddress = `Detected Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      const detectedPincode = '110001'; // Mock pincode
      
      setAddress(detectedAddress);
      setPincode(detectedPincode);
      setLocationStatus('detected');
      
      const addressData: AddressData = {
        text: detectedAddress,
        lat,
        lng,
        pincode: detectedPincode,
        locationType: 'geolocation'
      };
      
      onChange(addressData);
      
      toast({
        title: "Location Detected",
        description: "Your current location has been detected successfully!",
      });
      
    } catch (error) {
      console.error('Geolocation error:', error);
      toast({
        title: "Location Access Denied",
        description: "Please allow location access or enter your address manually.",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    // Mock search - filter mock locations
    const filtered = MOCK_LOCATIONS.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSelectSearchResult = (location: typeof MOCK_LOCATIONS[0]) => {
    setAddress(location.name);
    setPincode(location.pincode);
    setSearchResults([]);
    setShowSearch(false);
    setLocationStatus('detected');
    
    const addressData: AddressData = {
      text: location.name,
      lat: location.lat,
      lng: location.lng,
      pincode: location.pincode,
      locationType: 'search'
    };
    
    onChange(addressData);
  };

  const handleManualAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    if (newAddress && pincode) {
      const addressData: AddressData = {
        text: newAddress,
        pincode,
        locationType: 'manual'
      };
      onChange(addressData);
    }
  };

  const handlePincodeChange = (newPincode: string) => {
    setPincode(newPincode);
    if (address && newPincode) {
      const addressData: AddressData = {
        text: address,
        pincode: newPincode,
        locationType: 'manual'
      };
      onChange(addressData);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Service Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleUseMyLocation}
              disabled={isDetecting}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
              data-testid="button-use-location"
            >
              <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
              {isDetecting ? 'Detecting...' : 'Use My Location'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowSearch(!showSearch)}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
              data-testid="button-search-address"
            >
              <Search className="w-4 h-4" />
              Search Address
            </Button>
          </div>

          {/* Search Interface */}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <Input
                placeholder="Search for area, landmark, or pincode..."
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                data-testid="input-search-address"
              />
              
              {searchResults.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 max-h-48 overflow-y-auto">
                  {searchResults.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSearchResult(location)}
                      className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
                      data-testid={`option-address-${index}`}
                    >
                      <div className="text-white font-medium">{location.name}</div>
                      <div className="text-gray-400 text-sm">Pincode: {location.pincode}</div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Manual Address Entry */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Complete Address
              </label>
              <Input
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => handleManualAddressChange(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                data-testid="input-manual-address"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Pincode
              </label>
              <Input
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                maxLength={6}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                data-testid="input-pincode"
              />
            </div>
          </div>

          {/* Location Status */}
          {locationStatus === 'detected' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white font-medium">Location Confirmed</p>
                  <p className="text-gray-300 text-sm">Service available in your area</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  NCR
                </Badge>
              </div>
            </motion.div>
          )}
          
          {locationStatus === 'invalid' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white font-medium">Location Outside Service Area</p>
                  <p className="text-gray-300 text-sm">We currently only serve Delhi NCR</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Service Area Info */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-300 text-sm">
              <strong>Service Areas:</strong> Delhi, Gurugram, Noida, Ghaziabad, Faridabad
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}