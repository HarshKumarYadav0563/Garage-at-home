import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Check, Clock, Truck, Wrench, Flag, Phone, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUiStore } from '@/stores/useUiStore';
import { apiRequest } from '@/lib/queryClient';

export default function Track() {
  const { trackingId: urlTrackingId } = useParams();
  const [inputTrackingId, setInputTrackingId] = useState(urlTrackingId || '');
  const [searchTrackingId, setSearchTrackingId] = useState(urlTrackingId || '');
  const { addToast } = useUiStore();

  const { data: trackingData, isLoading, error } = useQuery({
    queryKey: searchTrackingId ? [`/api/track/${searchTrackingId}`] : [],
    enabled: !!searchTrackingId,
  });

  useEffect(() => {
    if (urlTrackingId) {
      setInputTrackingId(urlTrackingId);
      setSearchTrackingId(urlTrackingId);
    }
  }, [urlTrackingId]);

  const handleSearch = () => {
    if (inputTrackingId.trim()) {
      setSearchTrackingId(inputTrackingId.trim());
    }
  };

  const copyTrackingId = () => {
    if (trackingData?.lead?.trackingId) {
      navigator.clipboard.writeText(trackingData.lead.trackingId);
      addToast({
        type: 'success',
        title: 'Copied!',
        message: 'Tracking ID copied to clipboard'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'pending':
        return <Check className="w-6 h-6" />;
      case 'assigned':
        return <Clock className="w-6 h-6" />;
      case 'on_the_way':
        return <Truck className="w-6 h-6" />;
      case 'in_progress':
        return <Wrench className="w-6 h-6" />;
      case 'completed':
        return <Flag className="w-6 h-6" />;
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string, isActive: boolean) => {
    if (!isActive) return 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
    
    switch (status) {
      case 'confirmed':
      case 'pending':
        return 'bg-green-500 dark:bg-green-600 text-white';
      case 'assigned':
        return 'bg-blue-500 dark:bg-blue-600 text-white animate-pulse';
      case 'on_the_way':
        return 'bg-blue-500 dark:bg-blue-600 text-white animate-pulse';
      case 'in_progress':
        return 'bg-orange-500 dark:bg-orange-600 text-white animate-pulse';
      case 'completed':
        return 'bg-green-500 dark:bg-green-600 text-white';
      default:
        return 'bg-gray-500 dark:bg-gray-600 text-white';
    }
  };

  const statusSteps = [
    { key: 'confirmed', label: 'Service Confirmed', message: 'Your booking has been confirmed' },
    { key: 'assigned', label: 'Mechanic Assigned', message: 'A mechanic has been assigned to your request' },
    { key: 'on_the_way', label: 'On The Way', message: 'Mechanic is heading to your location' },
    { key: 'in_progress', label: 'In Progress', message: 'Service work is being performed' },
    { key: 'completed', label: 'Completed', message: 'Service has been completed successfully' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-gray-100">Track Your Service</h1>
          <p className="text-gray-600 dark:text-gray-300">Enter your tracking ID to see real-time service updates</p>
        </motion.div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="trackingId" className="text-sm font-medium mb-2 block dark:text-gray-200">
                  Tracking ID
                </Label>
                <Input
                  id="trackingId"
                  placeholder="Enter tracking ID (e.g., GW12345678)"
                  value={inputTrackingId}
                  onChange={(e) => setInputTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="px-4 py-3 rounded-xl"
                  data-testid="input-tracking-id"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700"
                  data-testid="button-track-order"
                >
                  Track Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading tracking information...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-6 text-center">
              <div className="text-red-600 dark:text-red-400 mb-2">Tracking ID not found</div>
              <p className="text-gray-600 dark:text-gray-300">Please check your tracking ID and try again</p>
            </CardContent>
          </Card>
        )}

        {/* Tracking Information */}
        {trackingData && trackingData.lead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Tracking ID Display */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Tracking ID</h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-lg text-primary-600" data-testid="tracking-id-display">
                        {trackingData.lead.trackingId}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyTrackingId}
                        className="p-1"
                        data-testid="button-copy-tracking-id"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Status</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      trackingData.lead?.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                      trackingData.lead?.status === 'in_progress' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300' :
                      'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    }`} data-testid="current-status">
                      {trackingData.lead?.status?.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 dark:text-gray-100">Service Progress</h3>
                
                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const isCompleted = trackingData.statusUpdates?.some((update: any) => 
                      update.status === step.key
                    );
                    const isActive = trackingData.lead?.status === step.key;
                    const statusUpdate = trackingData.statusUpdates?.find((update: any) => 
                      update.status === step.key
                    );

                    return (
                      <div key={step.key} className="flex items-start">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 ${
                          getStatusColor(step.key, isCompleted || isActive)
                        }`}>
                          {getStatusIcon(step.key)}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold text-lg ${isActive ? 'text-primary-600 dark:text-primary-400' : 'dark:text-gray-100'}`}>
                            {step.label}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-1">
                            {statusUpdate?.message || step.message}
                          </p>
                          {statusUpdate?.timestamp && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(statusUpdate.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mechanic Information */}
            {trackingData?.mechanic && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Your Mechanic</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {trackingData.mechanic?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-gray-100" data-testid="mechanic-name">
                          {trackingData.mechanic?.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Rating: {trackingData.mechanic?.ratingAvg}/5 ⭐ | {trackingData.mechanic?.jobsDone}+ jobs completed
                        </p>
                      </div>
                    </div>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      data-testid="button-call-mechanic"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Service Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Vehicle:</span>
                    <span className="ml-2 font-medium dark:text-gray-100">
                      {trackingData.lead?.vehicleBrand} {trackingData.lead?.vehicleModel} ({trackingData.lead?.vehicleType})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Address:</span>
                    <span className="ml-2 font-medium dark:text-gray-100">{trackingData.lead?.address}</span>
                  </div>
                  {trackingData.lead?.slotStart && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Scheduled Time:</span>
                      <span className="ml-2 font-medium dark:text-gray-100">
                        {new Date(trackingData.lead?.slotStart).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {trackingData.lead?.totalAmount && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                      <span className="ml-2 font-medium dark:text-gray-100">₹{trackingData.lead?.totalAmount}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
