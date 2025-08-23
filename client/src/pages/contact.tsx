import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUiStore } from '@/stores/useUiStore';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+91[-\s]?)?[6-9]\d{9}$/, 'Please enter a valid Indian phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useUiStore();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'We will get back to you within 24 hours.'
      });
      
      form.reset();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to send message',
        message: 'Please try again later or call us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldReduceMotion = useReducedMotion();

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 98765 43210',
      description: '24/7 Customer Support',
      color: 'from-emerald-400 to-teal-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@garageathome.com',
      description: 'We reply within 24 hours',
      color: 'from-sky-400 to-blue-600'
    },
    {
      icon: Clock,
      title: 'Service Hours',
      value: '24/7 Available',
      description: 'Emergency repairs anytime',
      color: 'from-indigo-400 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Service Areas',
      value: 'Delhi, Gurugram, Noida, Ghaziabad, Faridabad',
      description: 'Complete Delhi NCR coverage',
      color: 'from-violet-400 to-pink-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 pt-20 lg:pt-24 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-emerald-300/30 to-sky-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200,
              duration: 0.8
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-3xl mb-8 shadow-2xl"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
            Get in Touch
          </h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Have questions about our doorstep vehicle service? We're here to help! 
            Our expert team is ready to assist you 24/7.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-white flex items-center space-x-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Users className="w-8 h-8 text-emerald-400" />
              <span>Contact Information</span>
            </motion.h2>
            
            <div className="grid gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="group"
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500">
                    <CardContent className="p-6 relative">
                      {/* Animated gradient border */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                        style={{ 
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'subtract',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'subtract'
                        }}
                      />
                      
                      <div className="flex items-start space-x-4 relative">
                        <motion.div 
                          className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-xl`}
                          whileHover={shouldReduceMotion ? {} : { 
                            scale: 1.1, 
                            rotate: 5,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <info.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                          <motion.h3 
                            className="font-semibold text-xl mb-2 text-white group-hover:text-gray-100 transition-colors" 
                            data-testid={`contact-title-${index}`}
                          >
                            {info.title}
                          </motion.h3>
                          <motion.p 
                            className="text-emerald-400 font-medium text-lg mb-1" 
                            data-testid={`contact-value-${index}`}
                          >
                            {info.value}
                          </motion.p>
                          <motion.p 
                            className="text-gray-300 text-sm leading-relaxed" 
                            data-testid={`contact-description-${index}`}
                          >
                            {info.description}
                          </motion.p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Service Areas Map */}
            <motion.div
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500">
                <CardContent className="p-6">
                  <motion.h3 
                    className="font-semibold text-xl mb-6 text-white flex items-center space-x-2"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <MapPin className="w-6 h-6 text-emerald-400" />
                    <span>Our Service Areas</span>
                  </motion.h3>
                  
                  <motion.div 
                    className="aspect-video bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-white/10"
                    whileHover={shouldReduceMotion ? {} : { 
                      backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(14, 165, 233, 0.3), rgba(99, 102, 241, 0.3))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={shouldReduceMotion ? {} : { 
                          y: [-5, 5, -5],
                          rotate: [-2, 2, -2]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <MapPin className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                      </motion.div>
                      <motion.p 
                        className="text-gray-200 text-lg font-medium mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Premium Doorstep Service
                      </motion.p>
                      <motion.p 
                        className="text-sm text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        Delhi • Gurugram • Noida • Ghaziabad • Faridabad
                      </motion.p>
                      <motion.div
                        className="mt-4 flex justify-center space-x-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-emerald-400 rounded-full"
                            animate={shouldReduceMotion ? {} : {
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.01,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500">
                <CardContent className="p-8">
                  <motion.h2 
                    className="text-3xl font-bold mb-8 text-white flex items-center space-x-3"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Send className="w-8 h-8 text-emerald-400" />
                    <span>Send us a Message</span>
                  </motion.h2>
                
                  <Form {...form}>
                    <motion.form 
                      onSubmit={form.handleSubmit(onSubmit)} 
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200 font-medium">Full Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your full name"
                                    className="px-4 py-3 rounded-xl bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                    data-testid="input-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200 font-medium">Phone Number *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    className="px-4 py-3 rounded-xl bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                    data-testid="input-phone"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200 font-medium">Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="px-4 py-3 rounded-xl bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                  data-testid="input-email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200 font-medium">Subject *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="What is this regarding?"
                                  className="px-4 py-3 rounded-xl bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                  data-testid="input-subject"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.0 }}
                      >
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200 font-medium">Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please describe your inquiry in detail..."
                                  rows={4}
                                  className="px-4 py-3 rounded-xl resize-none bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                                  data-testid="textarea-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                          data-testid="button-send-message"
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            style={{ borderRadius: 'inherit' }}
                          />
                          <span className="relative z-10 flex items-center justify-center space-x-2">
                            {isSubmitting ? (
                              <>
                                <motion.div 
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Sending Message...</span>
                              </>
                            ) : (
                              <>
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Send className="w-5 h-5" />
                                </motion.div>
                                <span>Send Message</span>
                              </>
                            )}
                          </span>
                        </Button>
                      </motion.div>
                    </motion.form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div className="flex justify-center items-center space-x-8 md:space-x-12 mb-8">
            {[
              { icon: Users, label: "10,000+ Happy Customers", color: "text-emerald-400" },
              { icon: Zap, label: "24/7 Support", color: "text-sky-400" },
              { icon: MapPin, label: "5+ Cities", color: "text-indigo-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    y: [-2, 2, -2],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </motion.div>
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Your trusted partner for premium doorstep vehicle service
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
