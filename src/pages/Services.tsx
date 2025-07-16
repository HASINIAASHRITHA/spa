
import { motion } from 'framer-motion';
import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Clock, DollarSign, Star } from 'lucide-react';
import { useServices } from '@/lib/dataStore';
import { formatIndianPrice } from '@/types/spa';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

const Services = () => {
  const services = useServices();

  useEffect(() => {
    console.log('Services page: loaded services count:', services.length);
    console.log('All services:', services);
  }, [services]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <FloatingNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              OUR SERVICES
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience luxury wellness with our signature spa treatments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <GlassCard className="p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">No Services Available Yet</h2>
                <p className="text-white/70 mb-6">
                  Services can be added through the admin dashboard. Once added, they will appear here automatically.
                </p>
                <div className="space-y-4">
                  <p className="text-white/60">
                    For immediate bookings, please call us at <span className="text-cyan-400">+91 6281508325</span>
                  </p>
                  <Link to="/booking">
                    <NeonButton>
                      Contact Us
                    </NeonButton>
                  </Link>
                </div>
              </GlassCard>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full group hover:transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    {service.image && service.image.trim() !== '' && service.image !== '/placeholder.svg' && (
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.log('Service image failed to load:', service.image);
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                          onLoad={() => console.log('Service image loaded successfully:', service.image)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
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
                        <NeonButton className="w-full">
                          Book Now
                        </NeonButton>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Services;
