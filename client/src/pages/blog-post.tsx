import { motion } from 'framer-motion';
import { useParams, Link, useLocation } from 'wouter';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, MapPin, Tag, ArrowLeft, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts, BlogPost } from '@/data/blogPosts';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';

interface BlogPostParams {
  slug: string;
}

export default function BlogPostPage() {
  const params = useParams<BlogPostParams>();
  const [, setLocation] = useLocation();
  const post = getBlogPostBySlug(params?.slug || '');
  const relatedPosts = post ? getRelatedPosts(post) : [];

  useEffect(() => {
    if (!post) {
      setLocation('/blog');
    }
  }, [post, setLocation]);

  if (!post) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnWhatsApp = () => {
    const url = `https://garagewala.com/blog/${post.slug}`;
    const text = `Check out this helpful article: ${post.title}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url + '&utm_source=whatsapp&utm_medium=share')}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://garagewala.com/blog/${post.slug}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://garagewala.com/blog/${post.slug}`;
    const text = `Check out this helpful article: ${post.title}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://garagewala.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://garagewala.com/blog/${post.slug}`} />
        <meta property="og:image" content={`https://garagewala.com${post.image}`} />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.schema.dateModified} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://garagewala.com${post.image}`} />
        
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
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://garagewala.com/blog/${post.slug}`
              }
            ]
          })}
        </script>
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.schema.headline,
            description: post.excerpt,
            image: `https://garagewala.com${post.image}`,
            datePublished: post.schema.datePublished,
            dateModified: post.schema.dateModified,
            author: post.schema.author,
            publisher: {
              '@type': 'Organization',
              name: 'Garage At Home',
              logo: {
                '@type': 'ImageObject',
                url: 'https://garagewala.com/logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://garagewala.com/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-sky-500/20 relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className={`${
                  post.category === 'Bike Service' ? 'bg-emerald-500' :
                  post.category === 'Car Maintenance' ? 'bg-sky-500' :
                  'bg-purple-500'
                } text-white mb-4`}>
                  {post.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
            
            {/* Article Meta */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{post.city}</span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-gray-400 border-gray-600">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Social Share */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium">Share this article:</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={shareOnWhatsApp}
                    className="bg-green-600 hover:bg-green-700 border-green-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={shareOnFacebook}
                    className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  >
                    <Facebook className="w-4 h-4 mr-1" />
                    Facebook
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={shareOnTwitter}
                    className="bg-blue-400 hover:bg-blue-500 border-blue-400 text-white"
                  >
                    <Twitter className="w-4 h-4 mr-1" />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="p-6">
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-bold text-white mb-3 mt-6">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-bold text-white mb-2 mt-4">{children}</h4>,
                    p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
                    li: ({children}) => <li className="text-gray-300">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-300 bg-emerald-500/10 p-4 rounded-r-lg my-6">
                        {children}
                      </blockquote>
                    ),
                    table: ({children}) => (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse border border-gray-600 text-sm">{children}</table>
                      </div>
                    ),
                    th: ({children}) => (
                      <th className="border border-gray-600 bg-gray-800 text-white font-semibold p-3 text-left">{children}</th>
                    ),
                    td: ({children}) => (
                      <td className="border border-gray-600 text-gray-300 p-3">{children}</td>
                    ),
                    strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                    em: ({children}) => <em className="text-emerald-400">{children}</em>,
                    code: ({children}) => (
                      <code className="bg-gray-800 text-emerald-400 px-2 py-1 rounded text-sm">{children}</code>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
              
              {/* Call to Action */}
              <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Need Professional Vehicle Service?</h3>
                <p className="text-gray-300 mb-6">
                  Get expert doorstep service for your vehicle. Our certified mechanics bring professional 
                  care right to your location across Delhi NCR.
                </p>
                <div className="flex gap-4">
                  <Link href="/services">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      Book Service Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-t-lg relative">
                        <div className="absolute bottom-2 left-2">
                          <Badge className={`${
                            relatedPost.category === 'Bike Service' ? 'bg-emerald-500' :
                            relatedPost.category === 'Car Maintenance' ? 'bg-sky-500' :
                            'bg-purple-500'
                          } text-white text-xs`}>
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                        
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Button size="sm" className="w-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                            Read Article
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}