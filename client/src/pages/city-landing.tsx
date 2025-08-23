import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SelectField } from '@/components/forms/SelectField';
import { TextField } from '@/components/forms/TextField';
import { cities, getCityBySlug } from '@/data/cities';
import { getReviewsByCity } from '@/data/reviews';
import { Link } from 'wouter';

export default function CityLanding() {
  const { city: citySlug } = useParams();
  const city = getCityBySlug(citySlug || '');
  const reviews = getReviewsByCity(citySlug || '');

  if (!city) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <p className="text-gray-600 mb-6">We don't currently service this city.</p>
          <Link href="/services">
            <Button>View All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": `Garageathome - ${city.name}`,
    "description": city.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.state,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.lat,
      "longitude": city.lng
    },
    "telephone": "+91 98765 43210",
    "priceRange": "₹299-₹899",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    },
    "areaServed": city.areas,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vehicle Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bike Service",
            "description": "Professional bike maintenance and repair"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Car Service",
            "description": "Complete car care and maintenance"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 py-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Bike Service in {city.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {city.description}
            </p>
          </motion.div>

          {/* Local Features */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">All Areas Covered</h3>
                <p className="text-gray-600">
                  {city.areas.join(', ')} and all major areas in {city.name}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Same Day Service</h3>
                <p className="text-gray-600">
                  Book morning and get service same day. Emergency repairs available 24/7
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Best Prices</h3>
                <p className="text-gray-600">
                  Competitive pricing with no hidden charges. Pay only after service completion
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Quick Book Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Quick Book - {city.name}
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    id="vehicle-type"
                    label="Vehicle Type"
                    placeholder="Select Vehicle"
                    options={[
                      { value: 'bike', label: 'Bike/Scooter' },
                      { value: 'car', label: 'Car' }
                    ]}
                  />
                  
                  <SelectField
                    id="service-type"
                    label="Service Type"
                    placeholder="Select Service"
                    options={[
                      { value: 'basic', label: 'Basic Service' },
                      { value: 'oil-change', label: 'Oil Change' },
                      { value: 'brake-service', label: 'Brake Service' }
                    ]}
                  />
                </div>

                <TextField
                  id="area"
                  label={`Your Area in ${city.name}`}
                  placeholder={`e.g., ${city.areas.slice(0, 3).join(', ')}`}
                />

                <Link href="/book">
                  <Button
                    className="w-full bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg"
                    data-testid="button-find-mechanics"
                  >
                    Find Mechanics in {city.name}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Local Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              What {city.name} Customers Say
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-xl p-6"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary-600">
                          {review.customerName[0]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold" data-testid={`review-name-${review.id}`}>
                          {review.customerName}
                        </h4>
                        <p className="text-sm text-gray-600" data-testid={`review-location-${review.id}`}>
                          {review.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600" data-testid={`review-rating-${review.id}`}>
                        {review.rating}.0
                      </span>
                    </div>
                    
                    <p className="text-gray-600" data-testid={`review-comment-${review.id}`}>
                      "{review.comment}"
                    </p>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Service: {review.service}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* SEO Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                Why Choose Garageathome in {city.name}?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Expert Mechanics</h4>
                      <p className="text-gray-600 text-sm">
                        Certified professionals with years of experience in {city.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Genuine Parts</h4>
                      <p className="text-gray-600 text-sm">
                        We use only genuine and high-quality spare parts
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Doorstep Service</h4>
                      <p className="text-gray-600 text-sm">
                        No need to visit a garage - we come to you
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Quality Guarantee</h4>
                      <p className="text-gray-600 text-sm">
                        7-day quality guarantee on all services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
