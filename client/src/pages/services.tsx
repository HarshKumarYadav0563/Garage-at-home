import { motion, useReducedMotion } from 'framer-motion';
import { ServiceCard } from '@/components/ServiceCard';
import { servicePackages } from '@/data/services';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  Wrench, Car, Bike, ArrowRight, Shield, Clock, 
  Star, CheckCircle, Zap, Sparkles 
} from 'lucide-react';

export default function Services() {
  const [selectedType, setSelectedType] = useState<'all' | 'bike' | 'car'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'maintenance' | 'repair'>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredServices = servicePackages.filter(service => 
    (selectedType === 'all' || service.vehicleType === selectedType) &&
    (selectedCategory === 'all' || service.category === selectedCategory)
  );

  const gradients = {
    bike: 'from-emerald-500 to-teal-600',
    car: 'from-blue-500 to-indigo-600'
  };

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

  const bikeServices = servicePackages.filter(s => s.vehicleType === 'bike');
  const carServices = servicePackages.filter(s => s.vehicleType === 'car');
  const maintenanceServices = servicePackages.filter(s => s.category === 'maintenance');
  const repairServices = servicePackages.filter(s => s.category === 'repair');

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
        {/* Enhanced Header */}
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
            <Wrench className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Professional Vehicle Services
          </h1>
          
          {/* Animated gradient underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Expert doorstep vehicle maintenance and repair services with transparent pricing, 
            quality guarantee, and professional certified mechanics.
          </motion.p>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {[
              { icon: Star, label: '4.8+ Rating', value: '10k+ Reviews' },
              { icon: Shield, label: 'Quality Assured', value: '6 Month Warranty' },
              { icon: Clock, label: 'Quick Service', value: '45 Min Average' },
              { icon: CheckCircle, label: 'Trusted', value: '50k+ Customers' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                  <CardContent className="p-0">
                    <motion.div
                      animate={shouldReduceMotion ? {} : {
                        y: [-1, 1, -1],
                      }}
                      transition={{ 
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-lg flex items-center justify-center mx-auto mb-2"
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="text-white font-semibold text-sm">{stat.label}</div>
                    <div className="text-gray-300 text-xs">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Vehicle Type Filters */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
              {[
                { key: 'all', label: 'All Services', icon: Sparkles },
                { key: 'bike', label: 'Bike Services', icon: Bike },
                { key: 'car', label: 'Car Services', icon: Car }
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setSelectedType(filter.key as 'all' | 'bike' | 'car')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedType === filter.key
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${filter.key}`}
                >
                  <motion.div
                    animate={selectedType === filter.key && !shouldReduceMotion ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <filter.icon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-sm">{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1 flex gap-1">
              {[
                { key: 'all', label: 'All Categories' },
                { key: 'maintenance', label: 'Maintenance' },
                { key: 'repair', label: 'Repair' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedCategory(filter.key as 'all' | 'maintenance' | 'repair')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    selectedCategory === filter.key
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  data-testid={`category-filter-${filter.key}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Service Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-emerald-400">{bikeServices.length}</div>
                <div className="text-gray-300 text-sm">Bike Services</div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-sky-400">{carServices.length}</div>
                <div className="text-gray-300 text-sm">Car Services</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-indigo-400">{maintenanceServices.length}</div>
                <div className="text-gray-300 text-sm">Maintenance</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-purple-400">{repairServices.length}</div>
                <div className="text-gray-300 text-sm">Repair Services</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div 
          key={`${selectedType}-${selectedCategory}`}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
            >
              <ServiceCard
                id={service.id}
                name={service.name}
                vehicleType={service.vehicleType}
                description={service.description}
                basePrice={service.basePrice}
                features={service.features}
                icon={service.icon}
                gradient={gradients[service.vehicleType]}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
                Book your doorstep vehicle service now and join thousands of satisfied customers
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
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
                      className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                      data-testid="button-start-booking"
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
                </Link>

                <Link href="/contact">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Get Quote
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
