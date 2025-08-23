import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ServiceCard } from '@/components/ServiceCard';
import { FAQ } from '@/components/FAQ';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseGarageWala } from '@/components/WhyChooseGarageWala';
import { ServicesSection } from '@/components/ServicesSection';
import { motion } from 'framer-motion';
import { servicePackages } from '@/data/services';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Home() {
  const bikeServices = servicePackages.filter(s => s.vehicleType === 'bike');
  const carServices = servicePackages.filter(s => s.vehicleType === 'car');

  return (
    <div className="min-h-screen">
      <Hero />
      <TrustBar />
      <HowItWorks />

      <WhyChooseGarageWala />
      <ServicesSection />

      {/* Customer Testimonials */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">What Our Customers Say</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from customers who chose GarageWala over traditional garages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Rajesh Kumar",
                location: "Mumbai",
                rating: 5,
                review: "Amazing service! The mechanic came right to my office parking. Fixed my bike's brake issue in 30 minutes. Much better than wasting whole day at garage.",
                service: "Bike Brake Service"
              },
              {
                name: "Priya Sharma", 
                location: "Delhi",
                rating: 5,
                review: "Professional team with proper uniform and tools. Transparent pricing with no hidden charges. My car AC is working perfectly now!",
                service: "Car AC Service"
              },
              {
                name: "Arjun Patel",
                location: "Bangalore", 
                rating: 5,
                review: "Booked at 10 AM, mechanic arrived at 12 PM. Real-time tracking was excellent. Quality of service is far better than local garages.",
                service: "Engine Service"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg sm:text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base">"{testimonial.review}"</p>
                <div className="border-t pt-3 sm:pt-4">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{testimonial.location} • {testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <Link href="/book" className="inline-block w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200 min-h-[48px] touch-manipulation">
                Book Your Service Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
