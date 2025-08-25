import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Clock, Eye, Search, Video, Calendar } from 'lucide-react';
import { videos, getVideosByCategory, getFeaturedVideos } from '@/data/videos';
import { Helmet } from 'react-helmet-async';

const categories = ['All', 'How It Works', 'Service Demo', 'Emergency Service'];

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredVideos = getFeaturedVideos(3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const parseDuration = (isoDuration: string) => {
    const match = isoDuration.match(/PT(\d+)M(\d+)S/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '0:00';
  };

  return (
    <>
      <Helmet>
        <title>Vehicle Service Videos | Garage At Home - How It Works</title>
        <meta 
          name="description" 
          content="Watch professional vehicle service videos and tutorials. See how our doorstep service works, live service demos, and customer experiences across Delhi NCR."
        />
        <meta name="keywords" content="vehicle service videos, doorstep service demo, garage at home tutorials, bike service videos, car service videos" />
        <link rel="canonical" href="https://garagewala.com/videos" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Vehicle Service Videos | Garage At Home" />
        <meta property="og:description" content="Watch professional vehicle service videos and see how our doorstep service works" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garagewala.com/videos" />
        <meta property="og:image" content="https://garagewala.com/og-videos.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vehicle Service Videos | Garage At Home" />
        <meta name="twitter:description" content="Watch professional vehicle service videos and tutorials" />
        <meta name="twitter:image" content="https://garagewala.com/og-videos.jpg" />
        
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
                name: 'Videos',
                item: 'https://garagewala.com/videos'
              }
            ]
          })}
        </script>
        
        {/* Video Collection Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGallery',
            name: 'Garage At Home Service Videos',
            description: 'Professional vehicle service tutorials and demonstrations',
            url: 'https://garagewala.com/videos',
            video: videos.map(video => ({
              '@type': 'VideoObject',
              name: video.schema.name,
              description: video.schema.description,
              thumbnailUrl: video.schema.thumbnailUrl,
              uploadDate: video.schema.uploadDate,
              duration: video.schema.duration,
              embedUrl: video.schema.embedUrl,
              interactionStatistic: {
                '@type': 'InteractionCounter',
                interactionType: 'https://schema.org/WatchAction',
                userInteractionCount: video.views
              }
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
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Video className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Service Videos
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Watch our professional vehicle service process in action. See real customer experiences, 
              service demonstrations, and learn how Garage At Home works.
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
                placeholder="Search videos, tutorials, demos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500/50 rounded-xl text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                  } rounded-full transition-all duration-200`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Featured Videos Section */}
          {selectedCategory === 'All' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)]">
                      <div className="relative aspect-video rounded-t-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-red-500 text-white">
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                            {parseDuration(video.duration)}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {video.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatViews(video.views)} views</span>
                          </div>
                          <span>{formatDate(video.publishedAt)}</span>
                        </div>
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
            transition={{ delay: 1 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-400">
              Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)]">
                  <div className="relative aspect-video rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        video.category === 'How It Works' ? 'bg-blue-500' :
                        video.category === 'Service Demo' ? 'bg-green-500' :
                        'bg-orange-500'
                      } text-white`}>
                        {video.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                        {parseDuration(video.duration)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatViews(video.views)} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(video.publishedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs text-gray-400 border-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* No Results */}
          {filteredVideos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No videos found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
          
          {/* Video Player Modal */}
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videos.find(v => v.id === selectedVideo)?.embedId}?autoplay=1`}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {videos.find(v => v.id === selectedVideo)?.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {videos.find(v => v.id === selectedVideo)?.description}
                  </p>
                  <Button 
                    onClick={() => setSelectedVideo(null)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Close Video
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-20 text-center bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 border border-red-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Experience Our Service?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              After watching our videos, book your doorstep vehicle service and experience 
              the same quality and professionalism shown in these demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                  Book Service Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-3">
                  Get Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}