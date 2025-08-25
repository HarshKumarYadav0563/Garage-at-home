import { useEffect, useState } from 'react';

export function useMobileApp() {
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileScreen = window.innerWidth <= 1024;
      setIsMobile(isMobileDevice || isMobileScreen);
    };

    // Check if app is running in standalone mode (PWA)
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                             (window.navigator as any).standalone ||
                             document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    // Check fullscreen status
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Set CSS custom property for viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initialize
    checkMobile();
    checkStandalone();
    checkFullscreen();
    setViewportHeight();

    // Event listeners
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    document.addEventListener('fullscreenchange', checkFullscreen);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, []);

  // Function to toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log('Fullscreen not supported or permission denied');
    }
  };

  // Function to add to home screen
  const addToHomeScreen = () => {
    // This will be handled by the browser's native prompt
    // We can trigger it by showing an install prompt
    return new Promise((resolve) => {
      if ('serviceWorker' in navigator) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  // Haptic feedback simulation
  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 50,
        heavy: 100
      };
      navigator.vibrate(patterns[type]);
    }
  };

  return {
    isMobile,
    isStandalone,
    isFullscreen,
    toggleFullscreen,
    addToHomeScreen,
    hapticFeedback
  };
}