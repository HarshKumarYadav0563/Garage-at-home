import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Wrench,
  Car,
  Bike,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface TrackingData {
  id: string;
  trackingId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  address: string;
  vehicleType: string;
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  mechanic?: {
    name: string;
    phone: string;
    rating: number;
  };
  totalAmount: number;
  createdAt: string;
  estimatedArrival?: string;
}

const statusSteps = [
  { key: 'pending', label: 'Received', icon: CheckCircle, color: 'emerald' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'emerald' },
  { key: 'assigned', label: 'Assigned', icon: User, color: 'blue' },
  { key: 'on_the_way', label: 'On the way', icon: MapPin, color: 'yellow' },
  { key: 'in_progress', label: 'In progress', icon: Wrench, color: 'orange' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'green' }
];

export default function TrackPage() {
  const [, params] = useRoute('/track/:trackingId');
  const trackingId = params?.trackingId;

  const { data: trackingData, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/track', trackingId],
    queryFn: async () => {
      const response = await fetch(`/api/track/${trackingId}`);
      if (!response.ok) {
        throw new Error('Booking not found');
      }
      return response.json() as Promise<TrackingData>;
    },
    enabled: !!trackingId,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (!trackingId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Tracking ID</h1>
          <p className="text-gray-400">Please check your tracking ID and try again.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !trackingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-gray-400 mb-6">We couldn't find a booking with ID: {trackingId}</p>
          <Button 
            onClick={() => window.location.href = '/services'}
            className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600"
          >
            Book New Service
          </Button>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(step => step.key === trackingData.status);
  const VehicleIcon = trackingData.vehicleType === 'car' ? Car : Bike;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/services'}
            className="text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Book Another Service
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Track Your Service</h1>
              <p className="text-gray-400">Booking ID: {trackingData.trackingId}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-white/20 text-white hover:bg-white/10"
              data-testid="button-refresh"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Service Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const StepIcon = step.icon;
                  
                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isCompleted 
                          ? `bg-${step.color}-500/20 border-${step.color}-500` 
                          : 'bg-gray-700 border-gray-600'
                        } border-2 transition-colors
                      `}>
                        <StepIcon className={`
                          w-5 h-5 
                          ${isCompleted ? `text-${step.color}-400` : 'text-gray-400'}
                        `} />
                      </div>
                      
                      <div className="flex-1">
                        <p className={`
                          font-medium 
                          ${isCompleted ? 'text-white' : 'text-gray-400'}
                        `}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-gray-400 mt-1">
                            Current status
                          </p>
                        )}
                      </div>
                      
                      {isCurrent && (
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                          Current
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Service Summary */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <VehicleIcon className="w-5 h-5 mr-2 text-emerald-400" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Vehicle</p>
                  <p className="text-white capitalize">{trackingData.vehicleType}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Services</p>
                  <div className="space-y-1">
                    {trackingData.services.map(service => (
                      <p key={service.id} className="text-white text-sm">
                        {service.name} - ₹{service.price}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-2">
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-white font-bold">₹{trackingData.totalAmount.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Customer</p>
                  <p className="text-white">{trackingData.customerName}</p>
                  <p className="text-gray-400 text-sm">{trackingData.customerPhone}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Service Address</p>
                  <p className="text-white text-sm">{trackingData.address}</p>
                </div>
                
                {trackingData.mechanic && (
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-400 text-sm">Assigned Mechanic</p>
                    <p className="text-white">{trackingData.mechanic.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < trackingData.mechanic!.rating ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">
                        {trackingData.mechanic.rating}/5
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-white/20 text-white hover:bg-white/10"
                      data-testid="button-call-mechanic"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Mechanic
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}