import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Menu, X, Phone, MapPin, Shield, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useUiStore } from '@/stores/useUiStore';
import { NCR_CITIES, VEHICLES, CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

export function ProfessionalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm font-medium">
          <Shield className="w-4 h-4 mr-2" />
          India's #1 Doorstep Vehicle Service • 25,000+ Happy Customers • 100% Guaranteed
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Garage At Home</h1>
              <p className="text-xs text-gray-600 -mt-1">Premium Vehicle Service</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${
                      location === item.href ? 'text-emerald-600' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Phone className="w-4 h-4 mr-1" />
              <span className="font-medium">+91 9999-GARAGE</span>
            </div>
            <Button className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white px-6">
              Book Service
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-700 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <div className="ml-4 space-y-2 mt-2">
                        {item.dropdownItems?.slice(0, 4).map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block py-1 text-sm text-gray-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white">
                    Book Service Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}