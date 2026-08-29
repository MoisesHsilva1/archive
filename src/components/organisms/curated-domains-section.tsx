import React from 'react';
import { Camera, FolderGit2, MapPin } from 'lucide-react';
import { Heading, Text } from '@/components/atoms/typography';
import { CATEGORY_OPTIONS } from '@/enums/category.enum';
import { HOME_CONTENT } from '@/constants/home.constants';

const ICONS_MAP = {
  Camera,
  FolderGit2,
  MapPin,
} as const;

export interface CuratedDomainsSectionProps {
  className?: string;
}

export const CuratedDomainsSection: React.FC<CuratedDomainsSectionProps> = ({
  className = '',
}) => {
  const { domains } = HOME_CONTENT;

  return (
    <section
      id="acervo"
      aria-label="Áreas de Curadoria do Archive"
      className={`py-16 sm:py-24 border-b border-border space-y-10 ${className}`}
    >
      <div className="space-y-2">
        <Text variant="label">{domains.tagline}</Text>
        <Heading level="h2">{domains.title}</Heading>
      </div>

      <div className="border-t border-border divide-y divide-border">
        {CATEGORY_OPTIONS.map((category, index) => {
          const IconComponent = ICONS_MAP[category.iconName] || Camera;
          const formattedIndex = String(index + 1).padStart(2, '0');

          return (
            <div
              key={category.value}
              className="group py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-colors duration-200 hover:bg-background-surface/30 px-1 sm:px-3 cursor-default"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-mono text-xs text-text-muted group-hover:text-text-primary transition-colors">
                  {formattedIndex}
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-text-primary group-hover:translate-x-1.5 transition-transform duration-200 uppercase">
                  {category.label}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <Text
                  variant="small"
                  className="text-text-secondary group-hover:text-text-primary transition-colors font-light"
                >
                  {category.description}
                </Text>

                <IconComponent className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
