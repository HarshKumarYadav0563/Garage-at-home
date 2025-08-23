import { motion } from 'framer-motion';
import { Wrench, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, Clock, MapPin, Star, Shield } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  const services = [
    'Bike Service',
    'Car Service', 
    'Oil Change',
    'Brake Repair',
    'AC Service',
    'Emergency Repair'
  ];

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Pune',
    'Chennai',
    'Hyderabad'
  ];

  const company = [
    'About Us',
    'Contact',
    'Careers',
    'Privacy Policy',
    'Terms of Service',
    'Refund Policy'
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white">
      {/* Top Section */}
      <div className="border-b border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    {/* Enhanced Footer Logo */}
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Layered Design */}
                      <div className="relative">
                        {/* Background Shape */}
                        <div className="absolute inset-0 bg-white/10 rounded-lg w-7 h-7"></div>
                        
                        {/* Main Icon */}
                        <Wrench className="relative z-10 text-white text-lg" />
                        
                        {/* Home Indicator */}
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 w-4 h-4">
                          <div className="bg-emerald-500 rounded-full flex items-center justify-center w-full h-full">
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Service Status Indicator */}
                    <motion.div 
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg -z-10 w-14 h-14"></div>
                  </div>
                  
                  <div>
                    <motion.div 
                      className="flex items-center space-x-1 mb-1"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent" data-testid="footer-brand">Garage</span>
                      <span className="text-2xl font-bold text-white">@</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">Home</span>
                    </motion.div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-gray-400 font-medium">Premium</span>
                      <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                      <span className="text-emerald-400 font-semibold">Doorstep</span>
                      <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                      <span className="text-orange-400 font-medium">Service</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 dark:text-gray-200 mb-4 leading-relaxed" data-testid="footer-description">
                  India's first premium doorstep vehicle service platform. Professional mechanics, transparent pricing, real-time tracking, and guaranteed quality.
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
                    <span className="text-gray-300 dark:text-gray-200">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-400 dark:text-green-300" />
                    <span className="text-gray-300 dark:text-gray-200">Quality Assured</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { Icon: Facebook, href: "#", label: "Facebook" },
                    { Icon: Twitter, href: "#", label: "Twitter" },
                    { Icon: Instagram, href: "#", label: "Instagram" },
                    { Icon: Linkedin, href: "#", label: "LinkedIn" }
                  ].map(({ Icon, href, label }, index) => (
                    <a
                      key={index}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-200 hover:scale-110"
                      data-testid={`social-link-${index}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Three Sections Together */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Our Services</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link href="/services">
                        <span
                          className="text-gray-300 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer flex items-center space-x-2 group"
                          data-testid={`footer-service-${index}`}
                        >
                          <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>{service}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Service Cities</h3>
                <ul className="space-y-2">
                  {cities.map((city, index) => (
                    <li key={index}>
                      <Link href={`/${city.toLowerCase()}`}>
                        <span
                          className="text-gray-300 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer flex items-center space-x-2 group"
                          data-testid={`footer-city-${index}`}
                        >
                          <MapPin className="w-3 h-3 text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{city}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2 border-t border-gray-700 dark:border-gray-600">
                    <Link href="/cities">
                      <span className="text-primary-400 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200 transition-colors cursor-pointer font-medium">
                        View All Cities →
                      </span>
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Company</h3>
                <ul className="space-y-2">
                  {company.map((item, index) => (
                    <li key={index}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                        <span
                          className="text-gray-300 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer flex items-center space-x-2 group"
                          data-testid={`footer-company-${index}`}
                        >
                          <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>{item}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-b border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-700/50 dark:border-gray-600/50 hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="text-primary-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-gray-100">Call Us</div>
                    <div className="text-gray-300 dark:text-gray-300 text-sm" data-testid="footer-phone">+91 98765 43210</div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">Available 24/7</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-700/50 dark:border-gray-600/50 hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-gray-100">Email</div>
                    <div className="text-gray-300 dark:text-gray-300 text-sm" data-testid="footer-email">support@garagewala.com</div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">Quick response</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 dark:bg-gray-700/50 rounded-2xl p-4 border border-gray-700/50 dark:border-gray-600/50 hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-gray-100">Service Hours</div>
                    <div className="text-gray-300 dark:text-gray-300 text-sm" data-testid="footer-hours">24/7 Available</div>
                    <div className="text-xs text-gray-400 dark:text-gray-400">Emergency support</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-4 text-gray-400 dark:text-gray-400 text-sm">
            <p data-testid="footer-copyright">
              &copy; 2024 Garage At Home. All rights reserved.
            </p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>in India</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy">
              <span className="text-gray-400 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-gray-400 dark:text-gray-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer">Terms of Service</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
