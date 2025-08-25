import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Phone, MapPin, Zap, Shield, Star, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useUiStore } from '@/stores/useUiStore';
import { NCR_CITIES, VEHICLES, CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

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

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const navigation = [
    { 
      name: 'Services', 
      href: '/services', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Services', href: '/services' },
        { name: 'Pricing', href: '/pricing' },
        ...VEHICLES.flatMap(vehicle => 
          NCR_CITIES.map(city => ({
            name: `${VEHICLE_DISPLAY_NAMES[vehicle]} • ${CITY_DISPLAY_NAMES[city]}`,
            href: `/services/${vehicle}/${city}`,
            vehicle,
            city
          }))
        )
      ]
    },
    {
      name: 'Learn',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Blog', href: '/blog' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Videos', href: '/videos' },
        { name: 'Testimonials', href: '/testimonials' }
      ]
    },
    { name: 'Track', href: '/track' },
    { name: 'Contact', href: '/contact' },
    {
      name: 'More',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Admin', href: '/admin' }
      ]
    }
  ] as Array<{ 
    name: string; 
    href: string; 
    scrollTo?: string;
    hasDropdown?: boolean;
    dropdownItems?: Array<{name: string, href: string, vehicle?: string, city?: string}>
  }>;


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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-gray-950/98 backdrop-blur-xl border-b border-gray-800 shadow-lg'
          : 'bg-gray-950/95 backdrop-blur-lg'
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
                <span className="hidden sm:inline">Available in 6+ cities</span>
                <span className="sm:hidden">6+ Cities</span>
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
                {/* Main Logo Container */}
                <motion.div 
                  className={`bg-gradient-to-br from-emerald-500 via-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 ${
                    isScrolled ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14'
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Layered Icon Design */}
                  <div className="relative">
                    {/* Background Car/Bike Shape */}
                    <div className={`absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 ${
                      isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'
                    }`}></div>
                    
                    {/* Main Wrench Icon */}
                    <Wrench className={`relative z-10 text-white transition-all duration-300 ${
                      isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                    }`} />
                    
                    {/* Small Home Icon Overlay */}
                    <div className={`absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 transition-all duration-300 ${
                      isScrolled ? 'w-2 h-2 sm:w-2.5 sm:h-2.5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
                    }`}>
                      <div className={`bg-emerald-500 rounded-full flex items-center justify-center w-full h-full`}>
                        <div className={`w-1 h-1 bg-white rounded-sm transition-all duration-300`}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Premium Service Indicator */}
                <motion.div 
                  className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isScrolled ? 'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5' : 'w-3.5 h-3.5 sm:w-4.5 sm:h-4.5'
                  }`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.8, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className={`bg-white rounded-full transition-all duration-300 ${
                    isScrolled ? 'w-1 h-1 sm:w-1.5 sm:h-1.5' : 'w-1.5 h-1.5 sm:w-2 sm:h-2'
                  }`}></div>
                </motion.div>
                
                {/* Subtle Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl blur-md -z-10 transition-all duration-300 ${
                  isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
                }`}></div>
              </div>
              <div className="flex flex-col">
                <motion.div className="flex items-center space-x-1">
                  <motion.span 
                    className={`font-bold text-emerald-400 transition-all duration-300 ${
                      isScrolled ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      filter: "drop-shadow(0px 0px 8px rgba(16, 185, 129, 0.6))"
                    }}
                  >
                    Garage
                  </motion.span>
                  <motion.span 
                    className={`font-bold text-white transition-all duration-300 ${
                      isScrolled ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#10b981"
                    }}
                  >
                    @
                  </motion.span>
                  <motion.span 
                    className={`font-bold text-white transition-all duration-300 ${
                      isScrolled ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      filter: "drop-shadow(0px 0px 8px rgba(251, 146, 60, 0.6))"
                    }}
                  >
                    Home
                  </motion.span>
                </motion.div>
                <motion.div 
                  className={`flex items-center space-x-1 -mt-1 transition-all duration-300 ${
                    isScrolled ? 'hidden' : 'hidden sm:flex text-xs'
                  }`}
                  animate={{ opacity: isScrolled ? 0 : 1 }}
                >
                  <span className="text-gray-400 font-medium">Premium</span>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <span className="text-emerald-400 font-semibold">Doorstep</span>
                  <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                  <span className="text-orange-400 font-medium">Service</span>
                </motion.div>
              </div>
            </motion.div>
          </Link>


          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center space-x-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            {navigation.map((item, index) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <motion.div
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                      className="relative cursor-pointer"
                      data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="font-medium text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-1">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className={`absolute top-8 left-0 ${item.name === 'Services' ? 'w-80' : 'w-60'} bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50`}
                        >
                          {item.name === 'Services' ? (
                            <>
                              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border-b border-white/10">
                                <h3 className="font-semibold text-white">Service Areas</h3>
                                <p className="text-sm text-gray-300 mt-1">Choose your vehicle and location</p>
                              </div>
                              <div className="max-h-80 overflow-y-auto p-2">
                                {item.dropdownItems?.map((dropdownItem, idx) => (
                                  <Link key={idx} href={dropdownItem.href}>
                                    <motion.div
                                      whileHover={{ backgroundColor: idx === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(16, 185, 129, 0.1)' }}
                                      className={`p-3 rounded-lg transition-colors ${idx === 0 ? 'text-emerald-400 font-medium border-b border-white/10 mb-2' : 'px-3 py-2 text-sm text-gray-300 hover:text-emerald-400 mx-1'}`}
                                    >
                                      {dropdownItem.name}
                                    </motion.div>
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border-b border-white/10">
                                <h3 className="font-semibold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-300 mt-1">
                                  {item.name === 'Learn' ? 'Educational resources and guides' : 'Additional information and policies'}
                                </p>
                              </div>
                              <div className="p-2">
                                {item.dropdownItems?.map((dropdownItem, idx) => (
                                  <Link key={idx} href={dropdownItem.href}>
                                    <motion.div
                                      whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                                      className="px-3 py-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors rounded-lg"
                                    >
                                      {dropdownItem.name}
                                    </motion.div>
                                  </Link>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <Link href={item.href}>
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
                      {location === item.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                )}
              </div>
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
              
              <Link href="/services">
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
            <SheetContent side="right" className="w-[85vw] xs:w-[75vw] sm:w-[60vw] md:w-[50vw] bg-gray-950 border-white/10 overflow-y-auto">
              <div className="flex flex-col space-y-2 xs:space-y-3 sm:space-y-4 mt-2 xs:mt-3 sm:mt-4 pb-3 xs:pb-4 sm:pb-6">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center py-3 xs:py-4 sm:py-5 border-b border-white/20">
                  <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 via-blue-600 to-indigo-600 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                      <Wrench className="text-white text-base xs:text-lg sm:text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-0.5 xs:space-x-1">
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-emerald-400">Garage</span>
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">@</span>
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">Home</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs xs:text-sm mt-0.5">
                        <span className="text-gray-400">Premium</span>
                        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400">Doorstep</span>
                        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400">Service</span>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Quick Stats */}
                <motion.div 
                  className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="bg-emerald-500/10 rounded-md xs:rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center"
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
                      <Star className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-emerald-400 mx-auto mb-1 xs:mb-2" />
                    </motion.div>
                    <motion.p 
                      className="text-sm xs:text-base sm:text-lg font-bold text-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    >
                      4.9★
                    </motion.p>
                    <p className="text-xs xs:text-xs sm:text-sm text-gray-300">Rating</p>
                  </motion.div>
                  <motion.div 
                    className="bg-green-500/10 rounded-md xs:rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center"
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
                      <Shield className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-1 xs:mb-2" />
                    </motion.div>
                    <motion.p 
                      className="text-sm xs:text-base sm:text-lg font-bold text-green-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                    >
                      100%
                    </motion.p>
                    <p className="text-xs xs:text-xs sm:text-sm text-gray-300">Quality</p>
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
                    className="space-y-1"
                  >
                    {item.hasDropdown ? (
                      <div>
                        <motion.div
                          whileHover={{ 
                            scale: 1.02,
                            x: 5,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
                            mobileActiveDropdown === item.name
                              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg'
                              : 'text-gray-300 hover:bg-white/10 hover:shadow-md'
                          }`}
                          onClick={() => setMobileActiveDropdown(mobileActiveDropdown === item.name ? null : item.name)}
                          data-testid={`nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <motion.span 
                            className="text-base sm:text-lg font-medium"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {item.name}
                          </motion.span>
                          <motion.div
                            animate={{ 
                              rotate: mobileActiveDropdown === item.name ? 90 : 0 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </motion.div>
                        
                        <AnimatePresence>
                          {mobileActiveDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 space-y-1">
                                {item.dropdownItems?.map((dropdownItem, idx) => (
                                  <Link 
                                    key={idx} 
                                    href={dropdownItem.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileActiveDropdown(null);
                                    }}
                                  >
                                    <motion.div
                                      whileHover={{ 
                                        x: 5,
                                        backgroundColor: "rgba(16, 185, 129, 0.1)"
                                      }}
                                      whileTap={{ scale: 0.98 }}
                                      className="p-2 sm:p-3 rounded-lg text-sm sm:text-base text-gray-400 hover:text-emerald-400 transition-all duration-200"
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      {dropdownItem.name}
                                    </motion.div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
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
                          className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 ${
                            location === item.href
                              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg'
                              : 'text-gray-300 hover:bg-white/10 hover:shadow-md'
                          }`}
                          data-testid={`nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <motion.span 
                            className="text-base sm:text-lg font-medium"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {item.name}
                          </motion.span>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div 
                  className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-white/20"
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
                  
                  <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
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