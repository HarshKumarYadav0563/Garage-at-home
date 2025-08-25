import { motion } from 'framer-motion';
import { Wrench, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, Clock, MapPin, Star, Shield, Car, Bike } from 'lucide-react';
import { Link } from 'wouter';
import { NCR_CITIES, VEHICLES, CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';

export function Footer() {
  // SEO-optimized service categories
  const bikeServices = [
    'Bike Oil Change',
    'Bike Battery Repair', 
    'Bike Chain Service',
    'Bike Brake Check',
    'Bike General Service',
    'Bike Emergency Repair'
  ];

  const carServices = [
    'Car Oil Change',
    'Car AC Service',
    'Car Battery Repair',
    'Car Brake Service', 
    'Car General Service',
    'Car Wash & Detailing'
  ];

  // City-specific SEO keywords
  const cityServiceKeywords = NCR_CITIES.map(city => ({
    city,
    displayName: CITY_DISPLAY_NAMES[city],
    services: [
      `Doorstep Vehicle Service ${CITY_DISPLAY_NAMES[city]}`,
      `${CITY_DISPLAY_NAMES[city]} Mobile Mechanic`,
      `Car Bike Repair ${CITY_DISPLAY_NAMES[city]}`,
      `Home Service ${CITY_DISPLAY_NAMES[city]}`
    ]
  }));

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

            {/* Four SEO-Optimized Sections */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Bike Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm md:text-lg font-semibold mb-3 md:mb-4 text-white dark:text-gray-100 flex items-center space-x-2">
                  <Bike className="w-4 h-4 text-emerald-400" />
                  <span>Bike Services</span>
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {bikeServices.map((service, index) => (
                    <li key={index}>
                      <Link href="/services/bike/delhi">
                        <span
                          className="text-xs md:text-sm text-gray-300 dark:text-gray-300 hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer flex items-center space-x-1 md:space-x-2 group"
                          data-testid={`footer-bike-service-${index}`}
                        >
                          <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="leading-tight">{service}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Car Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-sm md:text-lg font-semibold mb-3 md:mb-4 text-white dark:text-gray-100 flex items-center space-x-2">
                  <Car className="w-4 h-4 text-sky-400" />
                  <span>Car Services</span>
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {carServices.map((service, index) => (
                    <li key={index}>
                      <Link href="/services/car/delhi">
                        <span
                          className="text-xs md:text-sm text-gray-300 dark:text-gray-300 hover:text-sky-400 dark:hover:text-sky-300 transition-colors cursor-pointer flex items-center space-x-1 md:space-x-2 group"
                          data-testid={`footer-car-service-${index}`}
                        >
                          <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-sky-500 dark:bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="leading-tight">{service}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Delhi-NCR Cities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm md:text-lg font-semibold mb-3 md:mb-4 text-white dark:text-gray-100 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Delhi-NCR</span>
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {NCR_CITIES.map((city, index) => (
                    <li key={index}>
                      <Link href={`/services/bike/${city}`}>
                        <span
                          className="text-xs md:text-sm text-gray-300 dark:text-gray-300 hover:text-orange-400 dark:hover:text-orange-300 transition-colors cursor-pointer flex items-center space-x-1 md:space-x-2 group"
                          data-testid={`footer-ncr-city-${index}`}
                        >
                          <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 dark:bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="leading-tight">{CITY_DISPLAY_NAMES[city]}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-1 md:pt-2 border-t border-gray-700 dark:border-gray-600">
                    <Link href="/services">
                      <span className="text-xs md:text-sm text-orange-400 dark:text-orange-300 hover:text-orange-300 dark:hover:text-orange-200 transition-colors cursor-pointer font-medium">
                        View All Services →
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
                transition={{ delay: 0.25 }}
              >
                <h3 className="text-sm md:text-lg font-semibold mb-3 md:mb-4 text-white dark:text-gray-100">Company</h3>
                <ul className="space-y-1 md:space-y-2">
                  {company.map((item, index) => (
                    <li key={index}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                        <span
                          className="text-xs md:text-sm text-gray-300 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-300 transition-colors cursor-pointer flex items-center space-x-1 md:space-x-2 group"
                          data-testid={`footer-company-${index}`}
                        >
                          <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="leading-tight">{item}</span>
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

      {/* SEO Keywords Section */}
      <div className="border-b border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Popular Services by City</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityServiceKeywords.slice(0, 3).map((cityData, index) => (
                <div key={cityData.city} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                  <h4 className="font-semibold text-emerald-400 mb-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{cityData.displayName}</span>
                  </h4>
                  <ul className="space-y-1">
                    {cityData.services.map((service, serviceIndex) => (
                      <li key={serviceIndex}>
                        <Link href={`/services/bike/${cityData.city}`}>
                          <span className="text-xs text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                            {service}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vehicle + City Combinations for SEO */}
      <div className="border-b border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">Quick Access:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {VEHICLES.flatMap(vehicle => 
                  NCR_CITIES.map(city => (
                    <Link key={`${vehicle}-${city}`} href={`/services/${vehicle}/${city}`}>
                      <span className="inline-block px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer border border-gray-700/50 hover:border-emerald-500/30">
                        {VEHICLE_DISPLAY_NAMES[vehicle]} {CITY_DISPLAY_NAMES[city]}
                      </span>
                    </Link>
                  ))
                )}
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
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-4 text-gray-400 dark:text-gray-400 text-sm">
            <p data-testid="footer-copyright">
              &copy; 2024 Garage At Home. All rights reserved.
            </p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center space-x-1">
              <span>Delhi-NCR's Premier</span>
              <span className="text-emerald-400 font-semibold">Doorstep Service</span>
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

      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Garage At Home",
            "description": "Delhi-NCR's premium doorstep vehicle service platform. Professional bike and car repair services at your location.",
            "url": "https://garagewala.com",
            "telephone": "+91-98765-43210",
            "email": "support@garagewala.com",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Delhi-NCR",
              "addressCountry": "IN"
            },
            "areaServed": NCR_CITIES.map(city => CITY_DISPLAY_NAMES[city]),
            "serviceType": ["Vehicle Repair", "Bike Service", "Car Service", "Doorstep Service", "Mobile Mechanic"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Vehicle Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Doorstep Bike Service",
                    "description": "Professional bike repair and maintenance services at your location"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Doorstep Car Service",
                    "description": "Expert car repair and maintenance services at your home or office"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2500"
            },
            "openingHours": "Mo-Su 00:00-23:59"
          })
        }}
      />
    </footer>
  );
}
