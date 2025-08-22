import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Clock, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function Refund() {
  const policies = [
    {
      icon: RefreshCw,
      title: 'Refund Eligibility',
      content: [
        'Service not performed as per agreed specifications',
        'Mechanic failed to arrive within the scheduled time slot',
        'Service quality does not meet our guaranteed standards',
        'Parts/materials charged but not used in the service',
        'Service cancelled by GarageWala due to unforeseen circumstances'
      ]
    },
    {
      icon: Clock,
      title: 'Refund Timeline',
      content: [
        'Refund requests must be raised within 24 hours of service completion',
        'Investigation and processing takes 2-3 business days',
        'Bank transfers are processed within 5-7 business days',
        'Credit card refunds appear within 5-10 business days',
        'Digital wallet refunds are usually instant to 24 hours'
      ]
    },
    {
      icon: CreditCard,
      title: 'Refund Methods',
      content: [
        'Refunds are processed to the original payment method',
        'Bank transfers available for cash payments (with account details)',
        'Store credit option available for faster processing',
        'Partial refunds for services partially completed',
        'Processing fees may be deducted for payment gateway charges'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Full Refund Scenarios',
      content: [
        'Service completely cancelled before mechanic arrival',
        'Major service failure that cannot be rectified',
        'Wrong service performed due to our error',
        'Safety concerns that prevent service completion',
        'Customer dissatisfaction with zero service value delivered'
      ]
    },
    {
      icon: XCircle,
      title: 'Non-Refundable Scenarios',
      content: [
        'Customer not available at scheduled time (no-show)',
        'Service cancelled by customer after mechanic has arrived',
        'Refusal to pay for completed and satisfactory service',
        'Damage caused by customer negligence or interference',
        'Services rendered as per agreement and customer satisfaction'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Dispute Resolution',
      content: [
        'First level: Customer support team resolution',
        'Second level: Service manager review and decision',
        'Third level: Senior management escalation',
        'External mediation available for unresolved disputes',
        'All decisions are final and binding on both parties'
      ]
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Contact Customer Support',
      description: 'Call +91 98765 43210 or email support@garagewala.com with your tracking ID and issue details.'
    },
    {
      step: 2,
      title: 'Issue Investigation',
      description: 'Our team will investigate the issue and may contact you for additional details or evidence.'
    },
    {
      step: 3,
      title: 'Resolution Decision',
      description: 'Based on investigation, we will decide on full refund, partial refund, or re-service option.'
    },
    {
      step: 4,
      title: 'Refund Processing',
      description: 'Approved refunds are processed within 2-3 business days to your original payment method.'
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Refund Policy</h1>
          <p className="text-xl text-gray-600 mb-4">
            We strive for 100% customer satisfaction. If you're not happy with our service, we'll make it right.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 25, 2024
          </p>
        </motion.div>

        {/* Refund Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">How to Request a Refund</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {refundProcess.map((process, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {process.step}
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`process-title-${index}`}>
                      {process.title}
                    </h3>
                    <p className="text-sm text-gray-600" data-testid={`process-description-${index}`}>
                      {process.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Policy Details */}
        <div className="space-y-8">
          {policies.map((policy, index) => (
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
                      <policy.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4" data-testid={`policy-title-${index}`}>
                        {policy.title}
                      </h2>
                      <ul className="space-y-3">
                        {policy.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                            data-testid={`policy-item-${index}-${itemIndex}`}
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

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Refund requests must be genuine and supported by valid reasons</li>
                    <li>• False or fraudulent refund claims may result in service termination</li>
                    <li>• We reserve the right to investigate all refund requests thoroughly</li>
                    <li>• Bank charges or payment gateway fees may be deducted from refunds</li>
                    <li>• Refund policy may vary for promotional or discounted services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Need Help with a Refund?</h2>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help resolve any issues quickly and fairly.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="text-sm text-gray-600 mb-1">📞 Phone: +91 98765 43210</p>
                  <p className="text-sm text-gray-600 mb-1">📧 Email: support@garagewala.com</p>
                  <p className="text-sm text-gray-600">🕒 Hours: 24/7 Support Available</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What to Include</h4>
                  <p className="text-sm text-gray-600 mb-1">• Your tracking ID</p>
                  <p className="text-sm text-gray-600 mb-1">• Detailed description of the issue</p>
                  <p className="text-sm text-gray-600 mb-1">• Photos or evidence if applicable</p>
                  <p className="text-sm text-gray-600">• Preferred refund method</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
