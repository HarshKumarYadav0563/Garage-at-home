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
      className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-[radial-gradient(60%_50%_at_20%_30%,rgba(59,130,246,0.15),transparent),radial-gradient(50%_40%_at_80%_70%,rgba(16,185,129,0.12),transparent),radial-gradient(40%_30%_at_50%_50%,rgba(147,51,234,0.08),transparent)] bg-white"
    >
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.8) 1px, transparent 0)',
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Our Premium Services
            </h2>
            
            {/* Animated gradient underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mt-6 mx-auto max-w-3xl leading-relaxed"
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
          <p className="text-gray-600 text-sm md:text-base">
            Need a different service? We offer custom maintenance packages for all vehicle types.
          </p>
        </motion.div>
      </div>
    </section>
  );
}