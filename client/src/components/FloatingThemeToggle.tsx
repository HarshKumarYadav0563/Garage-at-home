import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={toggleTheme}
          className={`relative flex items-center justify-center rounded-full p-1 transition-all duration-500 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          } w-12 h-12`}
          data-testid="floating-theme-toggle"
          animate={{
            backgroundColor: theme === 'dark' 
              ? ['#2563eb', '#7c3aed', '#2563eb']
              : ['#fbbf24', '#f97316', '#fbbf24'],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            backgroundColor: { duration: 3, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{
            scale: 1.2,
            rotate: 180,
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated Icon */}
          <motion.div
            animate={{ 
              rotate: theme === 'dark' ? [0, 360] : [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 0.6 },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {theme === 'dark' ? (
              <Sun className="text-yellow-300 w-6 h-6 drop-shadow-lg" />
            ) : (
              <Moon className="text-white w-6 h-6 drop-shadow-lg" />
            )}
          </motion.div>
          
          {/* Floating Particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-yellow-300' : 'bg-white'
                }`}
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${20 + i * 20}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.button>
        
        {/* Pulsing Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-lg opacity-60 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-yellow-300 to-orange-400'
          }`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ zIndex: -1 }}
        />
        
        {/* Outer Glow Ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${
            theme === 'dark' 
              ? 'border-blue-300/30' 
              : 'border-yellow-300/30'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ zIndex: -1 }}
        />
      </motion.div>
    </motion.div>
  );
}