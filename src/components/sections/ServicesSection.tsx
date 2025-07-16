
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useServices } from '@/lib/dataStore';
import { formatIndianPrice } from '@/types/spa';
import { GlassCard } from '../ui/GlassCard';
import { Clock, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesSection = () => {
  const services = useServices();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    console.log('ServicesSection: services loaded count:', services.length);
    console.log('ServicesSection: all services:', services);
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [services, selectedCategory]);

  // Safely extract categories with better filtering
  const categories = ['all', ...Array.from(new Set(
    services
      .map(s => s.category)
      .filter((category): category is string => 
        typeof category === 'string' && 
        category.length > 0 && 
        category.trim() !== ''
      )
  ))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (services.length === 0) {
    return (
      <section id="services" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #64ffda, #bb86fc)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              OUR SERVICES
            </motion.h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Services are managed through our admin dashboard
            </p>
          </motion.div>

          <div className="text-center py-20">
            <GlassCard className="p-12 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">No Services Available</h3>
              <p className="text-white/70 mb-6">
                Our services are added and managed through the admin dashboard. Check back soon for our luxury treatments!
              </p>
              <div className="space-y-4">
                <p className="text-white/60">
                  For immediate bookings, please call us at <span className="text-cyan-400">+91 6281508325</span>
                </p>
                <Link to="/booking">
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    Contact Us
                  </button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #64ffda, #bb86fc)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            OUR SERVICES
          </motion.h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Luxury treatments designed for ultimate relaxation and rejuvenation
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => {
              if (!category || typeof category !== 'string') return null;
              
              return (
                <motion.button
                  key={category}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                      : 'border-white/20 text-white/70 hover:border-cyan-400/50'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="inline mr-2" size={16} />
                  {formatCategoryName(category)}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              style={{ perspective: '1000px' }}
            >
              <GlassCard className="h-full group">
                <motion.div
                  className="relative overflow-hidden rounded-2xl mb-6"
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {service.image && service.image !== '/placeholder.svg' && service.image.trim() !== '' && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log('Service image failed to load:', service.image);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                      onLoad={() => console.log('Service image loaded successfully:', service.image)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">
                      {service.category || 'Service'}
                    </span>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex justify-between items-center text-sm text-white/60 mb-6">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-cyan-400" />
                    {service.duration} min
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-2 text-purple-400" />
                    {formatIndianPrice(service.price)}
                  </div>
                </div>

                <Link to="/booking" className="block">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    Book Now
                  </button>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
