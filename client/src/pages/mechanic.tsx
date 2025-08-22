import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Mechanic() {
  // In production, this would be based on logged-in mechanic
  const mechanicId = 'mech_001';
  
  const { data: leads = [] } = useQuery({
    queryKey: ['/api/admin/leads'],
  });

  const { data: mechanics = [] } = useQuery({
    queryKey: ['/api/admin/mechanics'],
  });

  const mechanic = Array.isArray(mechanics) ? mechanics.find((m: any) => m.id === mechanicId) : null;
  const assignedLeads = Array.isArray(leads) ? leads.filter((lead: any) => lead.mechanicId === mechanicId) : [];

  const todayLeads = assignedLeads?.filter((lead: any) => {
    const today = new Date().toDateString();
    return new Date(lead.createdAt).toDateString() === today;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'on_the_way':
        return <MapPin className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      assigned: 'bg-purple-100 text-purple-800',
      on_the_way: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status?.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (!mechanic) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mechanic Dashboard</h1>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {mechanic.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="mechanic-name">
                Welcome, {mechanic.name}
              </h1>
              <p className="text-gray-600">
                {mechanic.city} • {mechanic.ratingAvg}⭐ Rating • {mechanic.jobsDone} Jobs Completed
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600" data-testid="today-jobs">
                  {todayLeads?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Today's Jobs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600" data-testid="completed-jobs">
                  {assignedLeads?.filter((l: any) => l.status === 'completed').length || 0}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600" data-testid="active-jobs">
                  {assignedLeads?.filter((l: any) => ['assigned', 'on_the_way', 'in_progress'].includes(l.status)).length || 0}
                </div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary-600" data-testid="total-earnings">
                  ₹{assignedLeads?.reduce((sum: number, lead: any) => sum + (parseFloat(lead.totalAmount) || 0), 0) || 0}
                </div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="today">Today's Jobs</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedLeads?.filter((lead: any) => 
                      ['assigned', 'on_the_way', 'in_progress'].includes(lead.status)
                    ).map((lead: any) => (
                      <div
                        key={lead.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium" data-testid={`active-lead-${lead.id}`}>
                                {lead.trackingId}
                              </span>
                              {getStatusBadge(lead.status)}
                            </div>
                            <h4 className="font-semibold">{lead.customerName}</h4>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {lead.customerPhone}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{lead.totalAmount || 'TBD'}</p>
                            <p className="text-xs text-gray-500">
                              {lead.vehicleType} service
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 flex items-start">
                            <MapPin className="w-3 h-3 mr-1 mt-0.5" />
                            {lead.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            Vehicle: {lead.vehicleBrand} {lead.vehicleModel}
                          </p>
                          {lead.slotStart && (
                            <p className="text-sm text-gray-600 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(lead.slotStart).toLocaleString()}
                            </p>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3 mr-1" />
                            Call Customer
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="w-3 h-3 mr-1" />
                            Navigate
                          </Button>
                          {lead.status === 'assigned' && (
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                              Start Journey
                            </Button>
                          )}
                          {lead.status === 'on_the_way' && (
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                              Start Work
                            </Button>
                          )}
                          {lead.status === 'in_progress' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Complete Job
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {assignedLeads?.filter((lead: any) => 
                      ['assigned', 'on_the_way', 'in_progress'].includes(lead.status)
                    ).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No active jobs at the moment
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="today" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayLeads?.map((lead: any) => (
                      <div
                        key={lead.id}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(lead.status)}
                          <div>
                            <h4 className="font-medium">{lead.customerName}</h4>
                            <p className="text-sm text-gray-600">
                              {lead.vehicleType} • {lead.trackingId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{lead.totalAmount || 'TBD'}</p>
                          {lead.slotStart && (
                            <p className="text-xs text-gray-500">
                              {new Date(lead.slotStart).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {(todayLeads?.length || 0) === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No jobs scheduled for today
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Completed Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignedLeads?.filter((lead: any) => lead.status === 'completed')
                      .slice(0, 10)
                      .map((lead: any) => (
                      <div
                        key={lead.id}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">{lead.customerName}</h4>
                            <p className="text-sm text-gray-600">
                              {lead.vehicleType} • {lead.trackingId}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(lead.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">₹{lead.totalAmount || 'N/A'}</p>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      </div>
                    ))}
                    
                    {assignedLeads?.filter((lead: any) => lead.status === 'completed').length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No completed jobs yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mechanic.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline">
                        {skill.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Service Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service Radius:</span>
                      <span>{mechanic.serviceRadiusKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{mechanic.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={mechanic.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {mechanic.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
