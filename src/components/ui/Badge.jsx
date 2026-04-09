import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const badgeVariants = {
  default: 'border-transparent bg-gray-100 text-gray-800',
  secondary: 'border-transparent bg-blue-100 text-blue-800',
  destructive: 'border-transparent bg-red-100 text-red-800',
  outline: 'border-gray-300 text-gray-800',
  success: 'border-transparent bg-green-100 text-green-800',
  warning: 'border-transparent bg-yellow-100 text-yellow-800',
};

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
