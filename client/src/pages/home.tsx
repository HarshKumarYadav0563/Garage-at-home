import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ServiceCard } from '@/components/ServiceCard';
import { FAQ } from '@/components/FAQ';
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
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 dark:text-gray-100">How GarageWala Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get premium vehicle service at your doorstep in 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Book Online",
                description: "Choose your vehicle type, service needed, and preferred time slot",
                icon: "📱",
                color: "from-blue-500 to-purple-600"
              },
              {
                step: "02", 
                title: "Get Confirmation",
                description: "Receive instant confirmation with mechanic details and tracking ID",
                icon: "✅",
                color: "from-green-500 to-blue-600"
              },
              {
                step: "03",
                title: "Mechanic Arrives",
                description: "Professional mechanic comes to your location with all required tools",
                icon: "🔧",
                color: "from-orange-500 to-red-600"
              },
              {
                step: "04",
                title: "Service Complete",
                description: "Quality service with warranty, transparent billing, and instant payment",
                icon: "⭐",
                color: "from-primary-500 to-green-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 mb-2">STEP {step.step}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-100">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-gray-100">Why Choose GarageWala</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Unlike traditional garage visits, we bring premium service to your doorstep
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "True Doorstep Service",
                description: "No need to visit garages. Our mechanics come fully equipped to your location with all tools and parts.",
                icon: "🏠",
                color: "bg-blue-500"
              },
              {
                title: "Professional Mechanics", 
                description: "Trained, uniformed professionals with verified experience and background checks for your safety.",
                icon: "👨‍🔧",
                color: "bg-primary-500"
              },
              {
                title: "Transparent Pricing",
                description: "Upfront, fixed pricing with no hidden charges. What you see is what you pay.",
                icon: "💰",
                color: "bg-green-500"
              },
              {
                title: "Real-time Tracking",
                description: "Track your service progress live, from booking confirmation to completion with photo updates.",
                icon: "📍",
                color: "bg-orange-500"
              },
              {
                title: "Quality Guarantee", 
                description: "30-day warranty on all services with satisfaction guarantee or money back.",
                icon: "🛡️",
                color: "bg-purple-500"
              },
              {
                title: "Same Day Service",
                description: "Book and get service the same day. Emergency services available 24/7 across all cities.",
                icon: "⚡",
                color: "bg-red-500"
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${advantage.color} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{advantage.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 dark:text-gray-100">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional vehicle maintenance and repair services delivered right to your doorstep with transparent pricing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
