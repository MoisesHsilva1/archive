import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          clsx(
            'w-full bg-background-surface text-text-primary placeholder:text-text-muted px-3.5 py-2.5 text-sm rounded-[2px] border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:opacity-50 disabled:cursor-not-allowed',
            hasError
              ? 'border-red-500/80 focus-visible:ring-red-500'
              : 'border-border hover:border-neutral-700 focus-visible:border-text-primary',
            className
          )
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
