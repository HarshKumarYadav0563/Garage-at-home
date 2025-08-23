import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseGarageAtHome } from '@/components/WhyChooseGarageAtHome';
import { ServicesSection } from '@/components/ServicesSection';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EnhancedTestimonials } from '@/components/EnhancedTestimonials';
import { EnhancedFAQ } from '@/components/EnhancedFAQ';
import { EnhancedTrustBar } from '@/components/EnhancedTrustBar';
import { SEO, generateOrganizationSchema, generateLocalBusinessSchema } from '@/components/SEO';

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateLocalBusinessSchema("Delhi"),
      {
        "@type": "WebSite",
        "@id": "https://garageathome.com/#website",
        "url": "https://garageathome.com",
        "name": "Garage At Home",
        "description": "India's Premier Doorstep Vehicle Service Platform",
        "publisher": {
          "@id": "https://garageathome.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://garageathome.com/services?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://garageathome.com/"
          }
        ]
      }
    ]
  };
  return (
    <div className="min-h-screen relative">
      <SEO
        title="Garage At Home - India's First Premium Doorstep Vehicle Service | Delhi NCR"
        description="Book professional doorstep bike and car service in Delhi NCR. Certified mechanics, transparent pricing, quality assurance. Get instant quotes for vehicle maintenance and repair services at home."
        keywords="doorstep vehicle service delhi ncr, bike service at home, car service delhi, mobile mechanic, vehicle repair, garage at home, bike maintenance, car maintenance, gurugram, noida, ghaziabad, faridabad"
        canonical="/"
        structuredData={homeSchema}
        ogImage="/og-home.jpg"
      />
      <AnimatedBackground />
      <Hero />
      <EnhancedTrustBar />
      <HowItWorks />
      <WhyChooseGarageAtHome />
      <ServicesSection />
      <EnhancedTestimonials />
      <EnhancedFAQ />
    </div>
  );
}