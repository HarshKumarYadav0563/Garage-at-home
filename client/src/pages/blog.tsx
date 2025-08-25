import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Search, User, MapPin, Tag, ArrowRight } from 'lucide-react';
import { blogPosts, getBlogPostsByCity, getBlogPostsByCategory } from '@/data/blogPosts';
import { Helmet } from 'react-helmet-async';

const categories = ['All', 'Bike Service', 'Car Maintenance', 'Problem Solving'];
const cities = ['All', 'Delhi NCR', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  // Filter posts based on search and filters
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || post.city.includes(selectedCity);
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Vehicle Service Blog | Garage At Home - Expert Tips & Guides</title>
        <meta 
          name="description" 
          content="Expert vehicle maintenance tips, doorstep service guides, and automotive insights for Delhi NCR. Professional advice from certified mechanics."
        />
        <meta name="keywords" content="vehicle service blog, bike maintenance tips, car repair guides, Delhi NCR automotive, doorstep service insights" />
        <link rel="canonical" href="https://garagewala.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Vehicle Service Blog | Garage At Home" />
        <meta property="og:description" content="Expert vehicle maintenance tips and doorstep service guides for Delhi NCR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garagewala.com/blog" />
        <meta property="og:image" content="https://garagewala.com/og-blog.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vehicle Service Blog | Garage At Home" />
        <meta name="twitter:description" content="Expert vehicle maintenance tips and doorstep service guides for Delhi NCR" />
        <meta name="twitter:image" content="https://garagewala.com/og-blog.jpg" />
        
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
                name: 'Blog',
                item: 'https://garagewala.com/blog'
              }
            ]
          })}
        </script>
        
        {/* Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Garage At Home Blog',
            description: 'Expert vehicle maintenance tips and doorstep service guides',
            url: 'https://garagewala.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Garage At Home',
              logo: {
                '@type': 'ImageObject',
                url: 'https://garagewala.com/logo.png'
              }
            },
            blogPost: blogPosts.map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `https://garagewala.com/blog/${post.slug}`,
              datePublished: post.publishedAt,
              dateModified: post.schema.dateModified,
              author: post.schema.author,
              description: post.excerpt
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
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Vehicle Service Blog
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Expert tips, maintenance guides, and automotive insights from certified mechanics. 
              Everything you need to keep your vehicle running smoothly in Delhi NCR.
            </motion.p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles, tips, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 rounded-xl text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-gray-400 text-sm font-medium mr-2 self-center">Category:</span>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    } rounded-full transition-all duration-200`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

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
                        ? 'bg-sky-500 text-white'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    } rounded-full transition-all duration-200`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-400">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedCity !== 'All' && ` for ${selectedCity}`}
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]">
                  <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={`${
                        post.category === 'Bike Service' ? 'bg-emerald-500' :
                        post.category === 'Car Maintenance' ? 'bg-sky-500' :
                        'bg-purple-500'
                      } text-white mb-2`}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.city}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs text-gray-400 border-gray-600">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Read More Button */}
                    <Link href={`/blog/${post.slug}`}>
                      <Button 
                        className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium group/btn"
                        size="sm"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedCity('All');
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
          
          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-20 text-center bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-2xl p-8 border border-emerald-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest vehicle maintenance tips, service guides, and expert insights 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50"
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}