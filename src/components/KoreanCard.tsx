import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KoreanCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

export function KoreanCard({ children, className, onClick, animate = true }: KoreanCardProps) {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      className={cn(
        'korean-card',
        onClick && 'cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
      onClick={onClick}
      {...(animate && {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
        whileHover: onClick ? { scale: 1.02 } : undefined,
        whileTap: onClick ? { scale: 0.98 } : undefined,
      })}
    >
      {children}
    </Component>
  );
}
