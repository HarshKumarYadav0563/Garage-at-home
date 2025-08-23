import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'service';
  ogImage?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  structuredData,
  noIndex = false
}: SEOProps) {
  const [location] = useLocation();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = `${baseUrl}${location}`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : currentUrl;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"][data-seo="true"]');
    existingStructuredData.forEach(script => script.remove());

    // Add basic meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#10b981' },
      
      // Keywords
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: currentUrl },
      { property: 'og:image', content: `${baseUrl}${ogImage}` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'Garage At Home' },
      { property: 'og:locale', content: 'en_IN' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${baseUrl}${ogImage}` },
      
      // Additional SEO
      { name: 'author', content: 'Garage At Home' },
      { name: 'publisher', content: 'Garage At Home' },
      { name: 'application-name', content: 'Garage At Home' },
      { name: 'apple-mobile-web-app-title', content: 'Garage At Home' },
      { name: 'msapplication-TileColor', content: '#10b981' },
    ];

    // Add meta tags to head
    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      meta.setAttribute('data-seo', 'true');
      document.head.appendChild(meta);
    });

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [title, description, keywords, canonical, ogType, ogImage, structuredData, noIndex, location, baseUrl, currentUrl, canonicalUrl]);

  return null;
}

// SEO utility functions
export const generateLocalBusinessSchema = (city: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://garageatHome.com/#local-business-${city.toLowerCase()}`,
  "name": "Garage At Home",
  "alternateName": ["Garage At Home", "Vehicle Service At Home"],
  "description": `India's Premier Doorstep Vehicle Service Platform serving ${city} and Delhi-NCR with professional bike and car maintenance services.`,
  "url": "https://garageathome.com",
  "telephone": "+91-9999-GARAGE",
  "priceRange": "₹₹",
  "image": "https://garageathome.com/logo-large.png",
  "logo": "https://garageathome.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": city,
    "addressRegion": "Delhi NCR",
    "addressCountry": "IN"
  },
  "geo": getCoordinatesForCity(city),
  "areaServed": [
    {
      "@type": "City",
      "name": "Delhi"
    },
    {
      "@type": "City", 
      "name": "Gurugram"
    },
    {
      "@type": "City",
      "name": "Noida"
    },
    {
      "@type": "City",
      "name": "Ghaziabad"
    },
    {
      "@type": "City",
      "name": "Faridabad"
    }
  ],
  "serviceType": ["Vehicle Maintenance", "Auto Repair", "Doorstep Service"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vehicle Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bike Service",
          "description": "Professional doorstep bike maintenance and repair services"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Car Service",
          "description": "Expert doorstep car maintenance and repair services"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Rahul Sharma"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Excellent service! The mechanic came to my home and fixed my bike perfectly. Very professional and affordable."
    }
  ],
  "openingHours": "Mo-Su 06:00-22:00",
  "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking"],
  "currenciesAccepted": "INR"
});

export const generateServiceSchema = (vehicle: string, city: string, services: any[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": `${vehicle} Service in ${city}`,
  "description": `Professional doorstep ${vehicle} maintenance and repair services in ${city}, Delhi-NCR`,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Garage At Home",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": "Delhi NCR",
      "addressCountry": "IN"
    }
  },
  "serviceType": `${vehicle} Maintenance`,
  "areaServed": {
    "@type": "City",
    "name": city
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `${vehicle} Services`,
    "itemListElement": services.map((service, index) => ({
      "@type": "Offer",
      "name": service.name,
      "description": service.description,
      "price": service.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "position": index + 1
    }))
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": Math.min(...services.map(s => s.price)),
    "highPrice": Math.max(...services.map(s => s.price)),
    "availability": "https://schema.org/InStock"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://garageathome.com/#organization",
  "name": "Garage At Home",
  "alternateName": "India's First Premium Doorstep Vehicle Service",
  "url": "https://garageathome.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://garageathome.com/logo.png",
    "width": 300,
    "height": 100
  },
  "image": "https://garageathome.com/og-image.jpg",
  "description": "India's Premier Doorstep Vehicle Service Platform offering professional bike and car maintenance services across Delhi-NCR with certified mechanics and transparent pricing.",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Garage At Home Team"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Delhi NCR"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9999-GARAGE",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/garageathome",
    "https://www.instagram.com/garageathome",
    "https://www.linkedin.com/company/garageathome"
  ],
  "serviceArea": [
    {
      "@type": "City",
      "name": "Delhi"
    },
    {
      "@type": "City",
      "name": "Gurugram" 
    },
    {
      "@type": "City",
      "name": "Noida"
    },
    {
      "@type": "City",
      "name": "Ghaziabad"
    },
    {
      "@type": "City",
      "name": "Faridabad"
    }
  ]
});

function getCoordinatesForCity(city: string) {
  const coordinates: Record<string, { latitude: number; longitude: number }> = {
    "Delhi": { latitude: 28.6139, longitude: 77.2090 },
    "Gurugram": { latitude: 28.4595, longitude: 77.0266 },
    "Noida": { latitude: 28.5355, longitude: 77.3910 },
    "Ghaziabad": { latitude: 28.6692, longitude: 77.4538 },
    "Faridabad": { latitude: 28.4089, longitude: 77.3178 }
  };

  const coords = coordinates[city] || coordinates["Delhi"];
  
  return {
    "@type": "GeoCoordinates",
    "latitude": coords.latitude,
    "longitude": coords.longitude
  };
}