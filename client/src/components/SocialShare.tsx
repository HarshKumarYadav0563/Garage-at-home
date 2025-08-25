import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Facebook, Twitter, Linkedin, Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating' | 'compact';
}

export default function SocialShare({
  url,
  title,
  description = '',
  className = '',
  size = 'md',
  variant = 'default'
}: SocialShareProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard."
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };
  
  const openShareDialog = (link: string) => {
    window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };
  
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'p-2' : size === 'lg' ? 'p-3' : 'p-2.5';
  
  if (variant === 'floating') {
    return (
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Share Trigger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          
          {/* Share Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() => openShareDialog(shareLinks.whatsapp)}
                  className="bg-green-500 text-white p-2.5 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className={iconSize} />
                </motion.button>
                
                <motion.button
                  onClick={() => openShareDialog(shareLinks.facebook)}
                  className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className={iconSize} />
                </motion.button>
                
                <motion.button
                  onClick={() => openShareDialog(shareLinks.twitter)}
                  className="bg-sky-500 text-white p-2.5 rounded-full hover:bg-sky-600 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className={iconSize} />
                </motion.button>
                
                <motion.button
                  onClick={copyToClipboard}
                  className="bg-gray-600 text-white p-2.5 rounded-full hover:bg-gray-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className={iconSize} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-400">Share:</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={buttonSize}
            onClick={() => openShareDialog(shareLinks.whatsapp)}
          >
            <MessageCircle className={iconSize} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={buttonSize}
            onClick={() => openShareDialog(shareLinks.facebook)}
          >
            <Facebook className={iconSize} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={buttonSize}
            onClick={() => openShareDialog(shareLinks.twitter)}
          >
            <Twitter className={iconSize} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={buttonSize}
            onClick={copyToClipboard}
          >
            <Copy className={iconSize} />
          </Button>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300 font-medium">Share this page:</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/20 text-green-400 hover:bg-green-500/10"
            onClick={() => openShareDialog(shareLinks.whatsapp)}
          >
            <MessageCircle className={iconSize} />
            WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
            onClick={() => openShareDialog(shareLinks.facebook)}
          >
            <Facebook className={iconSize} />
            Facebook
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-sky-500/20 text-sky-400 hover:bg-sky-500/10"
            onClick={() => openShareDialog(shareLinks.twitter)}
          >
            <Twitter className={iconSize} />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-gray-500/20 text-gray-400 hover:bg-gray-500/10"
            onClick={copyToClipboard}
          >
            <Copy className={iconSize} />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}