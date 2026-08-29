import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'minimal' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'bordered', size = 'md', className, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none';

    const variantStyles = {
      bordered:
        'bg-black border border-border hover:border-text-primary text-text-primary hover:text-white',
      ghost:
        'bg-transparent border border-transparent hover:border-border text-text-secondary hover:text-text-primary',
      minimal:
        'bg-transparent border-0 text-text-primary hover:text-white p-0',
    };

    const sizeStyles = {
      sm: 'w-8 h-8 rounded-[1px]',
      md: 'w-10 h-10 rounded-[1px]',
      lg: 'w-12 h-12 rounded-[1px]',
    };

    return (
      <button
        ref={ref}
        className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
