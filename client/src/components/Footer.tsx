import { motion } from 'framer-motion';
import { Wrench, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, Clock } from 'lucide-react';
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
    'Ranchi',
    'Patna',
    'Jaipur',
    'Bhubaneswar',
    'Guwahati',
    'View All Cities'
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
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Wrench className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold" data-testid="footer-brand">GarageWala</span>
              </div>
              
              <p className="text-gray-300 mb-6" data-testid="footer-description">
                Professional doorstep vehicle service with expert mechanics, transparent pricing, and real-time tracking.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
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
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-300">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                    data-testid={`footer-service-${index}`}
                  >
                    {service}
                  </a>
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
            <h3 className="text-lg font-semibold mb-6">Service Areas</h3>
            <ul className="space-y-3 text-gray-300">
              {cities.map((city, index) => (
                <li key={index}>
                  <Link href={`/bike-service/${city.toLowerCase()}`}>
                    <span
                      className="hover:text-primary-400 transition-colors cursor-pointer"
                      data-testid={`footer-city-${index}`}
                    >
                      {city}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                    data-testid={`footer-company-${index}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 pt-8 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Phone className="text-primary-400" />
              <div>
                <div className="font-medium">Call Us</div>
                <div className="text-gray-300" data-testid="footer-phone">+91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-primary-400" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-300" data-testid="footer-email">support@garagewala.com</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="text-primary-400" />
              <div>
                <div className="font-medium">Service Hours</div>
                <div className="text-gray-300" data-testid="footer-hours">24/7 Available</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700 pt-8 text-center text-gray-400"
        >
          <p data-testid="footer-copyright">
            &copy; 2024 GarageWala. All rights reserved. | Made with ❤️ in India
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
