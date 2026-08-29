import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className, ...props }) => {
  const sizeStyles = {
    sm: 'w-3.5 h-3.5 border-[1.5px]',
    md: 'w-5 h-5 border-2',
    lg: 'w-7 h-7 border-2',
  };

  return (
    <div
      role="status"
      aria-label="Carregando"
      className={twMerge(
        clsx(
          'inline-block animate-spin rounded-full border-t-text-primary border-r-transparent border-b-text-primary border-l-transparent',
          sizeStyles[size],
          className
        )
      )}
      {...props}
    />
  );
};
