import { motion, useReducedMotion } from 'framer-motion';
import { BookingServiceCard } from '@/components/ServiceCard';
import { servicePackages } from '@/data/services';

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const bikeServices = servicePackages.filter(s => s.vehicleType === 'bike');
  const carServices = servicePackages.filter(s => s.vehicleType === 'car');

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950"
    >
      {/* Radial accent glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl" />
      </div>
      
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Our Premium Services
            </h2>
            
            {/* Animated gradient underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-500 rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mt-6 mx-auto max-w-3xl leading-relaxed"
          >
            Professional vehicle maintenance and repair services delivered right to your doorstep with transparent pricing
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/8 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Bike Services</h3>
              <p className="text-gray-300 mb-4">Complete bike maintenance and repair</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-emerald-400 font-bold text-lg">from ₹299</span>
              </div>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Oil Change</li>
                <li>• Brake Service</li>
                <li>• Chain Cleaning</li>
                <li>• Tire Check</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/8 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Car Services</h3>
              <p className="text-gray-300 mb-4">Professional car care and maintenance</p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-blue-400 font-bold text-lg">from ₹599</span>
              </div>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Engine Service</li>
                <li>• AC Service</li>
                <li>• Brake Repair</li>
                <li>• Battery Check</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-gray-400 text-sm md:text-base">
            Need a different service? We offer custom maintenance packages for all vehicle types.
          </p>
        </motion.div>
      </div>
    </section>
  );
}