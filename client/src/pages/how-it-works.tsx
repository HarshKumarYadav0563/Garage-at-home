import { motion, useReducedMotion } from 'framer-motion';
import { 
  Phone, CheckCircle, Wrench, Star, MapPin, Clock, Shield, 
  Heart, ArrowRight, Smartphone, CreditCard, MessageSquare, 
  Users, Zap, Award, Target, Timer, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

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
      y: 30,
      scale: 0.95
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
      description: "Choose your vehicle type, select the service you need, pick your preferred time slot, and confirm your location",
      icon: Phone,
      gradient: "from-sky-400 to-indigo-600",
      details: [
        "Vehicle type selection (bike/car)",
        "Service category choice",
        "Time slot selection",
        "Location confirmation"
      ]
    },
    {
      step: "02", 
      title: "Get Confirmation",
      description: "Receive instant confirmation with mechanic details, estimated arrival time, and unique tracking ID",
      icon: CheckCircle,
      gradient: "from-emerald-400 to-teal-600",
      details: [
        "Instant booking confirmation",
        "Mechanic profile & ratings",
        "Estimated arrival time",
        "Unique tracking ID"
      ]
    },
    {
      step: "03",
      title: "Mechanic Arrives",
      description: "Our certified professional mechanic arrives at your location with all necessary tools and equipment",
      icon: Wrench,
      gradient: "from-amber-400 to-orange-600",
      details: [
        "Certified professional mechanic",
        "Complete tool kit included",
        "Real-time location tracking",
        "Direct communication channel"
      ]
    },
    {
      step: "04",
      title: "Service Complete",
      description: "Quality service completion with warranty, transparent billing, and multiple payment options",
      icon: Star,
      gradient: "from-violet-400 to-fuchsia-600",
      details: [
        "Quality service delivery",
        "Service warranty included",
        "Transparent pricing",
        "Multiple payment options"
      ]
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Doorstep Service",
      description: "Professional mechanics come to your exact location",
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: Clock,
      title: "24/7 Availability", 
      description: "Round-the-clock service for emergency repairs",
      color: "from-sky-400 to-blue-600"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All services backed by warranty and guarantee",
      color: "from-indigo-400 to-purple-600"
    },
    {
      icon: CreditCard,
      title: "Transparent Pricing",
      description: "No hidden charges, clear pricing before service",
      color: "from-violet-400 to-pink-600"
    }
  ];

  const benefits = [
    { icon: Timer, label: "Save Time", description: "No need to visit garage" },
    { icon: Heart, label: "Convenience", description: "Service at your location" },
    { icon: Award, label: "Expert Service", description: "Certified professionals" },
    { icon: Sparkles, label: "Premium Quality", description: "Top-grade parts & service" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 pt-20 lg:pt-24 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-emerald-300/20 to-sky-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200,
              duration: 0.8
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-3xl mb-8 shadow-2xl"
          >
            <Wrench className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            How GarageWala Works
          </h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience India's first premium doorstep vehicle service platform. 
            Get professional mechanics at your location in just 4 simple steps.
          </motion.p>
        </motion.div>

        {/* Main Steps Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Simple 4-Step Process
          </motion.h2>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.03,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="group"
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-bold text-white/20">{step.step}</span>
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center space-x-3 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Why Choose GarageWala?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
                      whileHover={shouldReduceMotion ? {} : { 
                        scale: 1.1, 
                        rotate: 5
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Key Benefits
          </motion.h2>

          <div className="flex justify-center items-center space-x-8 md:space-x-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-3"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-xl"
                  animate={shouldReduceMotion ? {} : {
                    y: [-2, 2, -2],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">{benefit.label}</h3>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-12">
            <CardContent>
              <motion.h2 
                className="text-3xl lg:text-4xl font-bold text-white mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Ready to Experience Premium Service?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Join thousands of satisfied customers who trust GarageWala for their vehicle maintenance needs.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderRadius: 'inherit' }}
                    />
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Book Service Now</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}