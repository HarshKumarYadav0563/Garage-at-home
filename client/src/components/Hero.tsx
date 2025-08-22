import { motion } from 'framer-motion';
import { MapPin, Star, Users, Clock, Car, Bike, Wrench, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { getCurrentLocation } from '@/lib/geo';
import { useUiStore } from '@/stores/useUiStore';

export function Hero() {
  const { addToast } = useUiStore();

  const handleUseLocation = async () => {
    try {
      const location = await getCurrentLocation();
      addToast({
        type: 'success',
        title: 'Location detected',
        message: `Searching for mechanics near you...`
      });
      // In production, this would redirect to booking with location pre-filled
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Location access denied',
        message: 'Please allow location access or enter your address manually'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-[60vh] lg:min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 pt-20 lg:pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.15) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Professional{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent block">
                Vehicle Service
              </span>
              at Your Doorstep
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Expert mechanics come to you. Transparent pricing, real-time tracking, and
              guaranteed quality service for bikes and cars.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <Button
                onClick={handleUseLocation}
                className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
                data-testid="button-use-location"
              >
                <MapPin className="mr-2" />
                Use My Location
              </Button>
              
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
                  data-testid="button-view-services"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400 w-4 h-4" />
                <span data-testid="text-rating">4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-primary-500 w-4 h-4" />
                <span data-testid="text-customers">10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-500 w-4 h-4" />
                <span data-testid="text-service-time">Same Day Service</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Icons */}
          <div className="hidden lg:block relative h-96">
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute top-0 right-0 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              style={{ animationDelay: '0s' }}
            >
              <Car className="text-4xl text-blue-600 w-12 h-12" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute top-20 left-10 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              style={{ animationDelay: '-2s' }}
            >
              <Bike className="text-3xl text-primary-600 w-10 h-10" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute bottom-0 right-16 w-28 h-28 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
              style={{ animationDelay: '-4s' }}
            >
              <Wrench className="text-4xl text-white w-12 h-12" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute bottom-16 left-0 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              style={{ animationDelay: '-1s' }}
            >
              <Settings className="text-2xl text-orange-500 w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
