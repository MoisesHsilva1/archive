import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Text } from '@/components/atoms/typography';

export interface QuoteBlockProps {
  quote: string;
  author?: string;
  className?: string;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, className }) => {
  return (
    <blockquote
      className={twMerge(
        clsx(
          'relative pl-6 py-2 border-l-2 border-text-primary/70 my-8 sm:my-12',
          className
        )
      )}
    >
      <Text
        variant="lead"
        className="font-normal italic text-text-primary tracking-tight leading-relaxed"
      >
        "{quote}"
      </Text>
      {author && (
        <cite className="block not-italic mt-3">
          <Text variant="small" className="text-text-muted uppercase tracking-widest font-mono">
            — {author}
          </Text>
        </cite>
      )}
    </blockquote>
  );
};
