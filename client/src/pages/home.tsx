import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseGarageathome } from '@/components/WhyChooseGarageathome';
import { ServicesSection } from '@/components/ServicesSection';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EnhancedTestimonials } from '@/components/EnhancedTestimonials';
import { EnhancedFAQ } from '@/components/EnhancedFAQ';
import { EnhancedTrustBar } from '@/components/EnhancedTrustBar';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Hero />
      <EnhancedTrustBar />
      <HowItWorks />
      <WhyChooseGarageathome />
      <ServicesSection />
      <EnhancedTestimonials />
      <EnhancedFAQ />
    </div>
  );
}