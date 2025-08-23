import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Check, X, ChevronDown, ChevronUp, ArrowRight, 
  Bike, Car, Sparkles, Shield 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  bikePlans, 
  carPlans, 
  addOnServices, 
  detailedServices, 
  comparisonFeatures, 
  pricingFAQs 
} from '@/config/pricingConfig';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'bike' | 'car'>('bike');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
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

  const currentPlans = activeTab === 'bike' ? bikePlans : carPlans;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-20 lg:pt-24 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-emerald-300/10 to-sky-300/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl"
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

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            Simple, Transparent Pricing
          </h1>
          
          {/* Animated gradient underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Affordable doorstep vehicle service – no hidden charges, no surprises
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/book">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Book Service Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Vehicle Type Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex">
            <button
              onClick={() => setActiveTab('bike')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'bike'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bike className="w-5 h-5" />
              <span>Bike Services</span>
            </button>
            <button
              onClick={() => setActiveTab('car')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'car'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Car Services</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.02,
                y: -10,
                transition: { type: "spring", stiffness: 400 }
              }}
              className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
            >
              <Card className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 h-full ${
                plan.popular ? 'border-emerald-400/50 bg-white/10' : 'border-white/10'
              }`}>
                <CardContent className="p-8">
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-4 py-1">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl lg:text-4xl font-bold text-emerald-400 mb-2">
                      {plan.price}
                    </div>
                    <p className="text-gray-300 text-sm">{plan.tagline}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book?plan=${plan.id}&vehicle=${activeTab}`}>
                    <Button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white shadow-xl'
                          : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-On Services */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={itemVariants}
          >
            Optional Add-Ons
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((addon, index) => (
              <motion.div
                key={addon.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-2">
                    <motion.div
                      animate={shouldReduceMotion ? {} : {
                        y: [-2, 2, -2],
                      }}
                      transition={{ 
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-3"
                    >
                      <addon.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-white mb-1 text-sm">{addon.title}</h3>
                    <p className="text-emerald-400 font-bold text-sm">{addon.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Services */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={itemVariants}
          >
            Detailed Service Pricing
          </motion.h2>

          <div className="space-y-4">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full p-6 text-left hover:bg-white/5 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center">
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-lg">{service.title}</h3>
                            <p className="text-gray-300 text-sm mt-1">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-emerald-400 font-semibold">
                              Bike: {service.bikePrice}
                            </div>
                            <div className="text-sky-400 font-semibold">
                              Car: {service.carPrice}
                            </div>
                          </div>
                          {expandedService === service.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedService === service.id ? 'auto' : 0,
                        opacity: expandedService === service.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/10">
                        <div className="mt-4 text-gray-300 text-sm leading-relaxed">
                          <p>Our professional mechanics use high-quality parts and follow industry standards. 
                          All services include a detailed inspection and come with warranty coverage.</p>
                          <div className="mt-3 grid md:grid-cols-2 gap-4">
                            <div>
                              <strong>Includes:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>Professional inspection</li>
                                <li>Quality parts guarantee</li>
                                <li>Service warranty</li>
                              </ul>
                            </div>
                            <div>
                              <strong>Service Time:</strong>
                              <p className="mt-1">1-3 hours depending on vehicle condition</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={itemVariants}
          >
            Service Comparison
          </motion.h2>

          <div className="overflow-x-auto">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-6 text-white font-semibold">Features</th>
                      <th className="text-center p-6 text-white font-semibold">Basic</th>
                      <th className="text-center p-6 text-white font-semibold">Standard</th>
                      <th className="text-center p-6 text-white font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6 text-gray-300">{item.feature}</td>
                        <td className="p-6 text-center">
                          {typeof item.basic === 'boolean' ? (
                            item.basic ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">{item.basic}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof item.standard === 'boolean' ? (
                            item.standard ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">{item.standard}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof item.premium === 'boolean' ? (
                            item.premium ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-300">{item.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-white"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {pricingFAQs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index.toString() ? null : index.toString())}
                      className="w-full p-6 text-left hover:bg-white/5 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-lg pr-4">{faq.question}</h3>
                        {expandedFAQ === index.toString() ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedFAQ === index.toString() ? 'auto' : 0,
                        opacity: expandedFAQ === index.toString() ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/10">
                        <p className="mt-4 text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
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
          <div className="bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-3xl p-12 border border-white/10">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ready to book your doorstep service?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of satisfied customers who trust GarageWala for affordable, professional vehicle service.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/book">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderRadius: 'inherit' }}
                    />
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Book Now</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}