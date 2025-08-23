import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ServiceCard } from '@/components/ServiceCard';
import { servicePackages } from '@/data/services';
import { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { 
  Wrench, Car, Bike, ArrowRight, Shield, Clock, 
  Star, CheckCircle, Zap, Sparkles, Search, Filter,
  TrendingUp, Users, Award, HeartHandshake, 
  MapPin, Phone, Calendar, CreditCard
} from 'lucide-react';

export default function Services() {
  const [selectedType, setSelectedType] = useState<'all' | 'bike' | 'car'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'maintenance' | 'repair'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'name'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const filteredServices = useMemo(() => {
    let filtered = servicePackages.filter(service => 
      (selectedType === 'all' || service.vehicleType === selectedType) &&
      (selectedCategory === 'all' || service.category === selectedCategory) &&
      (searchQuery === '' || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );

    // Sort services
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedType, selectedCategory, searchQuery, sortBy]);

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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 pt-20 lg:pt-24 overflow-hidden relative">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-emerald-300/20 to-sky-300/20 rounded-full blur-3xl"
          style={{ y, opacity }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
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

        {/* Enhanced Search and Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search services, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                data-testid="search-input"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Clear search</span>
                  ✕
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-6">
            {/* Vehicle Type Filters */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
              {[
                { key: 'all', label: 'All Services', icon: Sparkles, count: servicePackages.length },
                { key: 'bike', label: 'Bike Services', icon: Bike, count: bikeServices.length },
                { key: 'car', label: 'Car Services', icon: Car, count: carServices.length }
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setSelectedType(filter.key as 'all' | 'bike' | 'car')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative ${
                    selectedType === filter.key
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
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
                  <Badge 
                    variant="secondary" 
                    className={`ml-1 text-xs ${
                      selectedType === filter.key 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {filter.count}
                  </Badge>
                </motion.button>
              ))}
            </div>

            {/* Sort and Category Controls */}
            <div className="flex gap-4">
              {/* Category Filters */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1 flex gap-1">
                {[
                  { key: 'all', label: 'All Categories' },
                  { key: 'maintenance', label: 'Maintenance' },
                  { key: 'repair', label: 'Repair' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedCategory(filter.key as 'all' | 'maintenance' | 'repair')}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
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

              {/* Sort Dropdown */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'name')}
                  className="bg-transparent text-white text-sm px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
                  data-testid="sort-select"
                >
                  <option value="price" className="bg-gray-800">Sort by Price</option>
                  <option value="duration" className="bg-gray-800">Sort by Duration</option>
                  <option value="name" className="bg-gray-800">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <motion.div 
            className="text-center mb-6"
            layout
            key={filteredServices.length}
          >
            <p className="text-gray-300 text-sm">
              Showing <span className="text-emerald-400 font-semibold">{filteredServices.length}</span> services
              {searchQuery && (
                <span> matching "<span className="text-sky-400">{searchQuery}</span>"</span>
              )}
            </p>
          </motion.div>
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

        {/* Customer Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                location: "Mumbai",
                service: "Bike Full Service",
                rating: 5,
                comment: "Excellent service at my doorstep. The mechanic was professional and completed the work in time.",
                avatar: "👨"
              },
              {
                name: "Priya Sharma",
                location: "Bangalore",
                service: "Car AC Service",
                rating: 5,
                comment: "Very satisfied with the AC service. Now my car feels brand new. Highly recommended!",
                avatar: "👩"
              },
              {
                name: "Amit Patel",
                location: "Delhi",
                service: "Puncture Repair",
                rating: 5,
                comment: "Quick response for emergency puncture repair. Saved my day with their 24/7 service.",
                avatar: "👨‍💼"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 400 } }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">"{testimonial.comment}"</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {testimonial.service}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose GarageWala?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "All services come with warranty and quality assurance",
                color: "from-emerald-500 to-teal-600"
              },
              {
                icon: Users,
                title: "Expert Mechanics",
                description: "Certified professionals with years of experience",
                color: "from-blue-500 to-indigo-600"
              },
              {
                icon: Clock,
                title: "On-Time Service",
                description: "Punctual service delivery at your preferred time",
                color: "from-purple-500 to-pink-600"
              },
              {
                icon: CreditCard,
                title: "Transparent Pricing",
                description: "No hidden charges, upfront pricing for all services",
                color: "from-orange-500 to-red-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center h-full">
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}
                      animate={shouldReduceMotion ? {} : {
                        y: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <CardContent className="relative z-10 p-12">
              <motion.div
                className="inline-block p-4 rounded-full bg-gradient-to-r from-emerald-500 to-sky-600 mb-6"
                animate={shouldReduceMotion ? {} : {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HeartHandshake className="w-8 h-8 text-white" />
              </motion.div>
              
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
                Book your doorstep vehicle service now and join thousands of satisfied customers across India
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
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
                        <Calendar className="w-5 h-5" />
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
                      <Phone className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  <span>Free Home Inspection</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  <span>Money Back Guarantee</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
