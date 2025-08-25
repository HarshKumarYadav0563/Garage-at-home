import { motion } from 'framer-motion';
import { Star, User, Shield, Bike, Car, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTestimonialsByCity, getTestimonialsByVehicle, getAverageRating, getTotalReviews } from '@/data/testimonials';
import type { Testimonial } from '@/data/testimonials';

interface ReviewsSectionProps {
  city: string;
  vehicle: 'bike' | 'car';
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function ReviewsSection({ 
  city, 
  vehicle, 
  title, 
  subtitle, 
  limit = 6 
}: ReviewsSectionProps) {
  
  // Get reviews for this specific city and vehicle
  const cityReviews = getTestimonialsByCity(city);
  const vehicleReviews = getTestimonialsByVehicle(vehicle);
  
  // Find reviews that match both city and vehicle
  const relevantReviews = cityReviews.filter(review => review.vehicle === vehicle).slice(0, limit);
  
  // If not enough city-specific reviews, add general vehicle reviews
  const additionalReviews = vehicleReviews
    .filter(review => !relevantReviews.some(r => r.id === review.id))
    .slice(0, limit - relevantReviews.length);
  
  const displayReviews = [...relevantReviews, ...additionalReviews].slice(0, limit);
  
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (displayReviews.length === 0) {
    return null;
  }

  return (
    <>
      {/* Schema Markup for Aggregate Rating */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} Service in ${city}`,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating,
            reviewCount: totalReviews,
            bestRating: 5,
            worstRating: 1
          },
          review: displayReviews.map(review => ({
            '@type': 'Review',
            author: review.schema.author,
            reviewRating: review.schema.reviewRating,
            reviewBody: review.schema.reviewBody,
            datePublished: review.schema.datePublished
          }))
        })}
      </script>
      
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 mb-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            
            {/* Header */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {title || `Customer Reviews - ${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} Service in ${city}`}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {subtitle || `See what our customers say about their ${vehicle} service experience in ${city}.`}
              </p>
              
              {/* Rating Summary */}
              <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-xl font-bold text-white">{averageRating}</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{totalReviews}</div>
                  <div className="text-sm text-gray-400">Reviews</div>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-400">98%</div>
                  <div className="text-sm text-gray-400">Satisfied</div>
                </div>
              </div>
            </motion.div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + (index * 0.1) }}
                  whileHover={{ y: -3 }}
                  className="group"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Customer Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{review.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-3 h-3" />
                            <span>{review.location}</span>
                          </div>
                        </div>
                        {review.city === city && (
                          <Badge className="bg-emerald-500 text-white text-xs">
                            Local
                          </Badge>
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-400">({review.rating}/5)</span>
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-300 leading-relaxed mb-4 line-clamp-4">
                        "{review.reviewText}"
                      </p>
                      
                      {/* Service Details */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {review.vehicle === 'bike' ? 
                            <Bike className="w-4 h-4 text-emerald-400" /> : 
                            <Car className="w-4 h-4 text-sky-400" />
                          }
                          <span className="text-gray-400">{review.service}</span>
                        </div>
                        <span className="text-gray-500">{formatDate(review.date)}</span>
                      </div>
                      
                      {/* Verified Badge */}
                      {review.verified && (
                        <div className="flex items-center gap-1 mt-3 text-emerald-400">
                          <Shield className="w-3 h-3" />
                          <span className="text-xs">Verified Customer</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* View All Reviews CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 mb-4">
                These are just a few of our many satisfied customers in {city}
              </p>
              <motion.a
                href="/testimonials"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All {totalReviews} Reviews
                <motion.div
                  className="flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  →
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}