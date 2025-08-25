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
      title: "On-Site Service Delivery",
      description: "Professional technicians arrive at your location with comprehensive tools and genuine parts for efficient service completion.",
      icon: Home
    },
    {
      title: "Certified Technicians",
      description: "Fully trained and certified professionals with verified credentials and extensive experience in vehicle maintenance.",
      icon: UserCheck
    },
    {
      title: "Transparent Pricing",
      description: "Fixed upfront pricing with detailed breakdowns and no hidden charges, ensuring complete cost transparency.",
      icon: DollarSign
    },
    {
      title: "Service Tracking",
      description: "Real-time progress monitoring from initial booking through service completion with regular status updates.",
      icon: MapPin
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive 30-day warranty coverage with satisfaction guarantee and quality-backed service standards.",
      icon: Shield
    },
    {
      title: "Flexible Scheduling",
      description: "Same-day service availability with convenient appointment scheduling to fit your timeline and preferences.",
      icon: Zap
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden bg-gray-900">
      {/* Simple background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
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
            Why Choose Our Services
          </motion.h2>
          
          <motion.div
            className="h-1 bg-emerald-500 rounded-full mx-auto mb-6"
            style={{ width: '120px' }}
            variants={gradientLineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Professional vehicle services delivered with quality, transparency, and convenience
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