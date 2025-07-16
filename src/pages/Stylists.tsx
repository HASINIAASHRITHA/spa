
import { motion } from 'framer-motion';
import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Star, Award, Clock } from 'lucide-react';
import { useStylists } from '@/lib/dataStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

const Stylists = () => {
  const stylists = useStylists();

  useEffect(() => {
    console.log('Stylists page: loaded stylists count:', stylists.length);
    console.log('All stylists:', stylists);
  }, [stylists]);

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
              OUR STYLISTS
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Meet our team of expert therapists and wellness specialists
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stylists Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {stylists.length === 0 ? (
            <div className="text-center py-20">
              <GlassCard className="p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">No Staff Added Yet</h2>
                <p className="text-white/70 mb-6">
                  Staff profiles can be added through the admin dashboard. Once added, they will appear here automatically.
                </p>
                <div className="space-y-4">
                  <p className="text-white/60">
                    For appointment bookings, please call us at <span className="text-cyan-400">+91 6281508325</span>
                  </p>
                  <Link to="/booking">
                    <NeonButton>
                      Book Appointment
                    </NeonButton>
                  </Link>
                </div>
              </GlassCard>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stylists.map((stylist, index) => (
                <motion.div
                  key={stylist.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full group hover:transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={stylist.profileImage}
                        alt={stylist.name}
                        className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Stylist image failed to load:', stylist.profileImage);
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                        }}
                        onLoad={() => console.log('Stylist image loaded successfully:', stylist.profileImage)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star size={16} fill="currentColor" />
                          <span className="text-white text-sm">{stylist.rating}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${stylist.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {stylist.available ? 'Available' : 'Booked'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {stylist.name}
                      </h3>
                      
                      <p className="text-cyan-400 font-semibold mb-4">{stylist.title}</p>
                      
                      <p className="text-white/70 mb-4 leading-relaxed text-sm">
                        {stylist.bio}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-white/60">
                          <Clock size={16} className="mr-2 text-cyan-400" />
                          {stylist.experience} experience
                        </div>
                        <div className="flex items-center text-sm text-white/60">
                          <Award size={16} className="mr-2 text-purple-400" />
                          {stylist.specializations.join(", ")}
                        </div>
                      </div>

                      <Link to="/booking" className="block">
                        <NeonButton className="w-full" disabled={!stylist.available}>
                          {stylist.available ? `Book with ${stylist.name}` : 'Currently Unavailable'}
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

export default Stylists;
