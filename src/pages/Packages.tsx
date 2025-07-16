
import { motion } from 'framer-motion';
import { FloatingNavigation } from '@/components/layout/FloatingNavigation';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Gift, Percent, Tag } from 'lucide-react';
import { usePromotions } from '@/lib/dataStore';
import { Link } from 'react-router-dom';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { useEffect } from 'react';

const Packages = () => {
  const promotions = usePromotions();

  useEffect(() => {
    console.log('Packages page: loaded promotions count:', promotions.length);
    console.log('All promotions:', promotions);
  }, [promotions]);

  // Filter active promotions
  const activePromotions = promotions.filter(promo => 
    promo.active && new Date(promo.validUntil) > new Date()
  );

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
              SPA PACKAGES & PROMOTIONS
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Exclusive offers and packages curated by our spa team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promotions Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {activePromotions.length === 0 ? (
            <div className="text-center py-20">
              <GlassCard className="p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">No Active Promotions</h2>
                <p className="text-white/70 mb-6">
                  Promotions and packages can be added through the admin dashboard. Check back soon for exciting offers!
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePromotions.map((promotion, index) => (
                <motion.div
                  key={promotion.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full group hover:transform hover:scale-105 transition-all duration-300 border-green-400/30">
                    <div className="relative p-6">
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Percent className="w-4 h-4 mr-1" />
                          {promotion.discountType === 'percentage' ? `${promotion.discountValue}% OFF` : `₹${promotion.discountValue} OFF`}
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <Tag className="text-green-400 mr-2" size={24} />
                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {promotion.name}
                        </h3>
                      </div>
                      
                      <p className="text-white/70 mb-4">{promotion.description}</p>

                      {promotion.code && (
                        <div className="bg-black/30 border border-green-400/30 rounded-lg p-3 mb-4">
                          <p className="text-green-400 text-sm font-semibold">Promo Code:</p>
                          <p className="text-white font-mono text-lg">{promotion.code}</p>
                        </div>
                      )}

                      {promotion.applicableServices && promotion.applicableServices.length > 0 && (
                        <div className="mb-4">
                          <p className="text-white/60 text-sm mb-2">Applicable to:</p>
                          <div className="flex flex-wrap gap-1">
                            {promotion.applicableServices.map((service, i) => (
                              <span key={i} className="px-2 py-1 bg-green-400/20 text-green-400 rounded text-xs">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-white/50 mb-4">
                        Valid until: {new Date(promotion.validUntil).toLocaleDateString('en-IN')}
                      </div>

                      {promotion.usageLimit && (
                        <div className="text-xs text-white/50 mb-4">
                          {promotion.usageLimit - promotion.usageCount} uses remaining
                        </div>
                      )}

                      <Link to="/booking" className="block">
                        <NeonButton className="w-full">
                          <Gift className="mr-2" size={18} />
                          Book with Offer
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

export default Packages;
