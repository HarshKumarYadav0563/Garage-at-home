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

  const headlineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1
      }
    },
  };

  const subtextVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const badgeVariants = {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 1.2
      }
    },
  };

  const secondaryCtaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.5
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
    <section className="relative min-h-[70vh] xs:min-h-[75vh] sm:min-h-[80vh] lg:min-h-auto flex items-start justify-center overflow-hidden pt-4 xs:pt-6 sm:pt-8 lg:pt-8 lg:pb-12">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-violet-950/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-950/10 to-transparent" />
      </div>
      
      {/* Enhanced glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-teal-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/4 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          }}
        />
      </div>
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-8 w-8 h-8 text-emerald-500/20"
        >
          <Wrench className="w-full h-full" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-32 right-12 w-6 h-6 text-violet-500/20"
        >
          <Zap className="w-full h-full" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [-8, 8, -8],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-6 w-7 h-7 text-teal-500/20"
        >
          <Car className="w-full h-full" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: Responsive Layout */}
        <div className="block lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center px-3 sm:px-4 py-3 space-y-3 sm:space-y-4 w-full max-w-md mx-auto"
          >
            {/* 1. Headline - Above Image */}
            <motion.h1
              variants={headlineVariants}
              className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white tracking-tight w-full px-2 relative z-20"
            >
              Doorstep Vehicle Service in Delhi NCR
            </motion.h1>

            {/* 2. Subtext - Above Image */}
            <motion.p
              variants={subtextVariants}
              className="text-sm sm:text-base text-gray-300 leading-snug font-normal w-full px-2 relative z-20"
            >
              Certified mechanics with genuine parts and transparent pricing.
            </motion.p>

            {/* 3. Hero Image - Below Text */}
            <motion.div
              variants={imageVariants}
              className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] mt-3"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Professional vehicle service"
                  className="w-full h-[140px] xs:h-[150px] sm:h-[160px] md:h-[180px] object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-950 to-transparent" />
              </div>
              
              {/* Floating Service Icons */}
              <motion.div
                variants={floatingVariants}
                animate="float1"
                className="absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-lg shadow-lg shadow-sky-500/50 flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Car className="text-white w-4 h-4" />
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="float2"
                className="absolute top-1/4 -left-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg shadow-lg shadow-emerald-500/50 flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Bike className="text-white w-3.5 h-3.5" />
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="float3"
                className="absolute -bottom-2 right-1/4 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-lg shadow-orange-500/50 flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Wrench className="text-white w-3.5 h-3.5" />
              </motion.div>
            </motion.div>

            {/* 4. Trust Badges - Staggered Animation */}
            <motion.div
              variants={badgeContainerVariants}
              className="overflow-x-auto scrollbar-hide pb-1 mt-3 sm:mt-4"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-2 mx-auto justify-center">
                <motion.div
                  variants={badgeVariants}
                  className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-400/50 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm shadow-lg"
                >
                  <Star className="text-emerald-300 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="font-bold text-white text-xs sm:text-sm">4.9</span>
                </motion.div>
                <motion.div
                  variants={badgeVariants}
                  className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm shadow-lg"
                >
                  <Users className="text-blue-300 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="font-bold text-white text-xs sm:text-sm">25K+</span>
                </motion.div>
                <motion.div
                  variants={badgeVariants}
                  className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-violet-500/30 to-purple-500/30 border border-violet-400/50 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm shadow-lg"
                >
                  <Zap className="text-violet-300 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="font-bold text-white text-xs sm:text-sm">Same Day</span>
                </motion.div>
              </div>
            </motion.div>

            {/* 5. Primary CTA Button */}
            <motion.div
              variants={buttonVariants}
              className="px-3 sm:px-4 pt-3 sm:pt-4"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.4)",
                    "0 0 30px rgba(20, 184, 166, 0.5)", 
                    "0 0 25px rgba(56, 189, 248, 0.4)",
                    "0 0 20px rgba(16, 185, 129, 0.4)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="rounded-xl"
              >
                <Button
                  onClick={() => setLocation('/services')}
                  className="w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 hover:from-emerald-700 hover:via-teal-600 hover:to-sky-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl transition-all duration-300 cursor-pointer relative z-10 border border-emerald-300/40"
                  data-testid="button-book-now"
                >
                  <Wrench className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Schedule Service
                </Button>
              </motion.div>
            </motion.div>

            {/* 6. Secondary CTA - Learn More */}
            <motion.div
              variants={secondaryCtaVariants}
              className="flex items-center justify-center gap-2 text-gray-300 hover:text-emerald-300 transition-colors cursor-pointer pb-2 sm:pb-3 relative z-30"
              onClick={handleHowItWorks}
              data-testid="button-how-it-works"
            >
              <span className="text-xs sm:text-sm font-medium underline decoration-dotted underline-offset-4 text-gray-300">Learn More</span>
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
              variants={headlineVariants}
              className="text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white tracking-tight"
            >
              Professional Vehicle Services{' '}
              <span className="text-emerald-400">
                At Your Doorstep
              </span>
            </motion.h1>

            {/* Shorter Subheading */}
            <motion.p
              variants={subtextVariants}
              className="text-xl text-gray-300 mb-8 leading-relaxed font-medium"
            >
              Certified technicians deliver comprehensive vehicle maintenance and repair services directly to your location across Delhi NCR.
            </motion.p>

            {/* CTAs Side by Side with Staggered Animation */}
            <motion.div
              variants={containerVariants}
              className="flex gap-4 mb-8"
            >
              <motion.div variants={buttonVariants}>
                <Button
                  onClick={() => setLocation('/services')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-all duration-300 cursor-pointer relative z-10"
                  data-testid="button-book-now"
                >
                  <Wrench className="mr-2 w-5 h-5" />
                  Schedule Service
                </Button>
              </motion.div>
              
              <motion.div variants={secondaryCtaVariants}>
                <Button
                  onClick={handleHowItWorks}
                  variant="outline"
                  className="bg-transparent border-2 border-gray-500 text-gray-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 hover:border-gray-400 hover:text-white transition-all duration-300 cursor-pointer relative z-30"
                  data-testid="button-how-it-works"
                >
                  <HelpCircle className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Badges - Glass Pills */}
            <motion.div
              variants={badgeContainerVariants}
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
              animate="float1"
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-2xl shadow-[0_0_12px_rgba(56,189,248,0.5)] flex items-center justify-center"
            >
              <Car className="text-white w-6 h-6" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="float2"
              className="absolute top-1/4 -left-4 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-[0_0_12px_rgba(16,185,129,0.5)] flex items-center justify-center"
            >
              <Bike className="text-white w-5 h-5" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="float3"
              className="absolute -bottom-4 left-1/4 w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-[0_0_12px_rgba(251,146,60,0.5)] flex items-center justify-center"
            >
              <Wrench className="text-white w-5 h-5" />
            </motion.div>
            
            <motion.div
              variants={floatingVariants}
              animate="float1"
              className="absolute bottom-1/3 -right-3 w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl shadow-[0_0_12px_rgba(139,92,246,0.5)] flex items-center justify-center"
            >
              <Zap className="text-white w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}