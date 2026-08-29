import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  as,
  className,
  children,
  ...props
}) => {
  const Component = as || (level === 'display' ? 'h1' : level);

  const levelStyles = {
    display:
      'font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-text-primary uppercase leading-[0.95]',
    h1: 'font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary uppercase leading-[1.05]',
    h2: 'font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary uppercase',
    h3: 'font-display text-xl sm:text-2xl font-bold tracking-tight text-text-primary',
    h4: 'font-display text-lg sm:text-xl font-semibold text-text-primary',
  };

  return (
    <Component className={twMerge(clsx(levelStyles[level], className))} {...props}>
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'lead' | 'body' | 'small' | 'label' | 'mono';
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  as: Component = 'p',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    lead: 'text-base sm:text-lg font-light leading-relaxed text-text-secondary',
    body: 'text-sm sm:text-base font-light leading-relaxed text-text-secondary',
    small: 'text-xs sm:text-sm font-light text-text-secondary',
    label: 'text-[11px] font-mono tracking-widest uppercase text-text-muted',
    mono: 'text-xs font-mono tracking-wider text-text-muted',
  };

  return (
    <Component className={twMerge(clsx(variantStyles[variant], className))} {...props}>
      {children}
    </Component>
  );
};
