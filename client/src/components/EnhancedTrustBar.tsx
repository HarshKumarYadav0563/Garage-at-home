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
  }
];

export function EnhancedTrustBar() {
  const shouldReduceMotion = useReducedMotion();

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
    <section className="relative py-8 md:py-12 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
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
                  {/* Icon container with glow effect */}
                  <motion.div
                    className={`relative mx-auto w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-3 md:mb-4`}
                    variants={shouldReduceMotion ? {} : iconFloat}
                    animate="float"
                    style={{ animationDelay: `${item.delay}s` }}
                    whileHover={shouldReduceMotion ? {} : {
                      rotate: [0, 5, -5, 0],
                      scale: 1.1
                    }}
                  >
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    
                    {/* Hover glow ring */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md scale-110"
                      variants={shouldReduceMotion ? {} : pulseVariants}
                      animate="pulse"
                    />
                    
                    {/* Spinning ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100"
                      animate={shouldReduceMotion ? {} : {
                        rotate: [0, 360],
                        transition: { duration: 3, repeat: Infinity, ease: "linear" }
                      }}
                    />
                  </motion.div>

                  {/* Value with counter animation */}
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2"
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

                  {/* Label */}
                  <motion.p
                    className="text-xs md:text-sm text-gray-300 font-medium leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.5 }}
                  >
                    {item.label}
                  </motion.p>

                  {/* Animated underline */}
                  <motion.div
                    className={`mx-auto mt-2 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.7, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-8 md:mt-12 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full mx-auto max-w-md"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.2 }}
        />
      </div>
    </section>
  );
}