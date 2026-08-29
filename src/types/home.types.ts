import { HOME_CONTENT } from '@/constants/home.constants';

export type HomeContent = typeof HOME_CONTENT;

export interface SectionHeaderProps {
  tagline?: string;
  title: string;
  description?: string;
  className?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}
