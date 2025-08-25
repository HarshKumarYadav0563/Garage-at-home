// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

// Initialize GA4
export const initGA = (measurementId: string) => {
  // Check if gtag is already loaded
  if (typeof window !== 'undefined' && !window.gtag) {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments as any);
    };
    
    window.gtag('js', new Date() as any);
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }
};

// Specific event trackers for Garage At Home
export const analytics = {
  // Service booking events
  startBooking: (vehicleType: 'bike' | 'car', city: string) => {
    trackEvent('booking_started', {
      event_category: 'engagement',
      event_label: 'booking_flow',
      vehicle_type: vehicleType,
      city: city,
      step: 'service_selection'
    });
  },

  selectService: (serviceId: string, serviceName: string, price: number, vehicleType: string) => {
    trackEvent('service_selected', {
      event_category: 'engagement',
      event_label: 'service_selection',
      service_id: serviceId,
      service_name: serviceName,
      price: price,
      vehicle_type: vehicleType
    });
  },

  bookingStepCompleted: (step: string, vehicleType: string, city: string) => {
    trackEvent('booking_step_completed', {
      event_category: 'engagement',
      event_label: 'booking_flow',
      step: step,
      vehicle_type: vehicleType,
      city: city
    });
  },

  bookingCompleted: (bookingId: string, totalAmount: number, vehicleType: string, city: string, services: string[]) => {
    trackEvent('purchase', {
      transaction_id: bookingId,
      value: totalAmount,
      currency: 'INR',
      items: services.map((service, index) => ({
        item_id: `service_${index}`,
        item_name: service,
        category: vehicleType,
        quantity: 1
      })),
      event_category: 'conversion',
      vehicle_type: vehicleType,
      city: city
    });
  },

  // Content engagement events
  videoPlay: (videoId: string, videoTitle: string) => {
    trackEvent('video_play', {
      event_category: 'engagement',
      event_label: 'video_interaction',
      video_id: videoId,
      video_title: videoTitle
    });
  },

  blogRead: (slug: string, title: string, readTime?: number) => {
    trackEvent('blog_read', {
      event_category: 'engagement',
      event_label: 'content_interaction',
      blog_slug: slug,
      blog_title: title,
      read_time_seconds: readTime
    });
  },

  testimonialView: (testimonialId: string, city: string, vehicleType: string) => {
    trackEvent('testimonial_view', {
      event_category: 'engagement',
      event_label: 'social_proof',
      testimonial_id: testimonialId,
      city: city,
      vehicle_type: vehicleType
    });
  },

  // User interaction events
  phoneCall: (source: string) => {
    trackEvent('phone_call', {
      event_category: 'conversion',
      event_label: 'contact_attempt',
      source: source
    });
  },

  whatsappClick: (source: string) => {
    trackEvent('whatsapp_click', {
      event_category: 'conversion',
      event_label: 'contact_attempt',
      source: source
    });
  },

  socialShare: (platform: string, url: string, title: string) => {
    trackEvent('share', {
      method: platform,
      content_type: 'page',
      item_id: url,
      event_category: 'engagement',
      event_label: 'social_sharing',
      shared_title: title
    });
  },

  searchPerformed: (query: string, resultCount: number, section: string) => {
    trackEvent('search', {
      search_term: query,
      event_category: 'engagement',
      event_label: 'site_search',
      results_count: resultCount,
      search_section: section
    });
  },

  faqInteraction: (question: string, section: string) => {
    trackEvent('faq_interaction', {
      event_category: 'engagement',
      event_label: 'help_seeking',
      faq_question: question,
      faq_section: section
    });
  },

  locationSelected: (city: string, vehicleType: string) => {
    trackEvent('location_selected', {
      event_category: 'engagement',
      event_label: 'service_area',
      selected_city: city,
      vehicle_type: vehicleType
    });
  },

  reviewSubmitted: (rating: number, vehicleType: string, city: string) => {
    trackEvent('review_submitted', {
      event_category: 'engagement',
      event_label: 'feedback',
      rating: rating,
      vehicle_type: vehicleType,
      city: city
    });
  },

  newsletterSignup: (source: string) => {
    trackEvent('sign_up', {
      method: 'newsletter',
      event_category: 'conversion',
      event_label: 'email_signup',
      source: source
    });
  },

  // Core Web Vitals tracking
  trackWebVitals: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            trackEvent('web_vitals', {
              event_category: 'performance',
              metric_name: 'LCP',
              metric_value: Math.round(entry.startTime),
              metric_rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs_improvement' : 'poor'
            });
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fid = (entry as any).processingStart - entry.startTime;
            trackEvent('web_vitals', {
              event_category: 'performance',
              metric_name: 'FID',
              metric_value: Math.round(fid),
              metric_rating: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
            });
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        trackEvent('web_vitals', {
          event_category: 'performance',
          metric_name: 'CLS',
          metric_value: Math.round(clsValue * 1000) / 1000,
          metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
        });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
};

// Enhanced ecommerce tracking for service booking
export const ecommerce = {
  viewItem: (serviceId: string, serviceName: string, price: number, category: string) => {
    trackEvent('view_item', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: serviceId,
        item_name: serviceName,
        category: category,
        price: price,
        quantity: 1
      }]
    });
  },

  addToCart: (serviceId: string, serviceName: string, price: number, category: string) => {
    trackEvent('add_to_cart', {
      currency: 'INR',
      value: price,
      items: [{
        item_id: serviceId,
        item_name: serviceName,
        category: category,
        price: price,
        quantity: 1
      }]
    });
  },

  beginCheckout: (items: Array<{id: string, name: string, price: number, category: string}>, totalValue: number) => {
    trackEvent('begin_checkout', {
      currency: 'INR',
      value: totalValue,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        price: item.price,
        quantity: 1
      }))
    });
  }
};

// Initialize analytics on app start
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Use environment variable for GA measurement ID
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
    initGA(measurementId);
    
    // Track initial page view
    trackPageView(window.location.pathname, document.title);
    
    // Start tracking Core Web Vitals
    analytics.trackWebVitals();
    
    // Track user engagement time
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const engagementTime = Math.round((Date.now() - startTime) / 1000);
      trackEvent('user_engagement', {
        engagement_time_msec: engagementTime * 1000,
        event_category: 'engagement'
      });
    });
  }
};