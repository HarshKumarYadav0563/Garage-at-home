import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Phone, MapPin, Zap, Shield, Star, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useUiStore } from '@/stores/useUiStore';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [location] = useLocation();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    handleScroll(); // Set initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', badge: null },
    { name: 'Services', href: '/services', badge: 'Popular' },
    { name: 'Track Order', href: '/track', badge: null },
    { name: 'How It Works', href: '/how-it-works', badge: 'New' },
    { name: 'Contact', href: '/contact', badge: null },
  ] as Array<{ name: string; href: string; badge: string | null; scrollTo?: string }>;

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'];
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: isScrolled ? 0.98 : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        scale: { duration: 0.2 }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-gray-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transform'
          : 'bg-gray-950/90 backdrop-blur-lg'
      }`}
      style={{
        transform: `translateY(${Math.min(scrollY * -0.5, -10)}px)` 
      }}
    >
      {/* Top Bar with City and Phone */}
      <motion.div 
        className="border-b border-white/10 overflow-hidden"
        animate={{
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center h-8 sm:h-10 text-xs sm:text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Available in {cities.length}+ cities</span>
                <span className="sm:hidden">{cities.length}+ Cities</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-gray-200 font-medium">4.9/5</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-200">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-medium">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'
          }`}
          layout
        >
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 sm:space-x-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <motion.div 
                  className={`bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
                  }`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Wrench className={`text-white transition-all duration-300 ${
                    isScrolled ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'
                  }`} />
                </motion.div>
                <motion.div 
                  className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isScrolled ? 'w-2 h-2 sm:w-3 sm:h-3' : 'w-3 h-3 sm:w-4 sm:h-4'
                  }`}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className={`bg-white rounded-full transition-all duration-300 ${
                    isScrolled ? 'w-1 h-1 sm:w-1.5 sm:h-1.5' : 'w-1.5 h-1.5 sm:w-2 sm:h-2'
                  }`}></div>
                </motion.div>
              </div>
              <div className="flex flex-col">
                <motion.span 
                  className={`font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 ${
                    isScrolled ? 'text-base sm:text-lg lg:text-xl' : 'text-lg sm:text-xl lg:text-2xl'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(59, 130, 246, 0.8)"
                  }}
                >
                  GarageWala
                </motion.span>
                <motion.span 
                  className={`text-gray-400 font-medium -mt-1 transition-all duration-300 ${
                    isScrolled ? 'hidden' : 'hidden sm:block text-xs'
                  }`}
                  animate={{ opacity: isScrolled ? 0 : 1 }}
                >
                  Premium Doorstep Service
                </motion.span>
              </div>
            </motion.div>
          </Link>

          {/* City Selector */}
          <motion.div 
            className="hidden sm:flex md:block relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className={`flex items-center space-x-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group ${
                isScrolled ? 'px-2 sm:px-3 py-1.5 text-sm' : 'px-3 sm:px-4 py-2'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-lg flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-sky-500/30 transition-colors">
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400 font-medium leading-none">Service City</span>
                <span className="font-semibold text-white text-sm leading-tight">{selectedCity}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${showCityDropdown ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {showCityDropdown && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCityDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-14 left-0 w-72 bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border-b border-white/10">
                      <h3 className="font-semibold text-white flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>Select Your City</span>
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">Choose your location for doorstep service</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {cities.map((city, index) => (
                        <motion.button
                          key={city}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setSelectedCity(city);
                            setShowCityDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-all duration-150 flex items-center space-x-3 group ${
                            selectedCity === city ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            selectedCity === city 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-white/10 text-gray-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium block">{city}</span>
                            <span className="text-xs text-gray-400">Available for service</span>
                          </div>
                          {selectedCity === city && (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-800/50 border-t border-white/10">
                      <p className="text-xs text-gray-400 text-center">
                        Don't see your city? <span className="text-emerald-400 font-medium cursor-pointer hover:underline">Request service</span>
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  onClick={(e) => {
                    if (item.scrollTo) {
                      e.preventDefault();
                      const element = document.getElementById(item.scrollTo);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <span className={`font-medium transition-colors ${
                    location === item.href
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-emerald-400'
                  }`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-8 bg-emerald-500 text-white text-xs px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                  {location === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <Link href="/track">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className={`border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl font-medium transition-all duration-300 ${
                      isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2.5'
                    }`}
                    data-testid="button-track-order"
                  >
                    Track Order
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/book">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 20px rgba(59, 130, 246, 0.2)",
                      "0 15px 30px rgba(59, 130, 246, 0.3)",
                      "0 10px 20px rgba(59, 130, 246, 0.2)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity }
                  }}
                >
                  <Button
                    className={`bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${
                      isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2.5'
                    }`}
                    data-testid="button-book-now"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className={`${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      </motion.div>
                      <span>Book Now</span>
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      style={{ borderRadius: 'inherit' }}
                    />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative overflow-hidden text-gray-300 hover:text-white"
                  data-testid="button-mobile-menu"
                >
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className={`${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                    ) : (
                      <Menu className={`${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[400px] bg-gray-950 border-white/10 overflow-y-auto">
              <div className="flex flex-col space-y-6 mt-6 pb-6">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 pb-6 border-b border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center">
                    <Wrench className="text-white text-lg" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white">GarageWala</span>
                    <p className="text-sm text-gray-400">Premium Doorstep Service</p>
                  </div>
                </div>

                {/* City Selector Mobile */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-2xl p-4 border border-emerald-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white block">Service City</label>
                      <p className="text-xs text-gray-300">Choose your location</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map(city => (
                      <motion.button
                        key={city}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCity(city)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedCity === city 
                            ? 'bg-emerald-500 text-white shadow-md' 
                            : 'bg-white/10 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-400'
                        }`}
                      >
                        {city}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="bg-emerald-500/10 rounded-xl p-4 text-center"
                    whileHover={{ 
                      scale: 1.05
                    }}
                    style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    </motion.div>
                    <motion.p 
                      className="text-lg font-bold text-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    >
                      4.9★
                    </motion.p>
                    <p className="text-xs text-gray-300">Rating</p>
                  </motion.div>
                  <motion.div 
                    className="bg-green-500/10 rounded-xl p-4 text-center"
                    whileHover={{ 
                      scale: 1.05
                    }}
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    </motion.div>
                    <motion.p 
                      className="text-lg font-bold text-green-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    >
                      100%
                    </motion.p>
                    <p className="text-xs text-gray-300">Quality</p>
                  </motion.div>
                </motion.div>

                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.scrollTo) {
                          setTimeout(() => {
                            const element = document.getElementById(item.scrollTo!);
                            if (element) {
                              element.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }
                          }, 300);
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                          location === item.href
                            ? 'bg-emerald-500/20 text-emerald-400 shadow-lg'
                            : 'text-gray-300 hover:bg-white/10 hover:shadow-md'
                        }`}
                        data-testid={`nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <motion.span 
                          className="text-lg font-medium"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {item.name}
                        </motion.span>
                        {item.badge && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: index * 0.1 + 0.4,
                              type: "spring",
                              stiffness: 300
                            }}
                          >
                            <Badge className="bg-emerald-500 text-white text-xs px-2 py-1">
                              {item.badge}
                            </Badge>
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  className="space-y-3 pt-4 border-t border-white/20"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: navigation.length * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <Link href="/track" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10 py-3 rounded-xl font-medium"
                      data-testid="button-mobile-track-order"
                    >
                      Track Order
                    </Button>
                  </Link>
                  
                  <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Zap className="w-4 h-4" />
                        </motion.div>
                        Book Service Now
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Help Section */}
                <motion.div 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: navigation.length * 0.1 + 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.02
                  }}
                  style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <motion.p 
                    className="text-sm font-medium text-white mb-2"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigation.length * 0.1 + 0.6 }}
                  >
                    Need Help?
                  </motion.p>
                  <motion.div 
                    className="flex items-center space-x-2 text-emerald-400"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navigation.length * 0.1 + 0.7 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Phone className="w-4 h-4" />
                    </motion.div>
                    <span className="font-medium">+91 98765 43210</span>
                  </motion.div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </nav>
    </motion.header>
  );
}