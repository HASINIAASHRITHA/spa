
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Heart } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { dataStore } from '@/lib/dataStore';
import { useToast } from '@/hooks/use-toast';

export const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    serviceRating: 0,
    staffRating: 0,
    facilityRating: 0
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, message, and overall rating are required.",
        variant: "destructive"
      });
      return;
    }

    // Save feedback to dataStore
    const feedbackData = {
      customerName: formData.name,
      customerEmail: formData.email,
      rating: rating,
      message: formData.message,
      serviceRating: formData.serviceRating || rating,
      staffRating: formData.staffRating || rating,
      facilityRating: formData.facilityRating || rating
    };

    console.log('Submitting feedback:', feedbackData);
    dataStore.addFeedback(feedbackData);

    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });

    // Reset form
    setRating(0);
    setFormData({
      name: '',
      email: '',
      message: '',
      serviceRating: 0,
      staffRating: 0,
      facilityRating: 0
    });
  };

  const StarRating = ({ 
    value, 
    onChange, 
    onHover = () => {}, 
    onLeave = () => {},
    size = 24 
  }: {
    value: number;
    onChange: (rating: number) => void;
    onHover?: (rating: number) => void;
    onLeave?: () => void;
    size?: number;
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <Star 
            size={size} 
            fill={star <= value ? 'currentColor' : 'none'} 
          />
        </button>
      ))}
    </div>
  );

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            SHARE YOUR EXPERIENCE
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Your feedback helps us continue to provide exceptional spa experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Overall Experience *
                </label>
                <div className="flex items-center space-x-4">
                  <StarRating
                    value={hoveredRating || rating}
                    onChange={setRating}
                    onHover={setHoveredRating}
                    onLeave={() => setHoveredRating(0)}
                    size={32}
                  />
                  <span className="text-white/60">
                    {rating > 0 && (
                      rating === 5 ? 'Excellent!' :
                      rating === 4 ? 'Very Good' :
                      rating === 3 ? 'Good' :
                      rating === 2 ? 'Fair' : 'Poor'
                    )}
                  </span>
                </div>
              </div>

              {/* Detailed Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Service Quality
                  </label>
                  <StarRating
                    value={formData.serviceRating}
                    onChange={(rating) => setFormData({...formData, serviceRating: rating})}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Staff Friendliness
                  </label>
                  <StarRating
                    value={formData.staffRating}
                    onChange={(rating) => setFormData({...formData, staffRating: rating})}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Facility Cleanliness
                  </label>
                  <StarRating
                    value={formData.facilityRating}
                    onChange={(rating) => setFormData({...formData, facilityRating: rating})}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Your Feedback *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-pink-400 focus:outline-none transition-colors resize-none h-32"
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <NeonButton type="submit" className="px-8 py-3">
                  <Heart className="mr-2" size={18} />
                  Submit Feedback
                  <Send className="ml-2" size={18} />
                </NeonButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
