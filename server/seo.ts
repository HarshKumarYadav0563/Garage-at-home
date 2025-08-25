import { NCR_CITIES, VEHICLES } from '@shared/config/serviceAreas';

// Generate sitemap.xml for the website
export function generateSitemap(): string {
  const baseUrl = 'https://garagewala.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [];
  
  // Static pages
  urls.push(
    { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/services`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/videos`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/testimonials`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/terms`, lastmod: currentDate, changefreq: 'monthly', priority: '0.5' }
  );
  
  // Dynamic service pages for each vehicle/city combination
  VEHICLES.forEach(vehicle => {
    NCR_CITIES.forEach(city => {
      urls.push({
        loc: `${baseUrl}/services/${vehicle}/${city}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      });
    });
  });
  
  // Blog posts - Static for now, would be dynamic in real implementation
  const blogSlugs = [
    'complete-bike-service-guide-delhi-ncr',
    'car-ac-service-summer-preparation-guide',
    'doorstep-vehicle-service-benefits',
    'bike-maintenance-monsoon-tips-delhi',
    'emergency-vehicle-breakdown-guide'
  ];
  
  blogSlugs.forEach(slug => {
    urls.push({
      loc: `${baseUrl}/blog/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

// Generate robots.txt
export function generateRobotsTxt(): string {
  const baseUrl = 'https://garagewala.com';
  
  return `User-agent: *
Allow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/
Disallow: /uploads/

# Allow important files
Allow: /api/health
Allow: /sitemap.xml

# Crawl delay
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Search engine specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Block AI crawlers and training bots (optional)
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`;
}

// Generate structured data for breadcrumbs
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string; position: number }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url
    }))
  });
}

// Generate Service schema for service pages
export function generateServiceSchema({
  serviceName,
  city,
  vehicle,
  description,
  price,
  duration,
  areaServed
}: {
  serviceName: string;
  city: string;
  vehicle: string;
  description: string;
  price?: { min: number; max: number };
  duration?: string;
  areaServed: string[];
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Garage At Home',
      description: 'Professional doorstep vehicle service across Delhi NCR',
      url: 'https://garagewala.com',
      telephone: '+91-9876543210',
      email: 'contact@garagewala.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: 'Delhi NCR',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.6139,
        longitude: 77.2090
      },
      openingHours: [
        'Mo-Su 08:00-20:00'
      ],
      priceRange: price ? `₹${price.min}-₹${price.max}` : '₹₹',
      areaServed: areaServed.map(area => ({
        '@type': 'City',
        name: area
      }))
    },
    serviceType: `${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} Maintenance and Repair`,
    category: 'Vehicle Service',
    ...(duration && { duration: duration }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: `${price.min}`,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString(),
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: price.min,
          maxPrice: price.max,
          priceCurrency: 'INR'
        }
      }
    }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'General Service',
            description: 'Complete vehicle maintenance and checkup'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Oil Change',
            description: 'Engine oil and filter replacement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Battery Service',
            description: 'Battery testing, charging, and replacement'
          }
        }
      ]
    }
  });
}

// Generate Organization schema
export function generateOrganizationSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://garagewala.com/#organization',
    name: 'Garage At Home',
    alternateName: 'Garagewala',
    description: 'Professional doorstep vehicle service and maintenance across Delhi NCR. Expert mechanics, genuine parts, transparent pricing.',
    url: 'https://garagewala.com',
    logo: 'https://garagewala.com/logo.png',
    image: [
      'https://garagewala.com/images/service-1.jpg',
      'https://garagewala.com/images/service-2.jpg',
      'https://garagewala.com/images/service-3.jpg'
    ],
    telephone: '+91-9876543210',
    email: 'contact@garagewala.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Connaught Place',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.2090
    },
    openingHours: [
      'Mo-Su 08:00-20:00'
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: ['Cash', 'Credit Card', 'UPI', 'Digital Wallet'],
    areaServed: [
      {
        '@type': 'City',
        name: 'Delhi'
      },
      {
        '@type': 'City',
        name: 'Gurugram'
      },
      {
        '@type': 'City',
        name: 'Noida'
      },
      {
        '@type': 'City',
        name: 'Ghaziabad'
      },
      {
        '@type': 'City',
        name: 'Faridabad'
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.6139,
        longitude: 77.2090
      },
      geoRadius: '50000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vehicle Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bike Service',
            description: 'Complete motorcycle and scooter maintenance'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car Service',
            description: 'Professional car maintenance and repair'
          }
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/garagewala',
      'https://twitter.com/garagewala',
      'https://www.instagram.com/garagewala',
      'https://www.linkedin.com/company/garagewala'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1'
    }
  });
}