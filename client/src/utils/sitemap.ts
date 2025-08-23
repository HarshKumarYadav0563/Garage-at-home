import { NCR_CITIES, VEHICLES, CITY_DISPLAY_NAMES, VEHICLE_DISPLAY_NAMES } from '@shared/config/serviceAreas';
import type { NCRCity, VehicleType } from '@shared/config/serviceAreas';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  title?: string;
  description?: string;
}

export function generateSitemapUrls(): SitemapUrl[] {
  const baseUrl = 'https://garageathome.com';
  const today = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Static pages
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0,
      title: 'Garage At Home - India\'s First Premium Doorstep Vehicle Service',
      description: 'Book professional doorstep bike and car service in Delhi NCR. Certified mechanics, transparent pricing.'
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9,
      title: 'Vehicle Services - Bike & Car Maintenance at Home',
      description: 'Professional doorstep vehicle services for bikes and cars across Delhi NCR.'
    },
    {
      loc: `${baseUrl}/pricing`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      title: 'Transparent Pricing - Vehicle Service Rates',
      description: 'Clear, upfront pricing for all bike and car services. No hidden charges.'
    },
    {
      loc: `${baseUrl}/how-it-works`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
      title: 'How It Works - Simple 3-Step Process',
      description: 'Book vehicle service in 3 easy steps. Select services, choose time, confirm booking.'
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
      title: 'Contact Us - Get in Touch with Garage At Home',
      description: 'Contact our support team for queries about doorstep vehicle services.'
    },
    {
      loc: `${baseUrl}/track`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.6,
      title: 'Track Your Service - Live Order Status',
      description: 'Track your vehicle service status in real-time with live updates.'
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3,
      title: 'Privacy Policy - Data Protection',
      description: 'How we collect, use and protect your personal information.'
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3,
      title: 'Terms of Service - Service Agreement',
      description: 'Terms and conditions for using Garage At Home services.'
    },
    {
      loc: `${baseUrl}/refund`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3,
      title: 'Refund Policy - Money Back Guarantee',
      description: 'Our refund and cancellation policy for vehicle services.'
    }
  ];

  // Dynamic service pages for each vehicle-city combination
  for (const vehicle of VEHICLES) {
    for (const city of NCR_CITIES) {
      const vehicleName = VEHICLE_DISPLAY_NAMES[vehicle];
      const cityName = CITY_DISPLAY_NAMES[city];
      
      urls.push({
        loc: `${baseUrl}/services/${vehicle}/${city}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.8,
        title: `${vehicleName} Service in ${cityName} | Doorstep Maintenance`,
        description: `Professional ${vehicle} service at home in ${cityName}. Certified mechanics, transparent pricing, quality assurance.`
      });
    }
  }

  // City landing pages
  for (const city of NCR_CITIES) {
    const cityName = CITY_DISPLAY_NAMES[city];
    urls.push({
      loc: `${baseUrl}/bike-service/${city}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7,
      title: `Bike Service in ${cityName} | Doorstep Motorcycle Maintenance`,
      description: `Expert bike service at home in ${cityName}. Professional mechanics, quality parts, doorstep convenience.`
    });
  }

  return urls.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

export function generateXMLSitemap(): string {
  const urls = generateSitemapUrls();
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  const xmlFooter = `</urlset>`;
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}
  </url>`).join('');
  
  return xmlHeader + urlElements + '\n' + xmlFooter;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://garageathome.com/sitemap.xml

# Optimization
Crawl-delay: 1

# Block admin areas
Disallow: /admin
Disallow: /mechanic
Disallow: /_vite
Disallow: /src/
Disallow: *.json$
Disallow: *.tsx$
Disallow: *.ts$
Disallow: *.jsx$
Disallow: *.js$

# Allow important pages
Allow: /
Allow: /services
Allow: /pricing
Allow: /how-it-works
Allow: /contact
Allow: /track
Allow: /services/*/
Allow: /bike-service/*/`;
}

export function generateStructuredDataForAllPages() {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Garage At Home",
    "url": "https://garageathome.com",
    "logo": "https://garageathome.com/logo.png",
    "description": "India's Premier Doorstep Vehicle Service Platform",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Delhi NCR"
    },
    "serviceArea": NCR_CITIES.map(city => ({
      "@type": "City",
      "name": CITY_DISPLAY_NAMES[city]
    })),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9999-GARAGE",
      "contactType": "customer service"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847"
    }
  };

  return baseOrganization;
}