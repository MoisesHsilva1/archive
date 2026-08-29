import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'minimal' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none';

    const variantStyles = {
      primary:
        'bg-text-primary text-background hover:bg-neutral-200 active:scale-[0.98] border border-text-primary',
      secondary:
        'bg-background-surface text-text-primary border border-border hover:bg-neutral-800 hover:border-neutral-700 active:scale-[0.98]',
      minimal:
        'bg-transparent text-text-primary hover:text-white group p-0 font-normal hover:underline underline-offset-4',
      ghost:
        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-surface border border-transparent hover:border-border',
    };

    const sizeStyles = {
      sm: variant === 'minimal' ? 'text-xs' : 'text-xs px-3 py-1.5 rounded-[2px]',
      md: variant === 'minimal' ? 'text-sm' : 'text-sm px-4 py-2 rounded-[2px]',
      lg: variant === 'minimal' ? 'text-base' : 'text-base px-6 py-3 rounded-[2px]',
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

Button.displayName = 'Button';
