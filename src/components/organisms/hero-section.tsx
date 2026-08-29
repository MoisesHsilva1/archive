import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Heading, Text } from '@/components/atoms/typography';
import { HOME_CONTENT } from '@/constants/home.constants';

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const { hero } = HOME_CONTENT;

  return (
    <section
      aria-label="Apresentação do Archive"
      className={`relative pt-8 pb-16 sm:py-20 border-b border-border ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative border-2 border-border-solid bg-black overflow-hidden shadow-2xl">
            <div className="aspect-[9/16] sm:aspect-[4/5] max-h-[560px] w-full overflow-hidden">
              <img
                src={hero.artPath}
                alt={hero.artAlt}
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95 hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
            <div className="px-3 py-2 bg-black border-t border-border flex items-center text-[10px] font-mono tracking-widest text-text-muted">
              <span>{hero.artCaption}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-text-muted uppercase">
              {hero.author}
            </span>
            <Heading level="display" as="h1" className="text-text-primary">
              {hero.title}
            </Heading>
          </div>

          <Text variant="lead" className="max-w-md text-text-secondary font-light">
            {hero.subtitle}
          </Text>

          <div className="pt-2">
            <a
              href="#acervo"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-primary hover:text-white border-b border-text-primary pb-1 group transition-colors"
            >
              <span>Explorar Acervo</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
