import { motion } from 'framer-motion';
import { MapPin, Star, Users, Clock, Car, Bike, Wrench, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { getCurrentLocation } from '@/lib/geo';
import { useUiStore } from '@/stores/useUiStore';
import heroImage from '@assets/generated_images/Professional_motorcycle_service_scene_46bd446f.png';

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const floatingVariants = {
    floating: {
      y: [-5, 5, -5],
      x: [-3, 3, -3],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-[45vh] sm:min-h-[50vh] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-16 sm:pt-18 lg:pt-20">
      {/* Radial Accent Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: Stacked Layout */}
        <div className="block lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4"
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold leading-tight text-white"
            >
              India's First{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
                Premium Doorstep
              </span>{' '}
              Vehicle Service
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-gray-400 leading-relaxed px-4"
            >
              Skip the garage visits! Professional mechanics come to your location with all tools & parts.
            </motion.p>

            {/* CTAs - Side by Side */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 justify-center px-4"
            >
              <Link href="/book" className="flex-1">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300"
                    data-testid="button-book-now"
                  >
                    <Zap className="mr-2 w-4 h-4" />
                    Book Now
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={handleUseLocation}
                  variant="outline"
                  className="w-full bg-white/5 border border-white/10 text-gray-200 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                  data-testid="button-use-location"
                >
                  <MapPin className="mr-2 w-4 h-4" />
                  Location
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Row - Glass Pills */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-xs"
            >
              <div className="flex items-center space-x-1 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Star className="text-yellow-400 w-3 h-3" />
                <span className="font-medium">4.9/5</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Users className="text-emerald-400 w-3 h-3" />
                <span className="font-medium">25,000+</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Clock className="text-sky-400 w-3 h-3" />
                <span className="font-medium">2 Hours</span>
              </div>
            </motion.div>

            {/* Small Image */}
            <motion.div
              variants={imageVariants}
              className="relative mx-auto max-w-sm"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10">
                <img
                  src={heroImage}
                  alt="Professional vehicle service"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Small Floating Icons with Bright Gradients and Glow */}
              <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-lg shadow-[0_0_12px_rgba(56,189,248,0.4)] flex items-center justify-center"
              >
                <Car className="text-white w-4 h-4" />
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.4)] flex items-center justify-center"
                style={{ animationDelay: '-3s' }}
              >
                <Wrench className="text-white w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop: Two-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Heading - Max 2 lines */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white"
            >
              India's First{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
                Premium Doorstep
              </span>{' '}
              Vehicle Service
            </motion.h1>

            {/* Shorter Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              Skip the garage visits! Professional mechanics come to your location with all tools & parts. Available in Mumbai, Delhi, Bangalore & 12 more cities.
            </motion.p>

            {/* CTAs Side by Side with Staggered Animation */}
            <motion.div
              variants={containerVariants}
              className="flex gap-4 mb-8"
            >
              <Link href="/book">
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all duration-300"
                    data-testid="button-book-now"
                  >
                    <Zap className="mr-2 w-5 h-5" />
                    Book Service Now
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleUseLocation}
                  variant="outline"
                  className="bg-white/5 border border-white/10 text-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
                  data-testid="button-use-location"
                >
                  <MapPin className="mr-2 w-5 h-5" />
                  Use My Location
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badges - Glass Pills */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 text-sm"
            >
              <div className="flex items-center space-x-2 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Star className="text-yellow-400 w-4 h-4" />
                <span className="font-medium" data-testid="text-rating">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Users className="text-emerald-400 w-4 h-4" />
                <span className="font-medium" data-testid="text-customers">25,000+ Services</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 text-gray-300 border border-white/10 rounded-full px-3 py-1">
                <Clock className="text-sky-400 w-4 h-4" />
                <span className="font-medium" data-testid="text-service-time">2 Hour Service</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image - Limited Width with Enhanced Floating Icons */}
          <motion.div
            variants={imageVariants}
            className="relative max-w-lg ml-auto"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
              <img
                src={heroImage}
                alt="Professional vehicle service"
                className="w-full h-auto object-cover max-h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Enhanced Floating Icons with Bright Gradients and Glow */}
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-2xl shadow-[0_0_12px_rgba(56,189,248,0.5)] flex items-center justify-center"
            >
              <Car className="text-white w-6 h-6" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute top-1/4 -left-4 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-[0_0_12px_rgba(16,185,129,0.5)] flex items-center justify-center"
              style={{ animationDelay: '-4s' }}
            >
              <Bike className="text-white w-5 h-5" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute -bottom-4 left-1/4 w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-[0_0_12px_rgba(251,146,60,0.5)] flex items-center justify-center"
              style={{ animationDelay: '-2s' }}
            >
              <Wrench className="text-white w-5 h-5" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute bottom-1/3 -right-3 w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl shadow-[0_0_12px_rgba(139,92,246,0.5)] flex items-center justify-center"
              style={{ animationDelay: '-6s' }}
            >
              <Zap className="text-white w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}