import { motion } from 'framer-motion';
import { useLocation, Link } from 'wouter';
import { Home, Wrench, MapPin, User, Phone } from 'lucide-react';
import { useBookingStore } from '@/store/booking';

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    activeColor: 'text-emerald-400',
    inactiveColor: 'text-gray-400'
  },
  {
    name: 'Services',
    href: '/services',
    icon: Wrench,
    activeColor: 'text-emerald-400',
    inactiveColor: 'text-gray-400'
  },
  {
    name: 'Track',
    href: '/track',
    icon: MapPin,
    activeColor: 'text-emerald-400',
    inactiveColor: 'text-gray-400'
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
    activeColor: 'text-emerald-400',
    inactiveColor: 'text-gray-400'
  }
];

export function MobileBottomNav() {
  const [location] = useLocation();
  const { selectedServices } = useBookingStore();

  const isHidden = location.includes('/services/') || 
                   location.includes('/location') || 
                   location.includes('/mechanic') || 
                   location.includes('/details') || 
                   location.includes('/otp');

  if (isHidden) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-xl border-t border-gray-800"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location === item.href || 
                          (item.href === '/services' && location.startsWith('/services'));
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className="flex flex-col items-center justify-center py-1.5 px-2 min-w-[50px]"
                whileTap={{ scale: 0.9 }}
                data-testid={`bottom-nav-${item.name.toLowerCase()}`}
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? item.activeColor : item.inactiveColor
                    } transition-colors duration-200`}
                  />
                  {item.name === 'Services' && selectedServices.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-[10px] font-bold">
                        {selectedServices.length}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
                <motion.span
                  className={`text-[10px] mt-0.5 font-medium ${
                    isActive ? item.activeColor : item.inactiveColor
                  } transition-colors duration-200`}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {item.name}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}