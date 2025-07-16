
import { motion } from 'framer-motion';
import { NeonButton } from '../ui/NeonButton';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* CSS-only animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-300/25 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-purple-300/35 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-500/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="text-cyan-400 opacity-30" size={40} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-24"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Star className="text-purple-400 opacity-40" size={60} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="text-yellow-400 opacity-25" size={50} />
      </motion.div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6"
            style={{
              background: 'linear-gradient(45deg, #64ffda, #bb86fc, #03dac6)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            TRANSCEND
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-4xl font-light text-white/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Beyond luxury.{' '}
            <motion.span
              className="text-cyan-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Beyond beauty.
            </motion.span>
          </motion.div>

          <motion.p
            className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Experience the future of wellness at our revolutionary spa sanctuary. 
            Where cutting-edge technology meets ancient healing wisdom.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <NeonButton variant="primary">
              <Link to="/booking">Begin Your Journey</Link>
            </NeonButton>
            <NeonButton variant="secondary">
              <Link to="/services">Explore Services</Link>
            </NeonButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,255,218,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};
