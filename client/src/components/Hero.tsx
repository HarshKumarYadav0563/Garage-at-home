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
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6
      }
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
  };

  const floatingVariants = {
    float1: {
      y: [-8, 8, -8],
      x: [-4, 4, -4],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    float2: {
      y: [8, -8, 8],
      x: [4, -4, 4],
      rotate: [0, -5, 0, 5, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 1,
      },
    },
    float3: {
      y: [-6, 6, -6],
      x: [6, -6, 6],
      rotate: [0, 10, 0, -10, 0],
      transition: {
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 2,
      },
    },
  };

  return (
    <section className="relative min-h-[70vh] lg:min-h-auto flex items-center overflow-hidden pt-16 sm:pt-20 lg:pt-8 lg:pb-12">
      {/* Enhanced Gradient Background for Mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-violet-950/10" />
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/6 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: Compact Modern Layout */}
        <div className="block lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-3 px-3 py-4"
          >
            {/* Compact Heading - Max 2 Lines */}
            <motion.h1
              variants={titleVariants}
              className="text-xl sm:text-2xl font-bold leading-tight text-white tracking-tight max-w-[280px] mx-auto"
            >
              Professional Vehicle Services{' '}
              <span className="text-emerald-400 block">
                At Your Doorstep
              </span>
            </motion.h1>

            {/* Compact Image with Floating Icons */}
            <motion.div
              variants={imageVariants}
              className="relative mx-auto max-w-[280px] mb-4"
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img
                  src={heroImage}
                  alt="Professional vehicle service"
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating Service Icons */}
              <motion.div
                variants={floatingVariants}
                animate="float1"
                className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-xl shadow-lg shadow-sky-500/30 flex items-center justify-center backdrop-blur-sm"
              >
                <Car className="text-white w-5 h-5" />
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="float2"
                className="absolute top-1/3 -left-3 w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center backdrop-blur-sm"
              >
                <Bike className="text-white w-4 h-4" />
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="float3"
                className="absolute -bottom-3 right-1/4 w-11 h-11 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center backdrop-blur-sm"
              >
                <Wrench className="text-white w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Horizontal Scrollable Trust Badges */}
            <motion.div
              variants={badgeVariants}
              className="overflow-x-auto scrollbar-hide pb-2"
            >
              <div className="flex items-center gap-2 min-w-max px-4 mx-auto justify-center">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full px-3 py-2 backdrop-blur-sm">
                  <Star className="text-emerald-400 w-3.5 h-3.5" />
                  <span className="font-semibold text-white text-sm">4.9</span>
                  <span className="text-emerald-200 text-xs">Rating</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-3 py-2 backdrop-blur-sm">
                  <Users className="text-blue-400 w-3.5 h-3.5" />
                  <span className="font-semibold text-white text-sm">25K+</span>
                  <span className="text-blue-200 text-xs">Customers</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-full px-3 py-2 backdrop-blur-sm">
                  <Zap className="text-violet-400 w-3.5 h-3.5" />
                  <span className="font-semibold text-white text-sm">Same Day</span>
                  <span className="text-violet-200 text-xs">Service</span>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA Button */}
            <motion.div
              variants={buttonVariants}
              className="px-4"
            >
              <Button
                onClick={() => setLocation('/services')}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold text-base shadow-xl shadow-emerald-500/25 transition-all duration-300 cursor-pointer relative z-10 border border-emerald-400/20"
                data-testid="button-book-now"
              >
                <Wrench className="mr-2 w-5 h-5" />
                Schedule Service
              </Button>
            </motion.div>

            {/* Secondary CTA - Icon + Text */}
            <motion.div
              variants={buttonVariants}
              className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer py-2"
              onClick={handleHowItWorks}
              data-testid="button-how-it-works"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Learn How It Works</span>
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
              variants={titleVariants}
              className="text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white tracking-tight"
            >
              Professional Vehicle Services{' '}
              <span className="text-emerald-400">
                At Your Doorstep
              </span>
            </motion.h1>

            {/* Shorter Subheading */}
            <motion.p
              variants={titleVariants}
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
              variants={badgeVariants}
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