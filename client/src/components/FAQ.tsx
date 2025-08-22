import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    id: 'faq-1',
    question: 'How do I book a service?',
    answer: 'Simply select your vehicle type, choose the service you need, share your location, pick a time slot, and provide your contact details. Our mechanic will arrive at your doorstep at the scheduled time.'
  },
  {
    id: 'faq-2', 
    question: 'What are your service charges?',
    answer: 'Our pricing is transparent with no hidden charges. Bike services start from ₹299 and car services from ₹599. You only pay after the service is completed to your satisfaction.'
  },
  {
    id: 'faq-3',
    question: 'How can I track my service?',
    answer: 'After booking, you\'ll receive a tracking ID. Use this ID on our tracking page to see real-time updates: service confirmed, mechanic on the way, work in progress, and completion.'
  },
  {
    id: 'faq-4',
    question: 'Do I need to create an account?',
    answer: 'No account required! We offer guest booking for your convenience. Just provide your name and phone number when booking, and you\'re all set.'
  },
  {
    id: 'faq-5',
    question: 'What if I\'m not satisfied with the service?',
    answer: 'Customer satisfaction is our priority. If you\'re not satisfied, we offer free re-service within 7 days. All our work comes with a quality guarantee.'
  }
];

export function FAQ() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our doorstep vehicle service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl px-8 py-2"
              >
                <AccordionTrigger 
                  className="text-left text-lg font-semibold hover:no-underline"
                  data-testid={`faq-question-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-gray-600 pt-2"
                  data-testid={`faq-answer-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
