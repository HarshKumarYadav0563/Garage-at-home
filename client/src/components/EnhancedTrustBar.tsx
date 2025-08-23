import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Users, Clock, Shield, Award, Zap } from 'lucide-react';

const trustItems = [
  {
    icon: Star,
    value: "4.9/5",
    label: "Customer Rating",
    color: "from-yellow-400 to-orange-500",
    delay: 0
  },
  {
    icon: Users,
    value: "25,000+",
    label: "Happy Customers",
    color: "from-emerald-400 to-teal-600",
    delay: 0.1
  },
  {
    icon: Clock,
    value: "2 Hours",
    label: "Average Service Time",
    color: "from-blue-400 to-indigo-600",
    delay: 0.2
  },
  {
    icon: Shield,
    value: "100%",
    label: "Service Guarantee",
    color: "from-purple-400 to-pink-600",
    delay: 0.3
  },
  {
    icon: Award,
    value: "15+",
    label: "Cities Covered",
    color: "from-rose-400 to-red-600",
    delay: 0.4
  },
  {
    icon: Zap,
    value: "500+",
    label: "Expert Mechanics",
    color: "from-cyan-400 to-blue-600",
    delay: 0.5
  }
];

export function EnhancedTrustBar() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconFloat = {
    float: {
      y: [-3, 3, -3],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-6 md:py-12 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-2 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 blur-sm"
          animate={{
            x: [-100, 100, -100],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-sm"
          animate={{
            x: [100, -100, 100],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        {/* Desktop: Animated placeholder that transforms into badges */}
        <div className="hidden lg:block">
          {!isVisible ? (
            // Placeholder animation before scroll
            <motion.div
              className="grid grid-cols-6 gap-6"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`placeholder-${index}`}
                  className="text-center"
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  {/* Animated circle placeholder */}
                  <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-700/50 to-gray-600/50 flex items-center justify-center mb-4 border border-white/10">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400/30 to-blue-400/30"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Animated text placeholders */}
                  <motion.div
                    className="h-6 bg-gradient-to-r from-gray-600/40 to-gray-500/40 rounded mb-2"
                    animate={{
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                  />
                  <motion.div
                    className="h-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 rounded"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Actual badges after scroll
            <motion.div
              className="grid grid-cols-6 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {trustItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group text-center"
                  >
                    <div className="relative">
                      {/* Icon container with glow effect */}
                      <div
                        className={`relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-4 border border-white/20`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Value */}
                      <div className="text-3xl font-bold text-white mb-2">
                        {item.value}
                      </div>

                      {/* Label */}
                      <p className="text-sm text-gray-300 font-medium">
                        {item.label}
                      </p>

                      {/* Underline */}
                      <div className={`mx-auto mt-2 h-0.5 w-1/2 bg-gradient-to-r ${item.color} rounded-full`} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Mobile: Always show badges - 3 columns, 2 rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-4 lg:hidden"
        >
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : {
                  y: -5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="group text-center"
              >
                <div className="relative">
                  {/* Icon container with glow effect - Compact mobile design */}
                  <motion.div
                    className={`relative mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg sm:shadow-xl mb-2 sm:mb-3 md:mb-4 border border-white/20`}
                    variants={shouldReduceMotion ? {} : iconFloat}
                    animate="float"
                    style={{ animationDelay: `${item.delay}s` }}
                    whileHover={shouldReduceMotion ? {} : {
                      rotate: [0, 5, -5, 0],
                      scale: 1.1
                    }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    
                    {/* Hover glow ring */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md scale-110"
                      variants={shouldReduceMotion ? {} : pulseVariants}
                      animate="pulse"
                    />
                    
                    {/* Spinning ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100"
                      animate={shouldReduceMotion ? {} : {
                        rotate: [0, 360],
                        transition: { duration: 3, repeat: Infinity, ease: "linear" }
                      }}
                    />
                  </motion.div>

                  {/* Value with counter animation - Compact mobile typography */}
                  <motion.div
                    className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: item.delay + 0.3, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                  >
                    {item.value}
                  </motion.div>

                  {/* Label - Compact mobile text */}
                  <motion.p
                    className="text-xs sm:text-xs md:text-sm text-gray-300 font-medium leading-tight px-1 sm:px-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.5 }}
                  >
                    {item.label}
                  </motion.p>

                  {/* Animated underline - Thinner on mobile */}
                  <motion.div
                    className={`mx-auto mt-1 sm:mt-2 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.7, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom accent line - Compact mobile */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-12 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full mx-auto max-w-48 sm:max-w-md"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.2 }}
        />
      </div>
    </section>
  );
}