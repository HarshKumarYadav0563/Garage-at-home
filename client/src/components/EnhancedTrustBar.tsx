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
      y: [-4, 4, -4],
      rotate: [-3, 3, -3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.08, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-4 md:py-8 bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="float"
            transition={{
              delay: Math.random() * 4,
              duration: 3 + Math.random() * 2,
            }}
          />
        ))}
        
        {/* Morphing gradient waves */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(16,185,129,0.05) 0%, transparent 50%, rgba(59,130,246,0.05) 100%)',
              'linear-gradient(90deg, rgba(147,51,234,0.05) 0%, transparent 50%, rgba(236,72,153,0.05) 100%)',
              'linear-gradient(90deg, rgba(251,146,60,0.05) 0%, transparent 50%, rgba(34,197,94,0.05) 100%)',
              'linear-gradient(90deg, rgba(16,185,129,0.05) 0%, transparent 50%, rgba(59,130,246,0.05) 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Radial gradient pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/1 via-transparent to-transparent"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
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
                  key={`desktop-placeholder-${index}`}
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
                  {/* Animated circle placeholder - Smaller */}
                  <div className="relative mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-600/50 flex items-center justify-center mb-3 border border-white/10">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400/40 to-blue-400/40"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.3, 0.8],
                        background: [
                          'linear-gradient(45deg, rgba(16,185,129,0.4), rgba(59,130,246,0.4))',
                          'linear-gradient(45deg, rgba(147,51,234,0.4), rgba(236,72,153,0.4))',
                          'linear-gradient(45deg, rgba(251,146,60,0.4), rgba(34,197,94,0.4))',
                          'linear-gradient(45deg, rgba(16,185,129,0.4), rgba(59,130,246,0.4))'
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Magic sparkle effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.3
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
                      {/* Magical Icon container - Smaller with advanced effects */}
                      <motion.div
                        className={`relative mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg mb-3 border border-white/30 group-hover:shadow-2xl`}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, 5, -5, 0],
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        animate={{
                          boxShadow: [
                            "0 4px 15px rgba(0,0,0,0.2)",
                            "0 8px 25px rgba(0,0,0,0.3)", 
                            "0 4px 15px rgba(0,0,0,0.2)"
                          ]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        <IconComponent className="w-6 h-6 text-white relative z-10" />
                        
                        {/* Spinning magical ring */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-white/40"
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        {/* Inner glow pulse */}
                        <motion.div
                          className="absolute inset-1 rounded-lg bg-white/10"
                          animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [0.9, 1.1, 0.9]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                      </motion.div>

                      {/* Compact Value with counter effect */}
                      <motion.div 
                        className="text-2xl font-bold text-white mb-1"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(255,255,255,0.3)",
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 5px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.4
                        }}
                      >
                        {item.value}
                      </motion.div>

                      {/* Compact Label */}
                      <p className="text-xs text-gray-300 font-medium leading-tight">
                        {item.label}
                      </p>

                      {/* Animated magical underline */}
                      <motion.div
                        className={`mx-auto mt-1 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        whileHover={{ width: "80%" }}
                        animate={{
                          boxShadow: [
                            "0 0 5px rgba(255,255,255,0.3)",
                            "0 0 10px rgba(255,255,255,0.6)",
                            "0 0 5px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          width: { delay: index * 0.1, duration: 0.8 },
                          boxShadow: { duration: 2, repeat: Infinity, delay: index * 0.5 }
                        }}
                      />
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
                  {/* Magical icon container - Ultra compact mobile design */}
                  <motion.div
                    className={`relative mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg sm:shadow-xl mb-2 sm:mb-3 md:mb-4 border border-white/30 group-hover:shadow-2xl`}
                    variants={shouldReduceMotion ? {} : iconFloat}
                    animate="float"
                    style={{ animationDelay: `${item.delay}s` }}
                    whileHover={shouldReduceMotion ? {} : {
                      rotate: [0, 10, -10, 0],
                      scale: 1.15,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white relative z-10" />
                    
                    {/* Multi-layer magical effects */}
                    <motion.div 
                      className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/15 blur-sm"
                      variants={shouldReduceMotion ? {} : pulseVariants}
                      animate="pulse"
                    />
                    
                    {/* Counter-rotating rings */}
                    <motion.div
                      className="absolute inset-0 rounded-lg sm:rounded-xl border border-white/40"
                      animate={shouldReduceMotion ? {} : {
                        rotate: [0, 360],
                        transition: { duration: 6, repeat: Infinity, ease: "linear" }
                      }}
                    />
                    <motion.div
                      className="absolute inset-1 rounded-md sm:rounded-lg border border-white/20"
                      animate={shouldReduceMotion ? {} : {
                        rotate: [360, 0],
                        transition: { duration: 4, repeat: Infinity, ease: "linear" }
                      }}
                    />
                    
                    {/* Sparkle particles on hover */}
                    {[...Array(3)].map((_, sparkleIndex) => (
                      <motion.div
                        key={sparkleIndex}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          left: `${20 + sparkleIndex * 25}%`,
                          top: `${15 + sparkleIndex * 15}%`,
                        }}
                        animate={shouldReduceMotion ? {} : {
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: sparkleIndex * 0.3
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Magical value with glowing counter animation */}
                  <motion.div
                    className="text-base sm:text-lg md:text-2xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 15px rgba(255,255,255,0.8)"
                    }}
                    animate={{
                      textShadow: [
                        "0 0 3px rgba(255,255,255,0.3)",
                        "0 0 8px rgba(255,255,255,0.6)",
                        "0 0 3px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{
                      scale: { delay: item.delay + 0.3, type: "spring", stiffness: 300 },
                      textShadow: { duration: 2.5, repeat: Infinity, delay: index * 0.4 }
                    }}
                  >
                    {item.value}
                  </motion.div>

                  {/* Ultra compact label with shimmer effect */}
                  <motion.div
                    className="text-xs sm:text-xs md:text-sm text-gray-300 font-medium leading-tight px-1 sm:px-0 relative overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.5 }}
                  >
                    <div>{item.label}</div>
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5 + 2,
                        repeatDelay: 4
                      }}
                    />
                  </motion.div>

                  {/* Magical morphing underline */}
                  <motion.div
                    className={`mx-auto mt-1 sm:mt-2 h-0.5 bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    whileHover={{ width: "80%" }}
                    viewport={{ once: true }}
                    animate={{
                      background: [
                        `linear-gradient(90deg, ${item.color.includes('yellow') ? '#fbbf24' : '#10b981'}, ${item.color.includes('blue') ? '#3b82f6' : '#8b5cf6'})`,
                        `linear-gradient(90deg, ${item.color.includes('purple') ? '#8b5cf6' : '#ec4899'}, ${item.color.includes('emerald') ? '#10b981' : '#f59e0b'})`,
                        `linear-gradient(90deg, ${item.color.includes('yellow') ? '#fbbf24' : '#10b981'}, ${item.color.includes('blue') ? '#3b82f6' : '#8b5cf6'})`
                      ],
                      boxShadow: [
                        "0 0 3px rgba(255,255,255,0.3)",
                        "0 0 8px rgba(255,255,255,0.6)",
                        "0 0 3px rgba(255,255,255,0.3)"
                      ]
                    }}
                    transition={{
                      width: { delay: item.delay + 0.7, duration: 0.8 },
                      background: { duration: 4, repeat: Infinity, delay: index * 0.6 },
                      boxShadow: { duration: 2.5, repeat: Infinity, delay: index * 0.3 }
                    }}
                  >
                    {/* Traveling light effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/40 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4 + 1,
                        repeatDelay: 3
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Magical bottom accent with flowing energy */}
        <motion.div
          className="mt-3 sm:mt-4 md:mt-8 relative mx-auto max-w-32 sm:max-w-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {/* Main flowing line */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            animate={{
              background: [
                'linear-gradient(90deg, transparent, #10b981, transparent)',
                'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                'linear-gradient(90deg, transparent, #10b981, transparent)'
              ]
            }}
            transition={{ 
              scaleX: { delay: 1.2, duration: 1.2 },
              background: { duration: 6, repeat: Infinity, delay: 2 }
            }}
          />
          
          {/* Traveling sparkles */}
          {[...Array(3)].map((_, sparkleIndex) => (
            <motion.div
              key={sparkleIndex}
              className="absolute top-0 w-1 h-1 bg-white rounded-full"
              animate={{
                x: ['-50%', '150%'],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: sparkleIndex * 0.8 + 2,
                repeatDelay: 2
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}