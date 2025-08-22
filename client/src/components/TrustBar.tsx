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
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div
                className={`text-3xl lg:text-4xl font-bold mb-2 ${stat.color}`}
                data-testid={`stat-number-${index}`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600" data-testid={`stat-label-${index}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
