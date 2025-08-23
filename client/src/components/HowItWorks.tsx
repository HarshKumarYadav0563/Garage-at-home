import { motion, useReducedMotion } from 'framer-motion';
import { Phone, CheckCircle, Wrench, Star } from 'lucide-react';

export function HowItWorks() {
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
    y: [0, -4, 0, 2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const steps = [
    {
      step: "01",
      title: "Book Online",
      description: "Choose vehicle type, service needed, and time slot",
      icon: Phone,
      gradient: "from-sky-400 to-indigo-600",
      ringColor: "hover:ring-sky-400/30"
    },
    {
      step: "02", 
      title: "Get Confirmation",
      description: "Instant confirmation with mechanic details and tracking ID",
      icon: CheckCircle,
      gradient: "from-emerald-400 to-teal-600",
      ringColor: "hover:ring-emerald-400/30"
    },
    {
      step: "03",
      title: "Mechanic Arrives",
      description: "Professional mechanic comes to your location with tools",
      icon: Wrench,
      gradient: "from-amber-400 to-orange-600",
      ringColor: "hover:ring-amber-400/30"
    },
    {
      step: "04",
      title: "Service Complete",
      description: "Quality service with warranty, transparent billing & payment",
      icon: Star,
      gradient: "from-violet-400 to-fuchsia-600",
      ringColor: "hover:ring-violet-400/30"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      aria-labelledby="how-heading" 
      className="relative px-4 pt-10 pb-12 md:px-10 md:pt-16 md:pb-20 overflow-hidden bg-[radial-gradient(80%_60%_at_20%_0%,rgba(56,189,248,.25),transparent),radial-gradient(70%_50%_at_100%_100%,rgba(99,102,241,.25),transparent)] bg-gray-900"
    >
      {/* Background noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-6 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <h2 
              id="how-heading" 
              className="text-2xl md:text-4xl font-semibold text-center leading-tight text-white"
            >
              How Garageathome Works
            </h2>
            
            {/* Animated gradient underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 rounded-full mx-auto mt-3"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-lg text-white/70 mt-4 text-center max-w-[52ch] mx-auto"
          >
            Get premium vehicle service at your doorstep in 4 simple steps
          </motion.p>
        </motion.div>

        <motion.ul 
          role="list"
          className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-4 md:gap-6 how-it-works-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.li
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl p-4 md:p-6 bg-white/6 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,6,23,.2)] hover:ring-1 hover:ring-white/20 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { 
                  y: -4, 
                  rotateX: 2, 
                  rotateY: -2 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 220, 
                  damping: 18 
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon container with glow effect */}
                  <div className="relative">
                    <motion.div 
                      className={`relative size-14 md:size-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      animate={shouldReduceMotion ? {} : floatAnimation}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <IconComponent 
                        className="w-6 h-6 md:w-8 md:h-8 text-white" 
                        aria-hidden="true"
                      />
                      
                      {/* Hover glow ring */}
                      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
                    </motion.div>
                  </div>
                  
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.12em] text-white/60 mt-2">
                    STEP {step.step}
                  </div>
                  
                  <h3 
                    className="text-sm md:text-lg font-semibold mt-1 text-white"
                    id={`step-${step.step}-title`}
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-[12px] md:text-sm text-white/70 mt-1 leading-relaxed line-clamp-3"
                    aria-labelledby={`step-${step.step}-title`}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}