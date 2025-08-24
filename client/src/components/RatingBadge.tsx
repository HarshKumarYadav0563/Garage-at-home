import { motion } from 'framer-motion';
import { Star, Shield, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_RATINGS } from '@shared/config/serviceAreas';

interface RatingBadgeProps {
  variant?: 'compact' | 'detailed' | 'hero';
  className?: string;
}

export function RatingBadge({ variant = 'compact', className = '' }: RatingBadgeProps) {
  const { rating, reviewCount, verified } = BUSINESS_RATINGS;

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`flex items-center space-x-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 ${className}`}
      >
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.floor(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : star <= rating
                  ? 'text-yellow-400 fill-yellow-400 opacity-50'
                  : 'text-gray-400'
              }`}
            />
          ))}
        </div>
        <div className="text-white">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">{rating}</span>
            {verified && <Shield className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-sm text-gray-300">
            {reviewCount.toLocaleString()}+ happy customers
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : star <= rating
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-bold">{rating}/5</span>
          </div>
          {verified && (
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-gray-300 text-sm">
          <Users className="w-4 h-4" />
          <span>Rated by {reviewCount.toLocaleString()}+ customers</span>
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className={`inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-1.5 ${className}`}>
      <div className="flex items-center space-x-1">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-white font-semibold text-sm">{rating}</span>
      </div>
      <span className="text-gray-300 text-xs">({reviewCount.toLocaleString()}+)</span>
      {verified && <Shield className="w-3 h-3 text-emerald-400" />}
    </div>
  );
}

// JSON-LD structured data for ratings
export function generateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": BUSINESS_RATINGS.rating,
    "reviewCount": BUSINESS_RATINGS.reviewCount,
    "bestRating": 5,
    "worstRating": 1
  };
}