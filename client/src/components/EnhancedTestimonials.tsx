import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Mumbai",
    rating: 5,
    review: "Amazing service! The mechanic came right to my office parking. Fixed my bike's brake issue in 30 minutes. Much better than wasting whole day at garage.",
    service: "Bike Brake Service",
    avatar: "RK",
    color: "from-emerald-400 to-teal-600"
  },
  {
    id: 2,
    name: "Priya Sharma", 
    location: "Delhi",
    rating: 5,
    review: "Professional team with proper uniform and tools. Transparent pricing with no hidden charges. My car AC is working perfectly now!",
    service: "Car AC Service",
    avatar: "PS",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: 3,
    name: "Arjun Patel",
    location: "Bangalore", 
    rating: 5,
    review: "Booked at 10 AM, mechanic arrived at 12 PM. Real-time tracking was excellent. Quality of service is far better than local garages.",
    service: "Engine Service",
    avatar: "AP",
    color: "from-violet-400 to-purple-600"
  }
];

export function EnhancedTestimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    show: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    show: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg"
          >
            <Quote className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            What Our Customers Say
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Real reviews from customers who chose Garageathome over traditional garages
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { 
                y: -8, 
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              onHoverStart={() => setHoveredCard(testimonial.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
              
              {/* Quote decoration */}
              <motion.div
                className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                animate={hoveredCard === testimonial.id ? {
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Quote className="w-4 h-4 text-white" />
              </motion.div>

              <div className="relative z-10">
                {/* Star rating with staggered animation */}
                <motion.div 
                  className="flex items-center mb-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={starVariants}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Review text with typewriter effect */}
                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                >
                  "{testimonial.review}"
                </motion.p>

                {/* User info with avatar */}
                <div className="flex items-center">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-semibold text-white"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.7 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-gray-400"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    >
                      {testimonial.location} • {testimonial.service}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'subtract' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}