
import { motion } from 'framer-motion';
import { Lightbulb, Droplets, Sparkles, Heart, Sun } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const beautyTips = [
  {
    id: 1,
    icon: Droplets,
    tip: "Stay hydrated – Drinking water improves skin glow naturally.",
    category: "Skincare"
  },
  {
    id: 2,
    icon: Sparkles,
    tip: "Deep conditioning once a week helps reduce frizz and adds shine.",
    category: "Hair Care"
  },
  {
    id: 3,
    icon: Sun,
    tip: "Use sunscreen daily to protect your skin from premature aging.",
    category: "Skincare"
  },
  {
    id: 4,
    icon: Heart,
    tip: "Schedule regular spa treatments to maintain skin health and relaxation.",
    category: "Spa Routine"
  },
  {
    id: 5,
    icon: Lightbulb,
    tip: "Gentle exfoliation twice a week removes dead skin cells for smoother skin.",
    category: "Skincare"
  }
];

export const BeautyTipsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-black/40 to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            BEAUTY & WELLNESS TIPS
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Expert advice from our professional therapists for your daily routine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beautyTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center group-hover:from-cyan-400/30 group-hover:to-purple-400/30 transition-colors">
                      <tip.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full mb-3">
                      {tip.category}
                    </span>
                    <p className="text-white/80 leading-relaxed">
                      💡 {tip.tip}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
