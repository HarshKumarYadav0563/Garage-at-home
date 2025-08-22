import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, TrendingUp, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['/api/admin/leads'],
  });

  const { data: mechanics = [], isLoading: mechanicsLoading } = useQuery({
    queryKey: ['/api/admin/mechanics'],
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      on_the_way: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status?.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const stats = [
    {
      title: 'Total Leads',
      value: Array.isArray(leads) ? leads.length : 0,
      icon: Users,
      color: 'text-blue-600',
      change: '+12%'
    },
    {
      title: 'Completed',
      value: Array.isArray(leads) ? leads.filter((lead: any) => lead.status === 'completed').length : 0,
      icon: CheckCircle,
      color: 'text-green-600',
      change: '+8%'
    },
    {
      title: 'In Progress',
      value: Array.isArray(leads) ? leads.filter((lead: any) => ['in_progress', 'on_the_way', 'assigned'].includes(lead.status)).length : 0,
      icon: Clock,
      color: 'text-orange-600',
      change: 'Active'
    },
    {
      title: 'Active Mechanics',
      value: Array.isArray(mechanics) ? mechanics.filter((mechanic: any) => mechanic.isActive).length : 0,
      icon: TrendingUp,
      color: 'text-primary-600',
      change: 'Online'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage leads and mechanics across all service areas</p>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold" data-testid={`stat-${index}`}>
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
              </CardHeader>
              <CardContent>
                {leadsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Array.isArray(leads) && leads.slice(0, 10).map((lead: any) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium" data-testid={`lead-tracking-${lead.id}`}>
                              {lead.trackingId}
                            </span>
                            {getStatusBadge(lead.status)}
                          </div>
                          <p className="text-sm text-gray-600" data-testid={`lead-customer-${lead.id}`}>
                            {lead.customerName} • {lead.customerPhone}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lead.vehicleType} service • {lead.vehicleBrand} {lead.vehicleModel}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium" data-testid={`lead-amount-${lead.id}`}>
                            {lead.totalAmount ? `₹${lead.totalAmount}` : '-'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Mechanics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Active Mechanics</CardTitle>
              </CardHeader>
              <CardContent>
                {mechanicsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Array.isArray(mechanics) && mechanics.filter((mechanic: any) => mechanic.isActive).map((mechanic: any) => (
                      <div
                        key={mechanic.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {mechanic.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium" data-testid={`mechanic-name-${mechanic.id}`}>
                              {mechanic.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {mechanic.city} • {mechanic.ratingAvg}⭐ • {mechanic.jobsDone} jobs
                            </p>
                            <p className="text-xs text-gray-500">
                              Skills: {mechanic.skills.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col" variant="outline" data-testid="button-export-leads">
                  <Users className="w-6 h-6 mb-2" />
                  Export Leads
                </Button>
                <Button className="h-20 flex flex-col" variant="outline" data-testid="button-add-mechanic">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  Add Mechanic
                </Button>
                <Button className="h-20 flex flex-col" variant="outline" data-testid="button-send-notifications">
                  <Mail className="w-6 h-6 mb-2" />
                  Send Notifications
                </Button>
                <Button className="h-20 flex flex-col" variant="outline" data-testid="button-view-analytics">
                  <CheckCircle className="w-6 h-6 mb-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
