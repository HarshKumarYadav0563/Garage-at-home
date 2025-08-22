import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useUiStore } from '@/stores/useUiStore';

export function Toast() {
  const { toasts, removeToast } = useUiStore();

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          const bgColor = colors[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm`}
              data-testid={`toast-${toast.type}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold" data-testid="toast-title">
                  {toast.title}
                </div>
                {toast.message && (
                  <div className="text-sm opacity-90" data-testid="toast-message">
                    {toast.message}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
                data-testid="button-close-toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
