import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NavigationItem } from '@/constants/navigation.constants';

export interface NavDrawerItemProps {
  item: NavigationItem;
  isActive?: boolean;
  onSelect: () => void;
}

export const NavDrawerItem: React.FC<NavDrawerItemProps> = ({
  item,
  isActive = false,
  onSelect,
}) => {
  const isExternal = Boolean(item.isExternal);

  const content = (
    <div className="group flex items-baseline justify-between py-4 sm:py-5 border-b border-border/60 hover:border-text-primary transition-colors cursor-pointer w-full text-left">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span
          className={`font-mono text-xs ${
            isActive ? 'text-text-primary font-bold' : 'text-text-muted group-hover:text-text-primary'
          } transition-colors`}
        >
          {item.index}
        </span>
        <span
          className={`font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase ${
            isActive ? 'text-white' : 'text-text-primary group-hover:text-white group-hover:translate-x-2'
          } transition-all duration-200`}
        >
          {item.label}
        </span>
      </div>

      {isExternal && (
        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
      )}
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSelect}
        className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary"
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      onClick={onSelect}
      className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary"
    >
      {content}
    </a>
  );
};
