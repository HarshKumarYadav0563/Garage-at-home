import { motion } from 'framer-motion';

export function TrustBar() {
  const stats = [
    { number: '500+', label: 'Professional Mechanics', color: 'text-primary-600' },
    { number: '25k+', label: 'Doorstep Services', color: 'text-blue-600' },
    { number: '15+', label: 'Cities Covered', color: 'text-orange-600' },
    { number: '4.9★', label: 'Customer Rating', color: 'text-green-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 ${stat.color}`}
                data-testid={`stat-number-${index}`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base font-medium" data-testid={`stat-label-${index}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
