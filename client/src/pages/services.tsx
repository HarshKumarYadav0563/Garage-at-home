import { motion } from 'framer-motion';
import { ServiceCard } from '@/components/ServiceCard';
import { servicePackages } from '@/data/services';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Services() {
  const [selectedType, setSelectedType] = useState<'all' | 'bike' | 'car'>('all');

  const filteredServices = servicePackages.filter(service => 
    selectedType === 'all' || service.vehicleType === selectedType
  );

  const gradients = {
    bike: 'bg-gradient-to-br from-primary-500 to-green-600',
    car: 'bg-gradient-to-br from-blue-500 to-purple-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional vehicle maintenance and repair services with transparent pricing and quality guarantee.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { key: 'all', label: 'All Services' },
              { key: 'bike', label: 'Bike Services' },
              { key: 'car', label: 'Car Services' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedType === filter.key ? 'default' : 'outline'}
                onClick={() => setSelectedType(filter.key as 'all' | 'bike' | 'car')}
                className="px-6 py-2 rounded-xl"
                data-testid={`filter-${filter.key}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              vehicleType={service.vehicleType}
              description={service.description}
              basePrice={service.basePrice}
              features={service.features}
              icon={service.icon}
              gradient={gradients[service.vehicleType]}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 bg-white rounded-2xl mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-gray-600 mb-8">Get expert vehicle service right at your doorstep</p>
          <Button
            className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg"
            data-testid="button-start-booking"
          >
            Start Booking
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
