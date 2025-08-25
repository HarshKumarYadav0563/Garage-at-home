import { motion } from 'framer-motion';
import { Play, Star, Users, Clock, Car, Bike, Wrench, Zap, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { useUiStore } from '@/stores/useUiStore';
import heroImage from '@assets/generated_images/Professional_motorcycle_service_scene_46bd446f.png';

export function ProfessionalHero() {
  const { addToast } = useUiStore();
  const [, setLocation] = useLocation();

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white pt-32 pb-16 overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200"
            >
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 25,000+ Customers
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              India's Leading{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Doorstep Vehicle Service
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Professional mechanics come to your location with all tools and genuine parts. No garage visits, no waiting in queues.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {[
                { icon: CheckCircle, text: "2-Hour Service Window" },
                { icon: Shield, text: "100% Service Guarantee" },
                { icon: Star, text: "4.9/5 Customer Rating" },
                { icon: Zap, text: "Same-Day Availability" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <feature.icon className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => setLocation('/services')}
                className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="button-book-now"
              >
                <Zap className="mr-2 w-5 h-5" />
                Book Service Now
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setLocation('/how-it-works')}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg"
                data-testid="button-how-it-works"
              >
                <Play className="mr-2 w-5 h-5" />
                How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
              <img 
                src={heroImage} 
                alt="Professional doorstep vehicle service"
                className="w-full h-auto rounded-xl"
              />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">4.9</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">25K+</div>
                    <div className="text-xs text-gray-600">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">500+</div>
                    <div className="text-xs text-gray-600">Mechanics</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}