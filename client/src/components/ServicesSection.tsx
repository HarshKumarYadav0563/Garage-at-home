import { motion, useReducedMotion } from 'framer-motion';
import { ServiceCard } from '@/components/ServiceCard';
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
            <ServiceCard
              id={bikeServices[0].id}
              name="Bike Services"
              vehicleType="bike"
              description="Complete bike maintenance and repair"
              basePrice={299}
              features={['Oil Change', 'Brake Service', 'Chain Cleaning', 'Tire Check']}
              icon="motorcycle"
              gradient="from-emerald-400 to-teal-600"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ServiceCard
              id={carServices[0].id}
              name="Car Services"
              vehicleType="car"
              description="Professional car care and maintenance"
              basePrice={599}
              features={['Engine Service', 'AC Service', 'Brake Repair', 'Battery Check']}
              icon="car"
              gradient="from-blue-400 to-indigo-600"
            />
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