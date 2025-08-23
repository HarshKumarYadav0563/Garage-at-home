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
  const [location] = useLocation();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', badge: null },
    { name: 'Services', href: '/services', badge: 'Popular' },
    { name: 'Track Order', href: '/track', badge: null },
    { name: 'How It Works', href: '/#how-it-works', badge: null },
    { name: 'Contact', href: '/contact', badge: null },
  ];

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'];
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl'
          : 'bg-white/90 backdrop-blur-lg'
      }`}
    >
      {/* Top Bar with City and Phone */}
      <div className={`border-b border-gray-200/30 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 sm:h-10 text-xs sm:text-sm">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Available in {cities.length}+ cities</span>
                <span className="sm:hidden">{cities.length}+ Cities</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-gray-700 font-medium">4.9/5</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-600 font-medium">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Wrench className="text-white text-lg sm:text-xl" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  GarageWala
                </span>
                <span className="hidden sm:block text-xs text-gray-500 font-medium -mt-1">Premium Doorstep Service</span>
              </div>
            </motion.div>
          </Link>

          {/* City Selector */}
          <div className="hidden sm:flex md:block relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/60 hover:border-primary-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-primary-200 group-hover:to-blue-200 transition-colors">
                <MapPin className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 font-medium leading-none">Service City</span>
                <span className="font-semibold text-gray-800 text-sm leading-tight">{selectedCity}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showCityDropdown ? 'rotate-180' : ''}`} />
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
                    className="absolute top-14 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>Select Your City</span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Choose your location for doorstep service</p>
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
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-all duration-150 flex items-center space-x-3 group ${
                            selectedCity === city ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:text-primary-600'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            selectedCity === city 
                              ? 'bg-primary-100 text-primary-600' 
                              : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium block">{city}</span>
                            <span className="text-xs text-gray-500">Available for service</span>
                          </div>
                          {selectedCity === city && (
                            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        Don't see your city? <span className="text-primary-600 font-medium cursor-pointer hover:underline">Request service</span>
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative cursor-pointer"
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className={`font-medium transition-colors ${
                    location === item.href
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-8 bg-primary-500 text-white text-xs px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                  {location === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <Link href="/track">
                <Button
                  variant="outline"
                  className="border-primary-200 text-primary-600 hover:bg-primary-50 px-6 py-2.5 rounded-xl font-medium"
                  data-testid="button-track-order"
                >
                  Track Order
                </Button>
              </Link>
              
              <Link href="/book">
                <Button
                  className="bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 relative overflow-hidden"
                  data-testid="button-book-now"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Book Now</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Wrench className="text-white text-lg" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-800">GarageWala</span>
                    <p className="text-sm text-gray-500">Premium Doorstep Service</p>
                  </div>
                </div>

                {/* City Selector Mobile */}
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-4 border border-primary-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-800 block">Service City</label>
                      <p className="text-xs text-gray-600">Choose your location</p>
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
                            ? 'bg-primary-500 text-white shadow-md' 
                            : 'bg-white text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                        }`}
                      >
                        {city}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-xl p-4 text-center">
                    <Star className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-primary-600">4.9★</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-green-600">100%</p>
                    <p className="text-xs text-gray-600">Quality</p>
                  </div>
                </div>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                        location === item.href
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge className="bg-primary-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>
                  </Link>
                ))}
                
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Link href="/track" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-primary-200 text-primary-600 hover:bg-primary-50 py-3 rounded-xl font-medium"
                      data-testid="mobile-button-track"
                    >
                      Track Your Order
                    </Button>
                  </Link>
                  
                  <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      className="w-full bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold"
                      data-testid="mobile-button-book-now"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Book Service Now
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Need Help?</p>
                  <div className="flex items-center space-x-2 text-primary-600">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
