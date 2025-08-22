import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Phone, MapPin, Zap, Shield, Star, ChevronDown } from 'lucide-react';
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
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wrench className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  GarageWala
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1">Premium Doorstep Service</span>
              </div>
            </motion.div>
          </Link>

          {/* City Selector */}
          <div className="hidden sm:block relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-700">{selectedCity}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            <AnimatePresence>
              {showCityDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
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
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select City</label>
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
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
