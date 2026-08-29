import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, rows = 5, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={twMerge(
          clsx(
            'w-full bg-background-surface text-text-primary placeholder:text-text-muted px-3.5 py-2.5 text-sm rounded-[2px] border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:opacity-50 disabled:cursor-not-allowed resize-y leading-relaxed',
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

Textarea.displayName = 'Textarea';
