import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: 'faq-1',
    question: 'How do I book a service?',
    answer: 'Simply select your vehicle type, choose the service you need, share your location, pick a time slot, and provide your contact details. Our mechanic will arrive at your doorstep at the scheduled time.',
    icon: '🚗',
    color: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'faq-2', 
    question: 'What are your service charges?',
    answer: 'Our pricing is transparent with no hidden charges. Bike services start from ₹299 and car services from ₹599. You only pay after the service is completed to your satisfaction.',
    icon: '💰',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'faq-3',
    question: 'How can I track my service?',
    answer: 'After booking, you\'ll receive a tracking ID. Use this ID on our tracking page to see real-time updates: service confirmed, mechanic on the way, work in progress, and completion.',
    icon: '📍',
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'faq-4',
    question: 'Do I need to create an account?',
    answer: 'No account required! We offer guest booking for your convenience. Just provide your name and phone number when booking, and you\'re all set.',
    icon: '👤',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'faq-5',
    question: 'What if I\'m not satisfied with the service?',
    answer: 'Customer satisfaction is our priority. If you\'re not satisfied, we offer free re-service within 7 days. All our work comes with a quality guarantee.',
    icon: '⭐',
    color: 'from-cyan-400 to-blue-600'
  }
];

export function EnhancedFAQ() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
      x: -30,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconFloat = {
    float: {
      y: [-2, 2, -2],
      rotate: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200,
              duration: 0.8
            }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl"
          >
            <HelpCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get answers to common questions about our doorstep vehicle service
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                onHoverStart={() => setHoveredItem(faq.id)}
                onHoverEnd={() => setHoveredItem(null)}
                onTouchStart={() => setHoveredItem(faq.id)}
                onTouchEnd={() => setHoveredItem(null)}
                className="group"
                style={{ touchAction: 'manipulation' }}
              >
                <AccordionItem
                  value={faq.id}
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                    style={{ 
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'subtract',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'subtract'
                    }}
                  />

                  <AccordionTrigger className="px-6 py-5 hover:no-underline group/trigger touch-manipulation cursor-pointer" style={{ touchAction: 'manipulation' }}>
                    <div className="flex items-center w-full">
                      {/* Animated icon */}
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${faq.color} flex items-center justify-center mr-4 shadow-lg select-none`}
                        variants={shouldReduceMotion ? {} : iconFloat}
                        animate={hoveredItem === faq.id ? "float" : ""}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <span className="text-xl">{faq.icon}</span>
                      </motion.div>

                      <motion.h3 
                        className="text-left text-lg font-semibold text-white group-hover/trigger:text-gray-200 transition-colors flex-1"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {faq.question}
                      </motion.h3>

                      {/* Enhanced chevron animation */}
                      <motion.div
                        className="ml-4 select-none"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <ChevronDown className="h-5 w-5 text-gray-400 group-hover/trigger:text-gray-200 transition-all duration-300 group-data-[state=open]/trigger:rotate-180" />
                      </motion.div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-5">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-16 pr-4"
                    >
                      <motion.p 
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        {faq.answer}
                      </motion.p>
                      
                      {/* Decorative element */}
                      <motion.div
                        className="mt-4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      />
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/contact">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="contact-us-button"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span className="font-semibold">Still have questions? Contact us!</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}