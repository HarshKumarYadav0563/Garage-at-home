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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
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
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 shadow-2xl"
          >
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
            Simple, Transparent Pricing
          </h1>
          
          {/* Animated gradient underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 rounded-full mx-auto mb-4 md:mb-6"
            initial={{ width: 0 }}
            animate={{ width: "min(200px, 80%)" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
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
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/book">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ borderRadius: 'inherit' }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Service Now</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Vehicle Type Tabs */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-1 md:p-2 flex w-full max-w-md"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.button
              onClick={() => setActiveTab('bike')}
              className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex-1 ${
                activeTab === 'bike'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={activeTab === 'bike' && !shouldReduceMotion ? { 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Bike className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
              <span className="text-sm md:text-base">Bike Services</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('car')}
              className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex-1 ${
                activeTab === 'car'
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={activeTab === 'car' && !shouldReduceMotion ? { 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Car className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
              <span className="text-sm md:text-base">Car Services</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          className="grid gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}
        >
          {currentPlans.map((plan, index) => (
            <motion.div
              key={`${plan.id}-${activeTab}`}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.03,
                y: -8,
                rotateY: 2,
                transition: { type: "spring", stiffness: 400 }
              }}
              className={`relative ${plan.popular ? 'md:-mt-2 lg:-mt-4' : ''}`}
            >
              <Card className={`bg-white/5 backdrop-blur-xl border rounded-xl md:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 h-full ${
                plan.popular ? 'border-emerald-400/50 bg-white/10' : 'border-white/10'
              }`}>
                <CardContent className="p-4 md:p-6 lg:p-8">
                  {plan.badge && (
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                    >
                      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-3 py-1 text-xs md:text-sm shadow-lg">
                        {plan.badge}
                      </Badge>
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-4 md:mb-6">
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold text-white mb-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {plan.name}
                    </motion.h3>
                    <motion.div 
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-400 mb-2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                    >
                      {plan.price}
                    </motion.div>
                    <p className="text-gray-300 text-xs md:text-sm">{plan.tagline}</p>
                  </div>

                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center space-x-3"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05 + 0.5 }}
                      >
                        <motion.div
                          whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-300 text-xs md:text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href={`/book?plan=${plan.id}&vehicle=${activeTab}`}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className={`w-full py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base relative overflow-hidden group ${
                          plan.popular
                            ? 'bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white shadow-xl'
                            : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        {plan.popular && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                            style={{ borderRadius: 'inherit' }}
                          />
                        )}
                        <span className="relative z-10">{plan.buttonText}</span>
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-On Services */}
        <motion.div
          className="mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
            variants={itemVariants}
          >
            Optional Add-Ons
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {addOnServices.map((addon, index) => (
              <motion.div
                key={addon.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  y: -5,
                  rotateZ: 2,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-1 md:p-2">
                    <motion.div
                      animate={shouldReduceMotion ? {} : {
                        y: [-1, 1, -1],
                        rotate: [-1, 1, -1]
                      }}
                      transition={{ 
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:shadow-lg transition-all duration-300"
                    >
                      <addon.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-white mb-1 text-xs md:text-sm leading-tight">{addon.title}</h3>
                    <motion.p 
                      className="text-emerald-400 font-bold text-xs md:text-sm"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {addon.price}
                    </motion.p>
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
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
            variants={itemVariants}
          >
            Detailed Service Pricing
          </motion.h2>

          <div className="space-y-3 md:space-y-4">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <motion.button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full p-4 md:p-6 text-left hover:bg-white/5 transition-colors duration-300"
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                          <motion.div 
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0"
                            whileHover={shouldReduceMotion ? {} : { 
                              scale: 1.1, 
                              rotate: 5 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </motion.div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-white text-sm md:text-lg truncate">{service.title}</h3>
                            <p className="text-gray-300 text-xs md:text-sm mt-1 line-clamp-2">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-emerald-400 font-semibold text-xs md:text-sm">
                              <span className="hidden md:inline">Bike: </span>{service.bikePrice}
                            </div>
                            <div className="text-sky-400 font-semibold text-xs md:text-sm">
                              <span className="hidden md:inline">Car: </span>{service.carPrice}
                            </div>
                          </div>
                          <motion.div
                            animate={expandedService === service.id ? { rotate: 180 } : { rotate: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedService === service.id ? 'auto' : 0,
                        opacity: expandedService === service.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="px-4 md:px-6 pb-4 md:pb-6 border-t border-white/10"
                        initial={false}
                        animate={{
                          y: expandedService === service.id ? 0 : -10
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="mt-3 md:mt-4 text-gray-300 text-xs md:text-sm leading-relaxed">
                          <p>Our professional mechanics use high-quality parts and follow industry standards. 
                          All services include a detailed inspection and come with warranty coverage.</p>
                          <div className="mt-3 grid md:grid-cols-2 gap-3 md:gap-4">
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={expandedService === service.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <strong className="text-white">Includes:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1 text-xs md:text-sm">
                                <li>Professional inspection</li>
                                <li>Quality parts guarantee</li>
                                <li>Service warranty</li>
                              </ul>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={expandedService === service.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            >
                              <strong className="text-white">Service Time:</strong>
                              <p className="mt-1 text-xs md:text-sm">1-3 hours depending on vehicle condition</p>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
            variants={itemVariants}
          >
            Service Comparison
          </motion.h2>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl overflow-hidden min-w-[600px] md:min-w-0">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-3 md:p-6 text-white font-semibold text-sm md:text-base">Features</th>
                        <th className="text-center p-3 md:p-6 text-white font-semibold text-sm md:text-base">Basic</th>
                        <th className="text-center p-3 md:p-6 text-white font-semibold text-sm md:text-base">Standard</th>
                        <th className="text-center p-3 md:p-6 text-white font-semibold text-sm md:text-base">Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((item, index) => (
                        <motion.tr 
                          key={index} 
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <td className="p-3 md:p-6 text-gray-300 text-sm md:text-base">{item.feature}</td>
                          <td className="p-3 md:p-6 text-center">
                            {typeof item.basic === 'boolean' ? (
                              item.basic ? (
                                <motion.div
                                  whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mx-auto" />
                                </motion.div>
                              ) : (
                                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-300 text-xs md:text-sm">{item.basic}</span>
                            )}
                          </td>
                          <td className="p-3 md:p-6 text-center">
                            {typeof item.standard === 'boolean' ? (
                              item.standard ? (
                                <motion.div
                                  whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mx-auto" />
                                </motion.div>
                              ) : (
                                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-300 text-xs md:text-sm">{item.standard}</span>
                            )}
                          </td>
                          <td className="p-3 md:p-6 text-center">
                            {typeof item.premium === 'boolean' ? (
                              item.premium ? (
                                <motion.div
                                  whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mx-auto" />
                                </motion.div>
                              ) : (
                                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-300 text-xs md:text-sm">{item.premium}</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-12 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto">
            {pricingFAQs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg md:rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <motion.button
                      onClick={() => setExpandedFAQ(expandedFAQ === index.toString() ? null : index.toString())}
                      className="w-full p-4 md:p-6 text-left hover:bg-white/5 transition-colors duration-300"
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-sm md:text-lg pr-4 leading-tight">{faq.question}</h3>
                        <motion.div
                          animate={expandedFAQ === index.toString() ? { rotate: 180 } : { rotate: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </motion.button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedFAQ === index.toString() ? 'auto' : 0,
                        opacity: expandedFAQ === index.toString() ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="px-4 md:px-6 pb-4 md:pb-6 border-t border-white/10"
                        initial={false}
                        animate={{
                          y: expandedFAQ === index.toString() ? 0 : -10
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="mt-3 md:mt-4 text-gray-300 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </motion.div>
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
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/10"
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.01,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ready to book your doorstep service?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto"
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
                    className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ borderRadius: 'inherit' }}
                    />
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Book Now</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}