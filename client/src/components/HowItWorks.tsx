import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

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
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: {
        delay: 0.8,
        duration: 2,
        ease: "easeInOut"
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
      className="relative px-4 pt-10 pb-16 md:px-10 md:pt-16 md:pb-24 overflow-hidden bg-[radial-gradient(80%_60%_at_20%_0%,rgba(56,189,248,.25),transparent),radial-gradient(70%_50%_at_100%_100%,rgba(99,102,241,.25),transparent)] bg-gray-900"
    >
      {/* Glowing particles background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.15),transparent_50%)] opacity-10" />
      
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

        {/* Cards Container */}
        <div className="relative">
          <motion.ul 
            role="list"
            className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => {
              return (
                <motion.li
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className="group relative"
                  data-testid={`step-card-${step.step}`}
                >
                  {/* Card */}
                  <motion.div
                    className="flex flex-col items-center text-center relative rounded-2xl p-5 md:p-6 bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,6,23,.2)] hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                    whileHover={shouldReduceMotion ? {} : { 
                      y: -6, 
                      scale: 1.02,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }
                    }}
                  >
                    {/* Floating Illustration */}
                    <div className="relative mb-4">
                      <motion.div 
                        className="relative"
                        animate={shouldReduceMotion ? {} : floatAnimation}
                        style={{ animationDelay: `${index * 0.5}s` }}
                        whileHover={shouldReduceMotion ? {} : {
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400, damping: 20 }
                        }}
                      >
                        <img 
                          src={step.illustration}
                          alt={`${step.title} illustration`}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl"
                          loading="lazy"
                        />
                        
                        {/* Glow effect on hover */}
                        <motion.div 
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 blur-xl scale-110 transition-opacity duration-300`}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Step Number */}
                    <div className="text-xs uppercase tracking-wide text-gray-400 mb-2 font-medium">
                      STEP {step.step}
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="text-lg font-semibold text-white mb-2"
                      id={`step-${step.step}-title`}
                    >
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-sm leading-relaxed text-gray-400 max-w-[220px]"
                      aria-labelledby={`step-${step.step}-title`}
                    >
                      {step.description}
                    </p>

                    {/* Gradient border at bottom */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-b-2xl`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                    />
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Connecting Line Animation - Desktop Only */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2 origin-left"
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 rounded-full opacity-60" />
            
            {/* Animated dots on the line */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2 shadow-lg"
                style={{ left: `${25 + i * 25}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  opacity: [0, 1, 0.8] 
                }}
                transition={{ 
                  delay: 1.2 + i * 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Link href="/services">
            <motion.div
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="book-service-cta"
            >
              Book Your Service Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}