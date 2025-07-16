
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    text: "Absolutely amazing experience! The staff was professional and the massage was incredibly relaxing. I felt rejuvenated afterwards.",
    treatment: "Deep Tissue Massage"
  },
  {
    id: 2,
    name: "Rahul Gupta",
    rating: 5,
    text: "The facial treatment was phenomenal. My skin has never looked better! The ambiance is so peaceful and luxurious.",
    treatment: "Hydrating Facial"
  },
  {
    id: 3,
    name: "Sneha Patel",
    rating: 5,
    text: "Perfect place to unwind. The aromatherapy session was divine and the customer service exceeded my expectations.",
    treatment: "Aromatherapy Session"
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 5,
    text: "First time at a spa and they made me feel so comfortable. The hot stone massage was incredible. Highly recommended!",
    treatment: "Hot Stone Massage"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover why our clients choose LUXE SPA for their wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full p-6 relative">
                <Quote className="absolute top-4 right-4 w-6 h-6 text-cyan-400/30" />
                
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-cyan-400 text-sm">{testimonial.treatment}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
