import { ProfessionalHero } from '@/components/ProfessionalHero';
import { CorporateTrustBar } from '@/components/CorporateTrustBar';
import { ProfessionalHowItWorks } from '@/components/ProfessionalHowItWorks';
import { WhyChooseGarageAtHome } from '@/components/WhyChooseGarageAtHome';
import { ServicesSection } from '@/components/ServicesSection';
import { CorporateBackground } from '@/components/CorporateBackground';
import { EnhancedTestimonials } from '@/components/EnhancedTestimonials';
import { EnhancedFAQ } from '@/components/EnhancedFAQ';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CorporateBackground />
      <ProfessionalHero />
      <CorporateTrustBar />
      <ProfessionalHowItWorks />
      <WhyChooseGarageAtHome />
      <ServicesSection />
      <EnhancedTestimonials />
      <EnhancedFAQ />
    </div>
  );
}