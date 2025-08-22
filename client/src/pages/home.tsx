import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ServiceCard } from '@/components/ServiceCard';
import { FAQ } from '@/components/FAQ';
import { motion } from 'framer-motion';
import { servicePackages } from '@/data/services';

export default function Home() {
  const bikeServices = servicePackages.filter(s => s.vehicleType === 'bike');
  const carServices = servicePackages.filter(s => s.vehicleType === 'car');

  return (
    <div className="min-h-screen">
      <Hero />
      <TrustBar />
      
      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional vehicle maintenance and repair services delivered right to your doorstep with transparent pricing.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Bike Services */}
            <ServiceCard
              id={bikeServices[0].id}
              name="Bike Services"
              vehicleType="bike"
              description="Complete bike maintenance and repair"
              basePrice={299}
              features={['Oil Change', 'Brake Service', 'Chain Cleaning', 'Tire Check']}
              icon="fas fa-motorcycle"
              gradient="bg-gradient-to-br from-primary-500 to-green-600"
            />

            {/* Car Services */}
            <ServiceCard
              id={carServices[0].id}
              name="Car Services" 
              vehicleType="car"
              description="Professional car care and maintenance"
              basePrice={599}
              features={['Engine Service', 'AC Service', 'Brake Repair', 'Battery Check']}
              icon="fas fa-car"
              gradient="bg-gradient-to-br from-blue-500 to-purple-600"
            />
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
