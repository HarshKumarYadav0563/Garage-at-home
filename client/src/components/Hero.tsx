import { motion } from 'framer-motion';
import { MapPin, Star, Users, Clock, Car, Bike, Wrench, Settings, Zap, Shield, CheckCircle } from 'lucide-react';
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
    <section className="relative min-h-[70vh] sm:min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-primary-50 dark:from-gray-900 dark:via-blue-950 dark:to-primary-950 pt-20 sm:pt-28 lg:pt-36">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>

      {/* Floating Particles - Fewer on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 sm:w-2 sm:h-2 bg-primary-400 rounded-full opacity-30 ${
              i > 8 ? 'hidden sm:block' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs - Smaller on mobile */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-primary-400/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center min-h-[calc(70vh-5rem)] sm:min-h-[calc(85vh-7rem)] lg:min-h-[calc(100vh-9rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6"
            >
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                India's First
              </motion.span>{' '}
              <motion.span 
                className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Premium Doorstep
              </motion.span>
              <motion.span 
                className="block sm:inline"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {' '}Vehicle Service
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed"
            >
              Skip the garage visits! Professional mechanics come to your location with all tools & parts. 
              <span className="font-semibold text-gray-800 dark:text-gray-200 block mt-2 text-base sm:text-lg">Available in Mumbai, Delhi, Bangalore & 12 more cities</span>
              <span className="text-sm sm:text-lg text-primary-600 dark:text-primary-400 block mt-2 space-x-1">
                <span className="inline-block">✓ Transparent pricing</span>
                <span className="inline-block">✓ Real-time tracking</span>
                <span className="inline-block">✓ Quality guarantee</span>
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8 justify-center lg:justify-start"
            >
              <Link href="/book" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                      "0 20px 40px rgba(59, 130, 246, 0.4)",
                      "0 10px 30px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-primary-500 via-blue-600 to-purple-600 hover:from-primary-600 hover:via-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[44px] sm:min-h-[48px] touch-manipulation relative overflow-hidden group"
                    data-testid="button-book-now"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    Book Service Now
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </Button>
                </motion.div>
              </Link>
              
              <Button
                onClick={handleUseLocation}
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl font-semibold text-sm sm:text-base lg:text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-200 min-h-[44px] sm:min-h-[48px] touch-manipulation"
                data-testid="button-use-location"
              >
                <MapPin className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Use My Location
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600"
            >
              <div className="flex items-center space-x-2 bg-white/50 px-3 py-2 rounded-lg">
                <Star className="text-yellow-400 w-4 h-4" />
                <span data-testid="text-rating" className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 px-3 py-2 rounded-lg">
                <Users className="text-primary-500 w-4 h-4" />
                <span data-testid="text-customers" className="font-medium">25,000+ Services</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 px-3 py-2 rounded-lg">
                <Clock className="text-blue-500 w-4 h-4" />
                <span data-testid="text-service-time" className="font-medium">2 Hour Service</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
            className="relative mt-4 lg:mt-0"
          >
            {/* Main Hero Image */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 2
              }}
              transition={{ duration: 0.3 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <motion.img
                src={heroImage}
                alt="Professional vehicle service"
                className="w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-none"
                animate={{
                  filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Image Overlay with Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating Service Icons - Smaller on mobile, some hidden */}
            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
            >
              <Car className="text-white w-5 h-5 sm:w-8 sm:h-8" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="hidden sm:flex absolute top-1/4 -left-2 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl shadow-xl items-center justify-center"
              style={{ animationDelay: '-2s' }}
              whileHover={{ scale: 1.1, rotate: -180 }}
            >
              <Bike className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute bottom-1/4 -right-3 sm:-right-6 w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center"
              style={{ animationDelay: '-4s' }}
              whileHover={{ scale: 1.1, rotate: 360 }}
            >
              <CheckCircle className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="absolute -bottom-2 left-1/4 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center"
              style={{ animationDelay: '-1s' }}
              whileHover={{ scale: 1.1, rotate: 270 }}
            >
              <Wrench className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="floating"
              className="hidden lg:flex absolute top-3/4 -left-2 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl items-center justify-center"
              style={{ animationDelay: '-3s' }}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <Shield className="text-white w-5 h-5" />
            </motion.div>

            {/* Animated Rings */}
            <motion.div
              className="absolute inset-0 border-2 border-primary-400/30 rounded-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 border border-blue-400/20 rounded-3xl"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
