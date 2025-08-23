import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseGarageAtHome } from '@/components/WhyChooseGarageAtHome';
import { ServicesSection } from '@/components/ServicesSection';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EnhancedTestimonials } from '@/components/EnhancedTestimonials';
import { EnhancedFAQ } from '@/components/EnhancedFAQ';
import { EnhancedTrustBar } from '@/components/EnhancedTrustBar';
import { ScrollIndicator } from '@/components/ScrollIndicator';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Hero />
      <ScrollIndicator />
      <EnhancedTrustBar />
      <HowItWorks />
      <WhyChooseGarageAtHome />
      <ServicesSection />
      <EnhancedTestimonials />
      <EnhancedFAQ />
    </div>
  );
}