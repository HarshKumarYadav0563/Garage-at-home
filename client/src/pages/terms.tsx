import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale } from 'lucide-react';

export default function Terms() {
  const sections = [
    {
      icon: FileText,
      title: 'Service Agreement',
      content: [
        'Garage At Home provides doorstep vehicle maintenance and repair services',
        'Services are performed by qualified and verified mechanics',
        'All services are subject to availability in your location',
        'Service quality is guaranteed as per our service standards',
        'Additional charges may apply for parts and materials used'
      ]
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'Provide accurate vehicle and contact information',
        'Ensure safe access to vehicle location for our mechanics',
        'Be present or designate an authorized person during service',
        'Pay for services as per agreed pricing and terms',
        'Report any issues or concerns within 24 hours of service completion'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: [
        'Payment is due upon completion of service',
        'We accept cash, cards, and digital payment methods',
        'Service charges are as quoted at the time of booking',
        'Additional parts/materials will be charged separately',
        'Refunds are processed as per our refund policy'
      ]
    },
    {
      icon: Shield,
      title: 'Service Warranty',
      content: [
        '7-day quality guarantee on all services performed',
        'Free re-service if you are not satisfied with the work',
        'Warranty covers workmanship, not normal wear and tear',
        'Parts warranty as per manufacturer terms',
        'Warranty void if vehicle is serviced elsewhere within warranty period'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Limitations & Liability',
      content: [
        'Our liability is limited to the cost of the service provided',
        'We are not responsible for pre-existing vehicle conditions',
        'Not liable for damages due to customer negligence or misuse',
        'Force majeure events may affect service delivery',
        'Some complex repairs may require workshop facilities'
      ]
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      content: [
        'Any disputes will be first addressed through customer support',
        'Mediation will be attempted before legal proceedings',
        'Governing law is the jurisdiction of service location',
        'Arbitration may be required for certain disputes',
        'Customer feedback and escalation process is available'
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 mb-4">
            Please read these terms carefully before using our services. By booking a service, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 25, 2024 | Effective Date: January 1, 2024
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    These terms constitute a legally binding agreement between you and Garage At Home. 
                    If you do not agree with any part of these terms, please do not use our services. 
                    We reserve the right to modify these terms at any time, and such modifications will be 
                    effective immediately upon posting on our website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Terms?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these terms of service, please contact our legal team.
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: legal@garageathome.com</p>
                <p className="font-medium">Phone: +91 98765 43210</p>
                <p className="font-medium">Address: 123 Service Street, Connaught Place, New Delhi 110001</p>
                <p className="text-sm text-gray-600 mt-4">
                  Business hours: Monday to Sunday, 9:00 AM to 6:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Acceptance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-white/90 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Acceptance of Terms</h3>
              <p className="text-gray-600 text-sm">
                By accessing and using Garage At Home's services, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service and our Privacy Policy. 
                If you are using our services on behalf of an organization, you represent and warrant 
                that you have the authority to bind that organization to these terms.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
