import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'surface' | 'muted';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'outline',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    outline: 'border border-border text-text-secondary bg-transparent',
    surface: 'border border-border bg-background-surface text-text-primary',
    muted: 'border border-border-subtle bg-background-secondary text-text-muted',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wider uppercase rounded-[2px] transition-colors',
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
