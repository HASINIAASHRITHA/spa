
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        "before:absolute before:inset-0 before:rounded-3xl before:p-[1px]",
        "before:bg-gradient-to-r before:from-cyan-400/20 before:to-purple-400/20",
        "before:-z-10",
        hover && "hover:bg-white/10 transition-all duration-500",
        className
      )}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
