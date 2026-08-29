import React from 'react';
import { Film, BookOpen, Music, Gamepad2, MapPin, Camera, FolderGit2 } from 'lucide-react';
import { CategoryOption } from '@/enums/category.enum';
import { Badge } from '@/components/atoms/badge';
import { Text } from '@/components/atoms/typography';

const ICONS_MAP = {
  Film,
  BookOpen,
  Music,
  Gamepad2,
  MapPin,
  Camera,
  FolderGit2,
} as const;

export interface CategoryPillProps {
  category: CategoryOption;
  className?: string;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ category, className }) => {
  const IconComponent = ICONS_MAP[category.iconName] || Film;

  return (
    <div
      className={`group relative flex flex-col p-5 sm:p-6 bg-background-secondary border border-border hover:border-text-muted transition-all duration-300 rounded-[2px] ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <Badge variant="surface" className="group-hover:border-text-secondary">
          <IconComponent className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-colors" />
          <span>{category.label}</span>
        </Badge>
        <span className="text-xs text-text-muted font-mono tracking-widest">
          {category.value.toUpperCase()}
        </span>
      </div>
      <Text variant="small" className="text-text-secondary group-hover:text-text-primary transition-colors">
        {category.description}
      </Text>
    </div>
  );
};
