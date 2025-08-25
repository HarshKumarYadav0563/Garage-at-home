import { motion } from 'framer-motion';
import { HelpCircle, Star, Users, Clock, Car, Bike, Wrench, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { useUiStore } from '@/stores/useUiStore';
import heroImage from '@assets/generated_images/Professional_motorcycle_service_scene_46bd446f.png';

export function Hero() {
  const { addToast } = useUiStore();
  const [, setLocation] = useLocation();

  const handleHowItWorks = () => {
    setLocation('/how-it-works');
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
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-auto flex items-center overflow-hidden bg-gray-950 pt-20 sm:pt-24 lg:pt-8 lg:pb-12">
      {/* Subtle Corporate Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
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
            className="text-center space-y-6 sm:space-y-8 px-2"
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight"
            >
              Professional Vehicle Services{' '}
              <span className="text-emerald-400">
                At Your Doorstep
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-300 leading-relaxed px-4 max-w-lg mx-auto font-medium"
            >
              Certified technicians deliver comprehensive vehicle maintenance and repair services directly to your location across Delhi NCR.
            </motion.p>

            {/* CTAs - Side by Side */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-sm sm:max-w-md mx-auto"
            >
              <div className="w-full sm:flex-1">
                <Button
                  onClick={() => setLocation('/services')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-lg font-semibold text-base shadow-lg transition-all duration-300 cursor-pointer relative z-10"
                  data-testid="button-book-now"
                >
                  <Wrench className="mr-2 w-5 h-5" />
                  Schedule Service
                </Button>
              </div>
              
              <div className="w-full sm:flex-1">
                <Button
                  onClick={handleHowItWorks}
                  variant="outline"
                  className="w-full bg-transparent border border-gray-600 text-gray-200 px-6 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 cursor-pointer relative z-10"
                  data-testid="button-how-it-works"
                >
                  <HelpCircle className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Trust Row - Glass Pills */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 sm:gap-3 text-xs flex-wrap"
            >
              <div className="flex items-center space-x-1 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-2">
                <Star className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white">4.9</span>
                <span className="text-gray-400 text-xs">Rating</span>
              </div>
              <div className="flex items-center space-x-1 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-2">
                <Users className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white">25,000+</span>
                <span className="text-gray-400 text-xs">Customers</span>
              </div>
              <div className="flex items-center space-x-1 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-2">
                <Clock className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white">Same Day</span>
                <span className="text-gray-400 text-xs">Service</span>
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
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
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
              className="text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white tracking-tight"
            >
              Professional Vehicle Services{' '}
              <span className="text-emerald-400">
                At Your Doorstep
              </span>
            </motion.h1>

            {/* Shorter Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 leading-relaxed font-medium"
            >
              Certified technicians deliver comprehensive vehicle maintenance and repair services directly to your location across Delhi NCR.
            </motion.p>

            {/* CTAs Side by Side with Staggered Animation */}
            <motion.div
              variants={containerVariants}
              className="flex gap-4 mb-8"
            >
              <div>
                <Button
                  onClick={() => setLocation('/services')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-all duration-300 cursor-pointer relative z-10"
                  data-testid="button-book-now"
                >
                  <Wrench className="mr-2 w-5 h-5" />
                  Schedule Service
                </Button>
              </div>
              
              <div>
                <Button
                  onClick={handleHowItWorks}
                  variant="outline"
                  className="bg-transparent border border-gray-600 text-gray-200 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 cursor-pointer relative z-10"
                  data-testid="button-how-it-works"
                >
                  <HelpCircle className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Trust Badges - Glass Pills */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 text-sm"
            >
              <div className="flex items-center space-x-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-3">
                <Star className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white" data-testid="text-rating">4.9</span>
                <span className="text-gray-400 text-sm">Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-3">
                <Users className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white" data-testid="text-customers">25,000+</span>
                <span className="text-gray-400 text-sm">Customers</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg px-4 py-3">
                <Clock className="text-emerald-400 w-4 h-4" />
                <span className="font-semibold text-white" data-testid="text-service-time">Same Day</span>
                <span className="text-gray-400 text-sm">Service</span>
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