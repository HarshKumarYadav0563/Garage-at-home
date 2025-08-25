import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { getFAQsForPage, FAQ } from '@/data/faqs';
import { Helmet } from 'react-helmet-async';

interface FAQSectionProps {
  city?: string;
  vehicle?: 'bike' | 'car';
  title?: string;
  subtitle?: string;
  limit?: number;
  showSchema?: boolean;
}

export function FAQSection({ 
  city, 
  vehicle, 
  title = 'Frequently Asked Questions', 
  subtitle = 'Get quick answers to common questions about our doorstep vehicle service.',
  limit = 6,
  showSchema = true 
}: FAQSectionProps) {
  const faqs = getFAQsForPage(city, vehicle, limit);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value);
    
    // Track FAQ interaction for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      value.forEach(item => {
        const faq = faqs.find(f => f.id === item);
        if (faq) {
          (window as any).gtag('event', 'faq_opened', {
            faq_question: faq.question,
            faq_category: faq.category,
            city: city || 'all',
            vehicle: vehicle || 'all'
          });
        }
      });
    }
  };

  if (faqs.length === 0) {
    return null;
  }

  const sectionId = `faq-section-${city || 'general'}-${vehicle || 'all'}`;

  return (
    <>
      {showSchema && (
        <Helmet>
          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })}
          </script>
        </Helmet>
      )}
      
      <section 
        id={sectionId}
        className="py-16 lg:py-24 bg-gradient-to-b from-gray-900/50 to-gray-950/50"
        data-testid="faq-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              data-testid="faq-title"
            >
              {title}
            </h2>
            <p 
              className="text-xl text-gray-300 leading-relaxed"
              data-testid="faq-subtitle"
            >
              {subtitle}
            </p>
            
            {(city || vehicle) && (
              <div className="flex justify-center gap-2 mt-4">
                {city && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                    {city}
                  </span>
                )}
                {vehicle && (
                  <span className="px-3 py-1 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium capitalize">
                    {vehicle} Service
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion 
              type="multiple" 
              value={openItems}
              onValueChange={handleAccordionChange}
              className="space-y-4"
              data-testid="faq-accordion"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <AccordionItem 
                    value={faq.id} 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
                    data-testid={`faq-item-${faq.id}`}
                  >
                    <AccordionTrigger 
                      className="px-6 py-5 text-left hover:no-underline group"
                      data-testid={`faq-question-${faq.id}`}
                    >
                      <div className="flex items-start gap-4 text-left">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center mt-1">
                          <span className="text-white text-sm font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200">
                            {faq.question}
                          </h3>
                          {(faq.city || faq.vehicle) && (
                            <div className="flex gap-2 mt-2">
                              {faq.city && (
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                                  {faq.city}
                                </span>
                              )}
                              {faq.vehicle && (
                                <span className="px-2 py-1 bg-sky-500/20 text-sky-400 rounded text-xs capitalize">
                                  {faq.vehicle}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-200 group-data-[state=open]:rotate-180" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="px-6 pb-6"
                      data-testid={`faq-answer-${faq.id}`}
                    >
                      <div className="ml-10">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {faq.category && (
                          <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-sm">
                              <HelpCircle className="w-3 h-3 mr-1" />
                              {faq.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-2xl p-8 border border-emerald-500/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-6">
                Our customer support team is available 24/7 to help you with any questions about our doorstep vehicle service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+91-9999999999"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="faq-call-button"
                >
                  Call Now: +91-9999999999
                </motion.a>
                <motion.a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20your%20service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="faq-whatsapp-button"
                >
                  WhatsApp Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}