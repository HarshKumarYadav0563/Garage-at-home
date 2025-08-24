import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Check, User, Wrench, Star } from 'lucide-react';

// Import premium illustrations
const bookingIllustration = '/attached_assets/generated_images/Premium_booking_app_illustration_08558233.png';
const confirmationIllustration = '/attached_assets/generated_images/Premium_confirmation_notification_illustration_26aa61f0.png';
const mechanicIllustration = '/attached_assets/generated_images/Premium_mechanic_arrival_illustration_a0b94ded.png';
const completionIllustration = '/attached_assets/generated_images/Premium_service_completion_illustration_af928bf6.png';

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const floatAnimation = shouldReduceMotion ? {} : {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  const dotVariants = {
    inactive: { 
      scale: 1, 
      opacity: 0.4,
      boxShadow: "0 0 0px rgba(34, 197, 94, 0.5)"
    },
    active: { 
      scale: 1.3, 
      opacity: 1,
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const steps = [
    {
      step: "01",
      title: "Book Online",
      description: "Choose vehicle type, service needed, and time slot",
      illustration: bookingIllustration,
      icon: User,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      glowColor: "emerald-500",
      direction: "left"
    },
    {
      step: "02", 
      title: "Get Confirmation",
      description: "Instant confirmation with mechanic details and tracking ID",
      illustration: confirmationIllustration,
      icon: Check,
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      glowColor: "cyan-500",
      direction: "right"
    },
    {
      step: "03",
      title: "Mechanic Arrives",
      description: "Professional mechanic comes to your location with tools",
      illustration: mechanicIllustration,
      icon: Wrench,
      gradient: "from-indigo-400 via-purple-500 to-pink-600",
      glowColor: "indigo-500",
      direction: "left"
    },
    {
      step: "04",
      title: "Service Complete",
      description: "Quality service with warranty, transparent billing & payment",
      illustration: completionIllustration,
      icon: Star,
      gradient: "from-pink-400 via-rose-500 to-orange-500",
      glowColor: "pink-500",
      direction: "right"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      aria-labelledby="how-heading" 
      className="relative px-4 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
        `
      }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            id="how-heading" 
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            How Garage At Home Works
          </motion.h2>
          
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience premium vehicle service at your doorstep in 4 seamless steps
          </motion.p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative">
          <motion.div 
            className="grid grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative"
                  data-testid={`step-card-${step.step}`}
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-center overflow-hidden"
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.05,
                      y: -10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    {/* Glow Effect */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                    />
                    
                    {/* Card Content */}
                    <div className="relative z-10">
                      {/* Floating Illustration */}
                      <motion.div
                        className="relative mb-6 flex justify-center"
                        animate={shouldReduceMotion ? {} : floatAnimation}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <div className="relative">
                          <img 
                            src={step.illustration}
                            alt={`${step.title} illustration`}
                            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                            loading="lazy"
                          />
                          <motion.div 
                            className={`absolute inset-0 bg-${step.glowColor} opacity-20 blur-xl rounded-full scale-125`}
                            animate={shouldReduceMotion ? {} : {
                              scale: [1.25, 1.5, 1.25],
                              opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Step Number with Icon */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-400">STEP {step.step}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed max-w-[200px] mx-auto">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Connecting Line with Gradient Sweep */}
          <motion.div
            className="absolute top-[60%] left-16 right-16 h-0.5 -translate-y-1/2 bg-slate-700/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full shadow-lg"
              style={{
                filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
              }}
              variants={lineVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            />
            
            {/* Step Indicator Dots */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 w-4 h-4 rounded-full -translate-y-1/2 border-2 border-slate-800 shadow-lg"
                style={{ 
                  left: `${(100 / (steps.length - 1)) * index}%`,
                  background: `linear-gradient(135deg, ${step.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => 
                    color === 'emerald-400' ? '#34d399' :
                    color === 'teal-500' ? '#14b8a6' :
                    color === 'cyan-600' ? '#0891b2' :
                    color === 'cyan-400' ? '#22d3ee' :
                    color === 'blue-500' ? '#3b82f6' :
                    color === 'indigo-600' ? '#4f46e5' :
                    color === 'indigo-400' ? '#818cf8' :
                    color === 'purple-500' ? '#a855f7' :
                    color === 'pink-600' ? '#db2777' :
                    color === 'pink-400' ? '#f472b6' :
                    color === 'rose-500' ? '#f43f5e' :
                    color === 'orange-500' ? '#f97316' : color
                  ).join(', ')})`,
                  boxShadow: "0 0 12px rgba(34, 197, 94, 0.6)"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  opacity: [0, 1, 0.9] 
                }}
                transition={{ 
                  delay: 1.5 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <motion.div 
            className="grid grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative"
                  data-testid={`step-card-${step.step}`}
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center overflow-hidden"
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.02,
                      y: -5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="relative mb-4 flex justify-center"
                        animate={shouldReduceMotion ? {} : floatAnimation}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <img 
                          src={step.illustration}
                          alt={`${step.title} illustration`}
                          className="w-28 h-28 object-contain drop-shadow-xl"
                          loading="lazy"
                        />
                      </motion.div>
                      
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}>
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-400">STEP {step.step}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-6 top-16 bottom-16 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500 rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 2 }}
            />
            
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLeft = step.direction === "left";
              
              return (
                <motion.div
                  key={index}
                  className="relative mb-12 last:mb-0"
                  initial={{ 
                    opacity: 0, 
                    x: isLeft ? -50 : 50,
                    y: 30
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    y: 0
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  data-testid={`step-card-${step.step}`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-6 w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full -translate-x-1/2 border-2 border-slate-800 z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3 + 0.3 }}
                  />
                  
                  {/* Card */}
                  <div className="ml-16">
                    <motion.div
                      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden group"
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-active:opacity-10 transition-opacity duration-300`}
                      />
                      
                      <div className="relative z-10">
                        <motion.div
                          className="w-24 h-24 mx-auto mb-4"
                          animate={shouldReduceMotion ? {} : floatAnimation}
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          <img 
                            src={step.illustration}
                            alt={`${step.title} illustration`}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading="lazy"
                          />
                        </motion.div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}>
                            <IconComponent className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-medium text-slate-400">STEP {step.step}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Premium CTA Section */}
        <motion.div
          className="text-center mt-20 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <Link href="/services">
            <motion.div
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-testid="book-service-cta"
            >
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                  backgroundSize: "200% 200%"
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <span className="relative z-10">Book Your Service Now</span>
              <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}