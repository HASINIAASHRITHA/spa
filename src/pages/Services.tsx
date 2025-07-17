// Make this whole section feel like a modern, premium spa brand:
// Use clean spacing, smooth transitions, larger headings, and soft gradient backgrounds.

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
      {/* TODO: Use modern layout with padding, margin, and max width */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* TODO: Apply premium font sizes and font weights */}
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
            {/* TODO: Improve this button with a background color and hover effect */}
            <NeonButton>
              Contact Us
            </NeonButton>
          </Link>
            </div>
          </GlassCard>
        </div>
        ) : (
          // TODO: Use Tailwind classes to make this responsive and modern
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* TODO: Make this card hoverable with shadow and rounded corners */}
                <GlassCard className="group overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-white/5 backdrop-blur-sm border border-white/10">
                  {service.image && service.image.trim() !== '' && service.image !== '/placeholder.svg' && (
                    <div className="relative overflow-hidden h-48 md:h-56">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6 md:p-7">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                      {service.name}
                    </h3>

                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-white/60 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-cyan-400" />
                        {service.duration} min
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-purple-400" />
                        {formatIndianPrice(service.price)}
                      </div>
                    </div>

                    <Link to="/booking">
                      {/* TODO: Improve this button with a background color and hover effect */}
                      <NeonButton className="w-full text-sm md:text-base py-3">
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

      {/* End of Services Content section */}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Services;
