import { motion, useReducedMotion } from 'framer-motion';

// Import illustrations directly from attached_assets
const bookingIllustration = '/attached_assets/generated_images/Mobile_app_booking_illustration_db0d4d1f.png';
const confirmationIllustration = '/attached_assets/generated_images/Confirmation_notification_illustration_4f1b0f52.png';
const mechanicIllustration = '/attached_assets/generated_images/Mechanic_arrival_illustration_ed1a67dd.png';
const completionIllustration = '/attached_assets/generated_images/Service_completion_illustration_813d8d47.png';

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
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const steps = [
    {
      step: "01",
      title: "Book Online",
      description: "Choose vehicle type, service needed, and time slot",
      illustration: bookingIllustration,
      gradient: "from-sky-400 to-indigo-600",
      ringColor: "hover:ring-sky-400/30"
    },
    {
      step: "02", 
      title: "Get Confirmation",
      description: "Instant confirmation with mechanic details and tracking ID",
      illustration: confirmationIllustration,
      gradient: "from-emerald-400 to-teal-600",
      ringColor: "hover:ring-emerald-400/30"
    },
    {
      step: "03",
      title: "Mechanic Arrives",
      description: "Professional mechanic comes to your location with tools",
      illustration: mechanicIllustration,
      gradient: "from-amber-400 to-orange-600",
      ringColor: "hover:ring-amber-400/30"
    },
    {
      step: "04",
      title: "Service Complete",
      description: "Quality service with warranty, transparent billing & payment",
      illustration: completionIllustration,
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
              How Garage At Home Works
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
          className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 how-it-works-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            return (
              <motion.li
                key={index}
                variants={cardVariants}
                transition={{ delay: index * 0.2 }}
                className="group relative rounded-3xl p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,6,23,.3)] hover:bg-white/8 hover:border-white/20 transition-all duration-500"
                whileHover={shouldReduceMotion ? {} : { 
                  y: -8, 
                  scale: 1.02,
                  rotateX: 2, 
                  rotateY: -2,
                  transition: { 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                  }
                }}
                data-testid={`step-card-${step.step}`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Illustration container with floating animation */}
                  <div className="relative mb-6">
                    <motion.div 
                      className="relative"
                      animate={shouldReduceMotion ? {} : floatAnimation}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <img 
                        src={step.illustration}
                        alt={`${step.title} illustration`}
                        className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl"
                        loading="lazy"
                      />
                      
                      {/* Glowing background effect */}
                      <motion.div 
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-xl scale-110`}
                        animate={shouldReduceMotion ? {} : {
                          scale: [1.1, 1.3, 1.1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-white/50 mb-3 font-medium">
                    STEP {step.step}
                  </div>
                  
                  <h3 
                    className="text-lg md:text-xl font-bold text-white mb-3"
                    id={`step-${step.step}-title`}
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-sm md:text-base text-white/75 leading-relaxed"
                    aria-labelledby={`step-${step.step}-title`}
                  >
                    {step.description}
                  </p>

                  {/* Animated progress bar */}
                  <motion.div
                    className={`mt-6 h-1 bg-gradient-to-r ${step.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}