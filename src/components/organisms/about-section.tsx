import React from 'react';
import { Heading, Text } from '@/components/atoms/typography';
import { HOME_CONTENT } from '@/constants/home.constants';

export interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const { about } = HOME_CONTENT;

  return (
    <section
      id="sobre"
      aria-label="Sobre o Archive e o Autor"
      className={`py-16 sm:py-24 border-b border-border ${className}`}
    >
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Text variant="label">{about.tagline}</Text>
          <Heading level="h2">{about.title}</Heading>
        </div>

        <div className="space-y-4">
          {about.paragraphs.map((paragraph, index) => (
            <Text key={index} variant="lead" className="text-text-secondary font-light">
              {paragraph}
            </Text>
          ))}
        </div>

        <div className="pt-2 border-l-2 border-text-primary/60 pl-4 my-6">
          <p className="font-display text-lg sm:text-xl font-semibold text-text-primary tracking-wide uppercase">
            "{about.quote}"
          </p>
        </div>
      </div>
    </section>
  );
};
