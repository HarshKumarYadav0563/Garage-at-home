import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ x: -100, opacity: 0 }}
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
          className={`relative flex flex-col items-center rounded-2xl p-2 transition-all duration-500 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-blue-600 to-purple-600' 
              : 'bg-gradient-to-b from-yellow-400 to-orange-500'
          } w-16 h-32`}
          data-testid="floating-theme-toggle"
          animate={{
            backgroundColor: theme === 'dark' 
              ? ['#2563eb', '#7c3aed', '#2563eb']
              : ['#fbbf24', '#f97316', '#fbbf24']
          }}
          transition={{
            backgroundColor: { duration: 3, repeat: Infinity }
          }}
        >
          {/* Toggle Slider */}
          <motion.div
            className="flex items-center justify-center rounded-xl bg-white shadow-lg w-12 h-12 mb-2"
            animate={{
              y: theme === 'dark' ? 64 : 4
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? (
                <Sun className="text-yellow-500 w-6 h-6" />
              ) : (
                <Moon className="text-gray-600 w-6 h-6" />
              )}
            </motion.div>
          </motion.div>
          
          {/* Status Labels */}
          <motion.div
            className="flex flex-col justify-between h-full py-2"
            animate={{
              opacity: 0.8
            }}
          >
            <motion.span
              className={`text-xs font-bold transition-opacity duration-300 ${
                theme === 'dark' ? 'text-white opacity-40' : 'text-white opacity-100'
              }`}
            >
              OFF
            </motion.span>
            <motion.span
              className={`text-xs font-bold transition-opacity duration-300 ${
                theme === 'dark' ? 'text-white opacity-100' : 'text-white opacity-40'
              }`}
            >
              ON
            </motion.span>
          </motion.div>
        </motion.button>
        
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl blur-md opacity-40 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-blue-400 to-purple-400' 
              : 'bg-gradient-to-b from-yellow-300 to-orange-400'
          }`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
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