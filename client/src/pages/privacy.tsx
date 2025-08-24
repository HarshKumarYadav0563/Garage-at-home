import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, UserCheck, Bell, Trash2 } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal information such as name, phone number, and address when you book a service',
        'Vehicle information including make, model, and service requirements',
        'Location data when you use our location-based services',
        'Communication records when you contact our customer support',
        'Usage data to improve our services and user experience'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and manage your vehicle service bookings',
        'To connect you with qualified mechanics in your area',
        'To send service updates and tracking information',
        'To process payments and maintain transaction records',
        'To improve our services and develop new features',
        'To comply with legal obligations and regulations'
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We share your contact details with assigned mechanics only',
        'Location information is shared to enable doorstep service',
        'Payment information is processed by secure third-party processors',
        'We never sell your personal information to third parties',
        'Data may be shared with authorities if legally required'
      ]
    },
    {
      icon: UserCheck,
      title: 'Data Security',
      content: [
        'All data is encrypted during transmission and storage',
        'Access to personal information is restricted to authorized personnel',
        'Regular security audits and updates to protect your data',
        'Secure payment processing through certified providers',
        'Two-factor authentication for administrative access'
      ]
    },
    {
      icon: Bell,
      title: 'Your Rights',
      content: [
        'Access and review your personal information anytime',
        'Request correction of inaccurate or incomplete data',
        'Opt-out of marketing communications',
        'Request deletion of your data (subject to legal requirements)',
        'File complaints with data protection authorities'
      ]
    },
    {
      icon: Trash2,
      title: 'Data Retention',
      content: [
        'Service records are kept for 3 years for warranty purposes',
        'Financial records maintained as per legal requirements',
        'Communication logs retained for 1 year',
        'Location data is deleted after service completion',
        'Inactive accounts are archived after 2 years of inactivity'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 mb-4">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 25, 2024
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-lg border border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4" data-testid={`section-title-${index}`}>
                        {section.title}
                      </h2>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                            data-testid={`section-item-${index}-${itemIndex}`}
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this privacy policy or how we handle your data, 
                please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: privacy@garagewala.com</p>
                <p className="font-medium">Phone: +91 98765 43210</p>
                <p className="text-sm text-gray-600">
                  Our privacy team typically responds within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Policy Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-white/90 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Policy Updates</h3>
              <p className="text-gray-600 text-sm">
                We may update this privacy policy from time to time. We will notify you of any 
                material changes by email or through our service. Your continued use of our 
                services after such modifications will constitute your acknowledgment of the 
                modified privacy policy.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
