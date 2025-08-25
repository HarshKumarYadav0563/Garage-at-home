import { motion } from 'framer-motion';
import { Star, Users, Clock, Shield, Award, Zap, CheckCircle, MapPin } from 'lucide-react';

const trustMetrics = [
  {
    icon: Star,
    value: "4.9/5",
    label: "Customer Rating",
    color: "text-yellow-600"
  },
  {
    icon: Users,
    value: "25,000+",
    label: "Happy Customers",
    color: "text-emerald-600"
  },
  {
    icon: Clock,
    value: "2 Hours",
    label: "Avg Service Time",
    color: "text-blue-600"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Service Guarantee",
    color: "text-purple-600"
  },
  {
    icon: MapPin,
    value: "15+",
    label: "Cities Covered",
    color: "text-rose-600"
  },
  {
    icon: Zap,
    value: "500+",
    label: "Expert Mechanics",
    color: "text-indigo-600"
  }
];

export function CorporateTrustBar() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join over 25,000 satisfied customers who trust us with their vehicle maintenance needs
          </p>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4 ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 py-8 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium">ISO 9001 Certified</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium">Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}