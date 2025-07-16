
import { motion } from 'framer-motion';
import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { useGalleryImages } from '@/lib/dataStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

const Gallery = () => {
  const galleryImages = useGalleryImages();

  useEffect(() => {
    console.log('Gallery page: loaded images count:', galleryImages.length);
    console.log('All gallery images:', galleryImages);
  }, [galleryImages]);

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
              OUR GALLERY
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our luxurious spa facilities and serene treatment rooms
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <GlassCard className="p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">No Gallery Images Yet</h2>
                <p className="text-white/70 mb-6">
                  Gallery images can be added through the admin dashboard. Once added, they will appear here automatically.
                </p>
                <div className="space-y-4">
                  <p className="text-white/60">
                    For inquiries, please call us at <span className="text-cyan-400">+91 6281508325</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Gallery image failed to load:', image.url);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        onLoad={() => console.log('Gallery image loaded successfully:', image.url)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                        {image.description && (
                          <p className="text-white/70 text-sm mt-1">{image.description}</p>
                        )}
                        <span className="inline-block mt-2 px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs">
                          {image.category}
                        </span>
                      </div>
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

export default Gallery;
