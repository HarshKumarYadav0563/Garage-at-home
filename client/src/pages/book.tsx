import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Car, Bike, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Stepper } from '@/components/Stepper';
import { SelectField } from '@/components/forms/SelectField';
import { TextField } from '@/components/forms/TextField';
import { PhoneField } from '@/components/forms/PhoneField';
import { AddressPicker } from '@/components/forms/AddressPicker';
import { SlotPicker } from '@/components/forms/SlotPicker';
import { MechanicCard } from '@/components/MechanicCard';
import { useBookingStore } from '@/stores/useBookingStore';
import { useUiStore } from '@/stores/useUiStore';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Link, useLocation } from 'wouter';

const steps = ['Vehicle', 'Service', 'Location', 'Time', 'Details'];

export default function Book() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const booking = useBookingStore();
  const { addToast } = useUiStore();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');

  // Fetch services based on vehicle type
  const { data: services = [] } = useQuery({
    queryKey: booking.vehicleType ? [`/api/services/${booking.vehicleType}`] : ['/api/services'],
    enabled: !!booking.vehicleType,
  });

  // Search mechanics
  const { data: mechanics = [], refetch: searchMechanics } = useQuery({
    queryKey: ['/api/mechanics/search'],
    enabled: false,
  });

  const createLeadMutation = useMutation({
    mutationFn: async (leadData: any) => {
      const response = await apiRequest('POST', '/api/leads', leadData);
      return response.json();
    },
    onSuccess: (data) => {
      addToast({
        type: 'success',
        title: 'Booking Confirmed!',
        message: `Your tracking ID is ${data.trackingId}`
      });
      setLocation(`/track/${data.trackingId}`);
      booking.reset();
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Booking Failed',
        message: 'Please try again or contact support'
      });
    },
  });

  const handleNext = async () => {
    if (currentStep === 3 && booking.lat && booking.lng) {
      // Search for mechanics
      try {
        const response = await apiRequest('POST', '/api/mechanics/search', {
          lat: booking.lat,
          lng: booking.lng,
          vehicleType: booking.vehicleType,
          serviceId: selectedServiceId,
        });
        const mechanicsData = await response.json();
        queryClient.setQueryData(['/api/mechanics/search'], mechanicsData);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Search Failed',
          message: 'Could not find mechanics in your area'
        });
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const leadData = {
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      address: booking.address,
      lat: booking.lat,
      lng: booking.lng,
      vehicleType: booking.vehicleType,
      vehicleBrand: booking.vehicleBrand,
      vehicleModel: booking.vehicleModel,
      serviceId: selectedServiceId,
      mechanicId: booking.selectedMechanicId,
      slotStart: booking.slotStart,
      slotEnd: booking.slotEnd,
    };

    createLeadMutation.mutate(leadData);
  };

  const brands = {
    bike: [
      { value: 'honda', label: 'Honda' },
      { value: 'hero', label: 'Hero' },
      { value: 'bajaj', label: 'Bajaj' },
      { value: 'tvs', label: 'TVS' },
    ],
    car: [
      { value: 'maruti', label: 'Maruti Suzuki' },
      { value: 'hyundai', label: 'Hyundai' },
      { value: 'tata', label: 'Tata' },
      { value: 'mahindra', label: 'Mahindra' },
    ],
  };

  const models = {
    honda: ['Activa 6G', 'Activa 125', 'Dio', 'CB Shine'],
    hero: ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Maestro Edge'],
    bajaj: ['Pulsar 150', 'Pulsar NS200', 'CT100', 'Chetak'],
    tvs: ['Jupiter', 'Apache RTR 160', 'XL100', 'NTORQ 125'],
    maruti: ['Swift', 'Baleno', 'Alto K10', 'Wagon R'],
    hyundai: ['i20', 'Creta', 'Verna', 'Grand i10 NIOS'],
    tata: ['Nexon', 'Harrier', 'Altroz', 'Tiago'],
    mahindra: ['XUV700', 'Scorpio N', 'Bolero', 'Thar'],
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return booking.vehicleType && selectedBrand && selectedModel;
      case 2:
        return selectedServiceId;
      case 3:
        return booking.address && booking.lat && booking.lng;
      case 4:
        return booking.slotStart && booking.slotEnd && booking.selectedMechanicId;
      case 5:
        return booking.customerName && booking.customerPhone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Book Your Service</h1>
          <p className="text-gray-600">Simple 5-step process to get your vehicle serviced</p>
        </motion.div>

        <Stepper currentStep={currentStep} steps={steps} />

        <Card className="mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Vehicle Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Select Your Vehicle</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        booking.vehicleType === 'bike'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-400 hover:bg-primary-25'
                      }`}
                      onClick={() => booking.setVehicle('bike', '', '')}
                      data-testid="vehicle-type-bike"
                    >
                      <div className="text-center">
                        <Bike className="mx-auto text-4xl text-primary-600 mb-4 w-12 h-12" />
                        <h4 className="text-lg font-semibold mb-2">Bike/Scooter</h4>
                        <p className="text-gray-600 text-sm">2-Wheeler Services</p>
                      </div>
                    </div>
                    
                    <div
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        booking.vehicleType === 'car'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-25'
                      }`}
                      onClick={() => booking.setVehicle('car', '', '')}
                      data-testid="vehicle-type-car"
                    >
                      <div className="text-center">
                        <Car className="mx-auto text-4xl text-blue-600 mb-4 w-12 h-12" />
                        <h4 className="text-lg font-semibold mb-2">Car</h4>
                        <p className="text-gray-600 text-sm">4-Wheeler Services</p>
                      </div>
                    </div>
                  </div>

                  {booking.vehicleType && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectField
                        id="brand"
                        label="Brand"
                        placeholder="Select Brand"
                        options={brands[booking.vehicleType] || []}
                        value={selectedBrand}
                        onValueChange={(value) => {
                          setSelectedBrand(value);
                          setSelectedModel('');
                          booking.setVehicle(booking.vehicleType!, value, '');
                        }}
                        required
                      />
                      
                      {selectedBrand && (
                        <SelectField
                          id="model"
                          label="Model"
                          placeholder="Select Model"
                          options={(models[selectedBrand as keyof typeof models] || []).map(model => ({
                            value: model.toLowerCase().replace(/\s+/g, '-'),
                            label: model
                          }))}
                          value={selectedModel}
                          onValueChange={(value) => {
                            setSelectedModel(value);
                            const modelName = (models[selectedBrand as keyof typeof models] || [])
                              .find(m => m.toLowerCase().replace(/\s+/g, '-') === value) || '';
                            booking.setVehicle(booking.vehicleType!, selectedBrand, modelName);
                          }}
                          required
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Service Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Select Service</h3>
                  
                  <div className="grid gap-4">
                    {services?.map((service: any) => (
                      <div
                        key={service.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedServiceId === service.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-400'
                        }`}
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          booking.setService(service.id, service.name);
                        }}
                        data-testid={`service-option-${service.id}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary-600">
                              ₹{service.basePrice}
                            </div>
                            <div className="text-sm text-gray-500">{service.duration} mins</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Your Location</h3>
                  
                  <AddressPicker
                    id="address"
                    label="Service Address"
                    placeholder="Enter your complete address"
                    onLocationSelect={(address, lat, lng) => {
                      booking.setLocation(address, lat, lng);
                    }}
                    required
                  />
                </motion.div>
              )}

              {/* Step 4: Mechanic & Time Selection */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Available Mechanics</h3>
                  
                  {mechanics && mechanics.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {mechanics.map((mechanic: any) => (
                        <MechanicCard
                          key={mechanic.id}
                          id={mechanic.id}
                          name={mechanic.name}
                          rating={parseFloat(mechanic.ratingAvg)}
                          jobsDone={mechanic.jobsDone}
                          distance={mechanic.distance}
                          nextSlot={mechanic.nextSlots[0] ? new Date(mechanic.nextSlots[0]).toLocaleDateString() : 'Not available'}
                          skills={mechanic.skills}
                          onSelect={(mechanicId) => booking.setSelectedMechanic(mechanicId)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Searching for available mechanics in your area...</p>
                    </div>
                  )}

                  {booking.selectedMechanicId && (
                    <div className="border-t pt-8">
                      <SlotPicker
                        id="timeslot"
                        label="Select Time Slot"
                        onSlotSelect={(start, end) => booking.setTimeSlot(start, end)}
                        selectedSlot={booking.slotStart && booking.slotEnd ? 
                          { start: booking.slotStart, end: booking.slotEnd } : null
                        }
                        required
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 5: Customer Details */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Your Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                      id="customerName"
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={booking.customerName}
                      onChange={(e) => booking.setCustomerDetails(e.target.value, booking.customerPhone)}
                      required
                    />
                    
                    <PhoneField
                      id="customerPhone"
                      label="Phone Number"
                      value={booking.customerPhone}
                      onChange={(e) => booking.setCustomerDetails(booking.customerName, e.target.value)}
                      required
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold mb-4">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span className="font-medium">
                          {booking.vehicleBrand} {booking.vehicleModel} ({booking.vehicleType})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium">{booking.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Address:</span>
                        <span className="font-medium">{booking.address}</span>
                      </div>
                      {booking.slotStart && (
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">
                            {booking.slotStart.toLocaleDateString()} at {booking.slotStart.toLocaleTimeString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-6 py-2 rounded-xl"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white font-semibold"
                data-testid="button-next"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || createLeadMutation.isPending}
                className="px-8 py-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
                data-testid="button-submit"
              >
                {createLeadMutation.isPending ? 'Booking...' : 'Confirm Booking'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
