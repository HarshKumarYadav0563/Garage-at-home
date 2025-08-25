import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, MapPin, Calendar, Shield, User, Bike, Car, Quote } from 'lucide-react';
import { 
  testimonials, 
  getTestimonialsByCity, 
  getTestimonialsByVehicle, 
  getFeaturedTestimonials,
  getAverageRating,
  getRatingDistribution,
  getTotalReviews
} from '@/data/testimonials';
import { Helmet } from 'react-helmet-async';

const cities = ['All', 'Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad'];
const vehicles = ['All', 'Bike', 'Car'];

export default function Testimonials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState('All');

  // Filter testimonials based on search and filters
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'All' || testimonial.city === selectedCity;
    const matchesVehicle = selectedVehicle === 'All' || testimonial.vehicle === selectedVehicle.toLowerCase();
    
    return matchesSearch && matchesCity && matchesVehicle;
  });

  const featuredTestimonials = getFeaturedTestimonials(6);
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviews();
  const ratingDistribution = getRatingDistribution();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>Customer Testimonials | Garage At Home - 4.9★ Rated Service</title>
        <meta 
          name="description" 
          content="Read genuine customer testimonials and reviews of our doorstep vehicle service. 4.9/5 stars from 2500+ verified customers across Delhi NCR. Real experiences, real satisfaction."
        />
        <meta name="keywords" content="customer testimonials, vehicle service reviews, garage at home reviews, doorstep service feedback, Delhi NCR vehicle service" />
        <link rel="canonical" href="https://garagewala.com/testimonials" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Customer Testimonials | Garage At Home - 4.9★ Rated" />
        <meta property="og:description" content="Read genuine customer testimonials and reviews from our 4.9/5 star rated doorstep vehicle service" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garagewala.com/testimonials" />
        <meta property="og:image" content="https://garagewala.com/og-testimonials.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Testimonials | Garage At Home" />
        <meta name="twitter:description" content="4.9/5 stars from 2500+ verified customers across Delhi NCR" />
        <meta name="twitter:image" content="https://garagewala.com/og-testimonials.jpg" />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://garagewala.com/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Testimonials',
                item: 'https://garagewala.com/testimonials'
              }
            ]
          })}
        </script>
        
        {/* Aggregate Rating Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Garage At Home',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating,
              reviewCount: totalReviews,
              bestRating: 5,
              worstRating: 1
            },
            review: testimonials.map(testimonial => ({
              '@type': 'Review',
              author: testimonial.schema.author,
              reviewRating: testimonial.schema.reviewRating,
              reviewBody: testimonial.schema.reviewBody,
              datePublished: testimonial.schema.datePublished
            }))
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Quote className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Customer Testimonials
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Real experiences from our valued customers across Delhi NCR. 
              See why thousands trust us with their vehicle care.
            </motion.p>
            
            {/* Rating Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-2xl font-bold text-white">{averageRating}</span>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-bold text-white">{totalReviews.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Reviews</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">98%</div>
                <div className="text-sm text-gray-400">Satisfied</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reviews by name, service, or experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500/50 rounded-xl text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* City Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-gray-400 text-sm font-medium mr-2 self-center">City:</span>
                {cities.map(city => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCity(city)}
                    className={`${
                      selectedCity === city
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    } rounded-full transition-all duration-200`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {city}
                  </Button>
                ))}
              </div>

              {/* Vehicle Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-gray-400 text-sm font-medium mr-2 self-center">Vehicle:</span>
                {vehicles.map(vehicle => (
                  <Button
                    key={vehicle}
                    variant={selectedVehicle === vehicle ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`${
                      selectedVehicle === vehicle
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    } rounded-full transition-all duration-200`}
                  >
                    {vehicle === 'Bike' ? <Bike className="w-3 h-3 mr-1" /> : 
                     vehicle === 'Car' ? <Car className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                    {vehicle}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Testimonials */}
          {selectedCity === 'All' && selectedVehicle === 'All' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(234,179,8,0.1)]">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{testimonial.name}</h3>
                            <p className="text-sm text-gray-400">{testimonial.location}</p>
                          </div>
                          <Badge className="bg-yellow-500 text-black">
                            Featured
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                          <span className="text-sm text-gray-400">({testimonial.rating}/5)</span>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-4 line-clamp-4">
                          "{testimonial.reviewText}"
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {testimonial.vehicle === 'bike' ? 
                              <Bike className="w-4 h-4 text-emerald-400" /> : 
                              <Car className="w-4 h-4 text-sky-400" />
                            }
                            <span className="text-gray-400">{testimonial.service}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(testimonial.date)}</span>
                          </div>
                        </div>
                        
                        {testimonial.verified && (
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
            </motion.div>
          )}

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-400">
              Showing {filteredTestimonials.length} review{filteredTestimonials.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCity !== 'All' && ` from ${selectedCity}`}
              {selectedVehicle !== 'All' && ` for ${selectedVehicle.toLowerCase()} service`}
            </p>
          </motion.div>

          {/* All Testimonials Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + (index * 0.05) }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.location}</p>
                      </div>
                      <Badge className={`${
                        testimonial.city === 'Delhi' ? 'bg-red-500' :
                        testimonial.city === 'Gurugram' ? 'bg-blue-500' :
                        testimonial.city === 'Noida' ? 'bg-green-500' :
                        testimonial.city === 'Ghaziabad' ? 'bg-purple-500' :
                        'bg-orange-500'
                      } text-white`}>
                        {testimonial.city}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-sm text-gray-400">({testimonial.rating}/5)</span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">
                      "{testimonial.reviewText}"
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center gap-2">
                        {testimonial.vehicle === 'bike' ? 
                          <Bike className="w-4 h-4 text-emerald-400" /> : 
                          <Car className="w-4 h-4 text-sky-400" />
                        }
                        <span className="text-gray-400">{testimonial.service}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(testimonial.date)}</span>
                      </div>
                    </div>
                    
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Shield className="w-3 h-3" />
                        <span className="text-xs">Verified Customer</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* No Results */}
          {filteredTestimonials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No reviews found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('All');
                  setSelectedVehicle('All');
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
          
          {/* Leave Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-20 text-center bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Share Your Experience</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Had a great experience with our service? Help others by sharing your review. 
              Your feedback helps us improve and helps other customers make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3">
                Leave a Review
              </Button>
              <Link href="/services">
                <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-3">
                  Book Service
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}