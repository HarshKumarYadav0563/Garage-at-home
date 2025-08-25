import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MobileBottomNav } from './MobileBottomNav';
import { Header } from '@/components/Header';

interface MobileAppShellProps {
  children: React.ReactNode;
}

export function MobileAppShell({ children }: MobileAppShellProps) {
  const [location] = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  // Show/hide header on scroll for app-like experience
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const isFullScreenRoute = location.includes('/services/') || 
                           location.includes('/location') || 
                           location.includes('/mechanic') || 
                           location.includes('/details') || 
                           location.includes('/otp');

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Mobile Header */}
      <motion.div
        className="lg:hidden"
        initial={{ y: -100 }}
        animate={{ 
          y: showHeader || isFullScreenRoute ? 0 : -100 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Header />
      </motion.div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Main Content */}
      <motion.main
        className={`flex-1 ${
          isFullScreenRoute 
            ? 'pt-0 lg:pt-24' 
            : 'pt-24 lg:pt-28 pb-20 lg:pb-0'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Safe area bottom padding for mobile */}
      <div 
        className="lg:hidden bg-gray-950"
        style={{ 
          height: 'env(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
      />
    </div>
  );
}