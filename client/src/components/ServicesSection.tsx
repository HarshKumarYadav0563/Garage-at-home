import { motion, useReducedMotion } from 'framer-motion';
import { BookingServiceCard } from '@/components/ServiceCard';
import { servicePackages } from '@/data/services';
import { Bike, Car, Wrench, Shield, Clock, Star, ArrowRight, Check } from 'lucide-react';
import { Link } from 'wouter';

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const bikeServices = servicePackages.filter(s => s.vehicleType === 'bike');
  const carServices = servicePackages.filter(s => s.vehicleType === 'car');

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
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
        damping: 15
      }
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

  const iconFloatAnimation = shouldReduceMotion ? {} : {
    y: [0, -6, 0],
    rotate: [0, 3, 0, -3, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const services = [
    {
      title: "Premium Bike Services",
      description: "Complete motorcycle and scooter maintenance with professional care",
      icon: Bike,
      gradient: "from-emerald-400 to-teal-500",
      priceFrom: "₹499",
      originalPrice: "₹699", 
      features: [
        "Engine Oil & Filter Change",
        "Chain Lubrication & Adjustment", 
        "Brake System Inspection",
        "Tire Pressure Check",
        "Battery Terminal Cleaning",
        "Basic Electrical Check",
        "FREE Doorstep Service"
      ],
      popular: true,
      glowColor: "emerald"
    },
    {
      title: "Premium Car Services", 
      description: "Professional automotive care with certified mechanics", 
      icon: Car,
      gradient: "from-blue-400 to-indigo-500",
      priceFrom: "₹1,399",
      originalPrice: "₹1,799",
      features: [
        "Engine Oil & Filter Change",
        "Brake Fluid Check",
        "Battery Inspection", 
        "Tire Pressure & Tread Check",
        "Lights & Indicators Test",
        "Fluid Level Checks",
        "FREE Doorstep Service"
      ],
      popular: false,
      glowColor: "blue"
    },
    {
      title: "Roadside Assistance",
      description: "24/7 emergency roadside help for bikes and cars",
      icon: Wrench,
      gradient: "from-orange-400 to-red-500", 
      priceFrom: "₹499",
      originalPrice: "₹799",
      priceNote: "Cars: ₹1,099",
      features: [
        "24/7 Emergency Support",
        "Flat Tire Assistance", 
        "Battery Jump Start",
        "Emergency Towing",
        "Fuel Delivery Service",
        "On-Spot Minor Repairs",
        "Instant Response Team"
      ],
      popular: false,
      glowColor: "orange"
    }
  ];

  return (
    <section 
      id="services" 
      className="relative py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 8 - 4, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Enhanced grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Premium Services
          </motion.h2>
          
          {/* Enhanced Gradient Divider Line */}
          <motion.div
            className="relative h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-500 rounded-full mx-auto mb-6 overflow-hidden"
            style={{ width: '140px' }}
            variants={gradientLineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Animated sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
            />
          </motion.div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Professional vehicle maintenance and repair services delivered right to your doorstep with transparent pricing and guaranteed satisfaction
          </motion.p>
        </motion.div>

        {/* Services Grid - Desktop */}
        <div className="hidden md:block mb-16">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative h-full"
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.03,
                  y: -6,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }
                }}
                data-testid={`service-card-${index}`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Premium Glassmorphism Card */}
                <div className={`relative h-full rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:bg-white/8 group-hover:border-white/20 flex flex-col overflow-hidden ${service.popular ? 'ring-2 ring-blue-500/30' : ''}`}>
                  
                  {/* Enhanced Glow Effect on Hover */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_50px_rgba(59,130,246,0.3)]`}
                    style={{
                      background: `radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)`
                    }}
                  />
                  
                  <div className="relative z-10 flex-1">
                    {/* Floating Icon */}
                    <div className="relative mb-6">
                      <motion.div 
                        className={`relative w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                        animate={shouldReduceMotion ? {} : iconFloatAnimation}
                        style={{ animationDelay: `${index * 0.4}s` }}
                        whileHover={shouldReduceMotion ? {} : {
                          rotate: 8,
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400, damping: 15 }
                        }}
                      >
                        <IconComponent 
                          className="w-9 h-9 md:w-10 md:h-10 text-white" 
                          aria-hidden="true"
                        />
                        
                        {/* Enhanced Glow Ring */}
                        <motion.div 
                          className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg scale-125"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {service.priceFrom}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {service.originalPrice}
                      </span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                        Save {Math.round((1 - parseInt(service.priceFrom.replace(/[₹,]/g, '')) / parseInt(service.originalPrice.replace(/[₹,]/g, ''))) * 100)}%
                      </span>
                    </div>
                    {service.priceNote && (
                      <p className="text-xs text-blue-400 mb-4">
                        {service.priceNote}
                      </p>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/services" className="relative z-10 mt-auto">
                    <motion.button
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group/btn flex items-center justify-center gap-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`book-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </Link>

                  {/* Enhanced Background Glow */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient} pointer-events-none blur-2xl`}
                  />
                </div>
              </motion.div>
            );
          })}
          </motion.div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="block md:hidden mb-16">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group relative min-w-[280px] snap-center"
                  data-testid={`service-card-mobile-${index}`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Compact Glassmorphism Card */}
                  <div className={`relative h-full rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col overflow-hidden ${service.popular ? 'ring-2 ring-emerald-500/30' : ''}`}>
                    
                    <div className="relative z-10 flex-1">
                      {/* Compact Floating Icon */}
                      <div className="relative mb-4">
                        <motion.div 
                          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                          animate={shouldReduceMotion ? {} : iconFloatAnimation}
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          <IconComponent 
                            className="w-7 h-7 text-white" 
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Compact Pricing */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-bold text-white">
                          {service.priceFrom}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {service.originalPrice}
                        </span>
                      </div>
                      
                      {service.priceNote && (
                        <p className="text-xs text-blue-400 mb-3">
                          {service.priceNote}
                        </p>
                      )}

                      {/* Compact Features List (first 4) */}
                      <div className="space-y-2 mb-5">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            </div>
                            <span className="text-xs text-gray-300">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <p className="text-xs text-gray-400">+{service.features.length - 4} more features</p>
                        )}
                      </div>
                    </div>

                    {/* Compact CTA Button */}
                    <Link href="/services" className="relative z-10 mt-auto">
                      <motion.button
                        className={`w-full bg-gradient-to-r ${service.gradient} text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 group/btn flex items-center justify-center gap-2 text-sm`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid={`book-${service.title.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-gray-400">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm md:text-base">All services backed by warranty</span>
              <div className="w-px h-5 bg-gray-600"></div>
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-sm md:text-base">Same-day service available</span>
            </div>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Need a different service? We offer custom maintenance packages for all vehicle types with flexible pricing options.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}