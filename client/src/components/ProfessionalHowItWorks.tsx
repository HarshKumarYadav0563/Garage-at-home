import { motion } from 'framer-motion';
import { MapPin, UserCheck, Wrench, CheckCircle, Clock, Shield } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Book Your Service",
    description: "Select your vehicle, service type, and preferred time slot. We'll match you with the best mechanic in your area.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    number: "02", 
    icon: UserCheck,
    title: "Mechanic Assigned",
    description: "A certified mechanic is assigned to your job with all necessary tools and genuine parts for your vehicle.",
    color: "from-sky-500 to-sky-600"
  },
  {
    number: "03",
    icon: Wrench,
    title: "Doorstep Service",
    description: "Our mechanic arrives at your location and completes the service with professional tools and expertise.",
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Quality Assured",
    description: "Service completed with quality checks, warranty, and instant payment. Rate your experience.",
    color: "from-rose-500 to-rose-600"
  }
];

export function ProfessionalHowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get professional vehicle service at your doorstep in 4 simple steps
          </motion.p>
        </div>

        {/* Steps Grid - Mobile Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connection Line - Hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0" />
              )}
              
              {/* Step Card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Step Number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xl mb-4 mx-auto shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Doorstep Service?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their vehicle maintenance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center text-emerald-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">2-Hour Service Window</span>
              </div>
              <div className="flex items-center justify-center text-sky-600">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">100% Service Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}