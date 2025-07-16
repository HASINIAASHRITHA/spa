
import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const NeonButton = ({ children, onClick, variant = 'primary', className, ...props }: NeonButtonProps) => {
  const variants = {
    primary: "bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold",
    secondary: "bg-transparent border-2 border-cyan-400 text-cyan-400"
  };

  // Extract conflicting props that clash with Framer Motion
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onTransitionEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      className={cn(
        "px-8 py-4 rounded-full relative overflow-hidden",
        "shadow-[0_0_20px_rgba(100,255,218,0.3)]",
        "hover:shadow-[0_0_40px_rgba(100,255,218,0.6)]",
        "transition-all duration-300",
        variants[variant],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...buttonProps}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
