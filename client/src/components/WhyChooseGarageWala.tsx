import { motion, useReducedMotion } from 'framer-motion';
import { Home, UserCheck, DollarSign, MapPin, Shield, Zap } from 'lucide-react';

export function WhyChooseGarageWala() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = shouldReduceMotion ? {} : {
    y: [0, -3, 0, 2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const features = [
    {
      title: "True Doorstep Service",
      description: "No need to visit garages. Our mechanics come fully equipped to your location with all tools and parts.",
      icon: Home,
      gradient: "from-sky-400 to-indigo-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
    },
    {
      title: "Professional Mechanics",
      description: "Trained, uniformed professionals with verified experience and background checks for your safety.",
      icon: UserCheck,
      gradient: "from-emerald-400 to-teal-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
    },
    {
      title: "Transparent Pricing",
      description: "Upfront, fixed pricing with no hidden charges. What you see is what you pay.",
      icon: DollarSign,
      gradient: "from-amber-400 to-orange-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
    },
    {
      title: "Real-time Tracking",
      description: "Track your service progress live, from booking confirmation to completion with photo updates.",
      icon: MapPin,
      gradient: "from-violet-400 to-fuchsia-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
    },
    {
      title: "Quality Guarantee",
      description: "30-day warranty on all services with satisfaction guarantee or money back.",
      icon: Shield,
      gradient: "from-green-400 to-emerald-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
    },
    {
      title: "Same Day Service",
      description: "Book and get service the same day. Emergency services available 24/7 across all cities.",
      icon: Zap,
      gradient: "from-red-400 to-pink-600",
      hoverGlow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
    }
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Radial accent glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>
      
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Why Choose GarageWala
            </h2>
            
            {/* Animated gradient underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mt-6 mx-auto max-w-2xl leading-relaxed"
          >
            Unlike traditional garage visits, we bring premium service to your doorstep
          </motion.p>
        </motion.div>

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
                variants={itemVariants}
                className={`group relative rounded-2xl p-4 sm:p-5 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 ${feature.hoverGlow}`}
                whileHover={shouldReduceMotion ? {} : { 
                  y: -4, 
                  rotateX: 2, 
                  rotateY: -1,
                  scale: 1.02
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
              >
                <div className="flex flex-col items-start">
                  {/* Icon container with glow effect */}
                  <div className="relative mb-4">
                    <motion.div 
                      className={`relative size-12 md:size-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-${feature.gradient.split('-')[1]}-500/30`}
                      animate={shouldReduceMotion ? {} : floatAnimation}
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      <IconComponent 
                        className="w-6 h-6 md:w-7 md:h-7 text-white" 
                        aria-hidden="true"
                      />
                      
                      {/* Hover glow ring */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md scale-110" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>
                
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}