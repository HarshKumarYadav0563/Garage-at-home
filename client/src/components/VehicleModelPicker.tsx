import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Car, Bike, ChevronRight } from 'lucide-react';
import { VehicleModel, VehicleType } from '@/stores/useBookingStore';

// Vehicle data with popular options
const VEHICLE_DATA = {
  bike: {
    makes: ['Honda', 'Yamaha', 'Bajaj', 'TVS', 'Hero', 'Royal Enfield', 'KTM', 'Suzuki'],
    models: {
      'Honda': ['Activa 6G', 'CB Shine', 'Dio', 'CB Hornet', 'CBR150R', 'CD 110 Dream'],
      'Yamaha': ['FZ-S', 'MT-15', 'R15 V4', 'Fascino', 'Ray ZR', 'FZ25'],
      'Bajaj': ['Pulsar 150', 'Platina', 'CT 100', 'Pulsar NS200', 'Dominar 400', 'Avenger'],
      'TVS': ['Apache RTR', 'Jupiter', 'XL100', 'Ntorq', 'Radeon', 'Sport'],
      'Hero': ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Glamour', 'Xtreme', 'Destini'],
      'Royal Enfield': ['Classic 350', 'Bullet 350', 'Himalayan', 'Interceptor 650', 'Meteor 350'],
      'KTM': ['Duke 200', 'Duke 390', 'RC 200', 'Adventure 390'],
      'Suzuki': ['Access 125', 'Gixxer', 'Intruder', 'Burgman Street']
    }
  },
  car: {
    makes: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'Honda', 'Ford', 'Kia'],
    models: {
      'Maruti Suzuki': ['Swift', 'Baleno', 'Alto K10', 'WagonR', 'Vitara Brezza', 'Dzire', 'Ertiga'],
      'Hyundai': ['i20', 'Creta', 'Verna', 'Grand i10 Nios', 'Venue', 'Elantra'],
      'Tata': ['Nexon', 'Harrier', 'Tiago', 'Tigor', 'Safari', 'Punch'],
      'Mahindra': ['XUV700', 'Scorpio', 'Bolero', 'XUV300', 'Thar'],
      'Toyota': ['Innova Crysta', 'Fortuner', 'Glanza', 'Urban Cruiser', 'Camry'],
      'Honda': ['City', 'Amaze', 'WR-V', 'Jazz', 'Civic'],
      'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire'],
      'Kia': ['Seltos', 'Sonet', 'Carens', 'Carnival']
    }
  }
};

// Popular make chips for quick selection
const POPULAR_MAKES = {
  bike: ['Honda', 'Yamaha', 'Bajaj', 'TVS'],
  car: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Toyota']
};

interface VehicleModelPickerProps {
  vehicleType: VehicleType;
  value?: VehicleModel;
  onChange: (model: VehicleModel) => void;
  onContinue: () => void;
}

export function VehicleModelPicker({ vehicleType, value, onChange, onContinue }: VehicleModelPickerProps) {
  const [selectedMake, setSelectedMake] = useState(value?.make || '');
  const [selectedModel, setSelectedModel] = useState(value?.model || '');
  const [selectedVariant, setSelectedVariant] = useState(value?.variant || '');

  const vehicleData = VEHICLE_DATA[vehicleType];
  const popularMakes = POPULAR_MAKES[vehicleType];
  const availableModels = selectedMake ? vehicleData.models[selectedMake] || [] : [];

  // Update parent when selections change
  useEffect(() => {
    if (selectedMake && selectedModel) {
      onChange({
        make: selectedMake,
        model: selectedModel,
        variant: selectedVariant || undefined
      });
    }
  }, [selectedMake, selectedModel, selectedVariant, onChange]);

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(''); // Reset model when make changes
    setSelectedVariant(''); // Reset variant when make changes
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setSelectedVariant(''); // Reset variant when model changes
  };

  const canContinue = selectedMake && selectedModel;

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {vehicleType === 'bike' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
            Select Your {vehicleType === 'bike' ? 'Bike' : 'Car'} Model
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Make Selection - Popular Chips */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              Popular Brands
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {popularMakes.map((make) => (
                <motion.button
                  key={make}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMakeSelect(make)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    selectedMake === make
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 border-transparent text-white'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                  data-testid={`chip-make-${make.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {make}
                </motion.button>
              ))}
            </div>
            
            {/* Full Make Dropdown */}
            <Select value={selectedMake} onValueChange={handleMakeSelect}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-make">
                <SelectValue placeholder={`Select ${vehicleType === 'bike' ? 'bike' : 'car'} brand`} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {vehicleData.makes.map((make) => (
                  <SelectItem 
                    key={make} 
                    value={make}
                    className="text-white hover:bg-gray-700"
                    data-testid={`option-make-${make.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          {selectedMake && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Model
              </label>
              <Select value={selectedModel} onValueChange={handleModelSelect}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
                  {availableModels.map((model) => (
                    <SelectItem 
                      key={model} 
                      value={model}
                      className="text-white hover:bg-gray-700"
                      data-testid={`option-model-${model.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Variant Selection (Optional) */}
          {selectedModel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Variant <span className="text-gray-500">(Optional)</span>
              </label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-variant">
                  <SelectValue placeholder="Select variant (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="base" className="text-white hover:bg-gray-700">Base</SelectItem>
                  <SelectItem value="mid" className="text-white hover:bg-gray-700">Mid</SelectItem>
                  <SelectItem value="top" className="text-white hover:bg-gray-700">Top</SelectItem>
                  <SelectItem value="deluxe" className="text-white hover:bg-gray-700">Deluxe</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Selected Summary */}
          {canContinue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Selected Vehicle</p>
                  <p className="text-gray-300 text-sm">
                    {selectedMake} {selectedModel} {selectedVariant ? `(${selectedVariant})` : ''}
                  </p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  ✓ Confirmed
                </Badge>
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            disabled={!canContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-continue-model"
          >
            <span>Continue to Details</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}