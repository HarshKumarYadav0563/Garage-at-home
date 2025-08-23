import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
}

export function ScrollAnimationWrapper({ 
  children, 
  delay = 0, 
  yOffset = 20 
}: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay 
      }}
    >
      {children}
    </motion.div>
  );
}

// Example usage with staggered delays:
/*
// Basic usage
<ScrollAnimationWrapper>
  <h2 className="text-3xl font-bold">Why Choose Us</h2>
</ScrollAnimationWrapper>

// With custom delay and offset
<ScrollAnimationWrapper delay={0.2} yOffset={30}>
  <p className="text-lg text-gray-600">Professional services delivered to your door</p>
</ScrollAnimationWrapper>

// Staggered grid items
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <ScrollAnimationWrapper key={feature.id} delay={index * 0.1}>
      <FeatureCard {...feature} />
    </ScrollAnimationWrapper>
  ))}
</div>

// Section with multiple elements
<section className="py-16">
  <ScrollAnimationWrapper>
    <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
  </ScrollAnimationWrapper>
  
  <ScrollAnimationWrapper delay={0.2}>
    <p className="text-xl text-center text-gray-600 mb-12">
      Professional maintenance delivered to your doorstep
    </p>
  </ScrollAnimationWrapper>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <ScrollAnimationWrapper delay={0.4}>
      <ServiceCard type="bike" />
    </ScrollAnimationWrapper>
    
    <ScrollAnimationWrapper delay={0.6}>
      <ServiceCard type="car" />
    </ScrollAnimationWrapper>
  </div>
</section>
*/