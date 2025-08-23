import { motion, useReducedMotion } from 'framer-motion';
import { Home, UserCheck, DollarSign, MapPin, Shield, Zap, CheckCircle, Rocket } from 'lucide-react';
import { Link } from 'wouter';

export function WhyChooseGarageAtHome() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const iconFloatAnimation = shouldReduceMotion ? {} : {
    y: [0, -8, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const gradientLineVariants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: {
        delay: 0.5,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      title: "True Doorstep Service",
      description: "No need to visit garages. Our mechanics come fully equipped to your location with all tools and parts.",
      icon: Home,
      gradient: "from-emerald-400 to-sky-500",
      glowColor: "emerald",
      shadowGlow: "shadow-[0_0_40px_rgba(34,197,94,0.4)]"
    },
    {
      title: "Professional Mechanics",
      description: "Trained, uniformed professionals with verified experience and background checks for your safety.",
      icon: UserCheck,
      gradient: "from-sky-400 to-indigo-500",
      glowColor: "sky",
      shadowGlow: "shadow-[0_0_40px_rgba(56,189,248,0.4)]"
    },
    {
      title: "Transparent Pricing",
      description: "Upfront, fixed pricing with no hidden charges. What you see is what you pay.",
      icon: DollarSign,
      gradient: "from-amber-400 to-orange-500",
      glowColor: "amber",
      shadowGlow: "shadow-[0_0_40px_rgba(245,158,11,0.4)]"
    },
    {
      title: "Real-time Tracking",
      description: "Track your service progress live, from booking confirmation to completion with photo updates.",
      icon: MapPin,
      gradient: "from-violet-400 to-purple-500",
      glowColor: "violet",
      shadowGlow: "shadow-[0_0_40px_rgba(139,92,246,0.4)]"
    },
    {
      title: "Quality Guarantee",
      description: "30-day warranty on all services with satisfaction guarantee or money back.",
      icon: Shield,
      gradient: "from-teal-400 to-cyan-500",
      glowColor: "teal",
      shadowGlow: "shadow-[0_0_40px_rgba(20,184,166,0.4)]"
    },
    {
      title: "Same Day Service",
      description: "Book and get service the same day. Emergency services available 24/7 across all cities.",
      icon: Zap,
      gradient: "from-pink-400 to-rose-500",
      glowColor: "pink",
      shadowGlow: "shadow-[0_0_40px_rgba(244,114,182,0.4)]"
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Why Choose Garage At Home
          </motion.h2>
          
          {/* Enhanced Gradient Divider Line */}
          <motion.div
            className="relative h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-500 rounded-full mx-auto mb-6 overflow-hidden"
            style={{ width: '120px' }}
            variants={gradientLineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Animated sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Unlike traditional garage visits, we bring premium service to your doorstep
          </motion.p>
        </motion.div>

        {/* Features Grid - Desktop & Tablet */}
        <div className="hidden sm:block">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`group relative h-full`}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.05,
                    y: -8,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }}
                  data-testid={`feature-card-${index}`}
                >
                  {/* Premium Glassmorphism Card */}
                  <div className={`relative h-full rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:bg-white/8 group-hover:border-white/20 flex flex-col justify-between overflow-hidden`}>
                    
                    {/* Glow Effect on Hover */}
                    <motion.div 
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.shadowGlow}`}
                      style={{
                        background: `radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)`
                      }}
                    />
                    
                    <div className="relative z-10">
                      {/* Floating Icon */}
                      <div className="relative mb-6">
                        <motion.div 
                          className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                          animate={shouldReduceMotion ? {} : iconFloatAnimation}
                          style={{ animationDelay: `${index * 0.3}s` }}
                          whileHover={shouldReduceMotion ? {} : {
                            rotate: 10,
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 15 }
                          }}
                        >
                          <IconComponent 
                            className="w-8 h-8 md:w-10 md:h-10 text-white" 
                            aria-hidden="true"
                          />
                          
                          {/* Enhanced Glow Ring */}
                          <motion.div 
                            className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg scale-125"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-4 group-hover:text-gray-100 transition-colors">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Enhanced Background Glow */}
                    <motion.div 
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} pointer-events-none blur-xl`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="block sm:hidden">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group relative min-w-[280px] snap-center"
                  data-testid={`feature-card-mobile-${index}`}
                >
                  <div className={`relative h-full rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden`}>
                    
                    <div className="relative z-10">
                      <div className="relative mb-6">
                        <motion.div 
                          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                          animate={shouldReduceMotion ? {} : iconFloatAnimation}
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          <IconComponent 
                            className="w-8 h-8 text-white" 
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Trusted by 25,000+ customers</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <Link href="/services">
              <motion.div
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="book-service-cta"
              >
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                <span>Book your service now</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}