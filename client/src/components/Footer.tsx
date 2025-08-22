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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Wrench className="text-white text-xl" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold" data-testid="footer-brand">GarageWala</span>
                    <p className="text-sm text-gray-400">Premium Doorstep Service</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed" data-testid="footer-description">
                  India's first premium doorstep vehicle service platform. Professional mechanics, transparent pricing, real-time tracking, and guaranteed quality.
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Quality Assured</span>
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
                      className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all duration-200 hover:scale-110"
                      data-testid={`social-link-${index}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href="/services">
                      <span
                        className="text-gray-300 hover:text-primary-400 transition-colors cursor-pointer flex items-center space-x-2 group"
                        data-testid={`footer-service-${index}`}
                      >
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
              <h3 className="text-lg font-semibold mb-6 text-white">Service Cities</h3>
              <ul className="space-y-3">
                {cities.map((city, index) => (
                  <li key={index}>
                    <Link href={`/${city.toLowerCase()}`}>
                      <span
                        className="text-gray-300 hover:text-primary-400 transition-colors cursor-pointer flex items-center space-x-2 group"
                        data-testid={`footer-city-${index}`}
                      >
                        <MapPin className="w-3 h-3 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{city}</span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-700">
                  <Link href="/cities">
                    <span className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer font-medium">
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
              <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                      <span
                        className="text-gray-300 hover:text-primary-400 transition-colors cursor-pointer flex items-center space-x-2 group"
                        data-testid={`footer-company-${index}`}
                      >
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
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

      {/* Contact Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="text-primary-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div className="text-gray-300 text-sm" data-testid="footer-phone">+91 98765 43210</div>
                    <div className="text-xs text-gray-400">Available 24/7</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-gray-300 text-sm" data-testid="footer-email">support@garagewala.com</div>
                    <div className="text-xs text-gray-400">Quick response</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Service Hours</div>
                    <div className="text-gray-300 text-sm" data-testid="footer-hours">24/7 Available</div>
                    <div className="text-xs text-gray-400">Emergency support</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <p data-testid="footer-copyright">
              &copy; 2024 GarageWala. All rights reserved.
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
              <span className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-gray-400 hover:text-primary-400 transition-colors cursor-pointer">Terms of Service</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
