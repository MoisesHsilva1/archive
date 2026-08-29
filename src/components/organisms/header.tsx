import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import { IconButton } from '@/components/atoms/icon-button';
import { NavigationDrawer } from '@/components/organisms/navigation-drawer';
import { HOME_CONTENT } from '@/constants/home.constants';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { header } = HOME_CONTENT;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-black/90 backdrop-blur-sm border-b border-border transition-colors ${className}`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          <NavLink
            to="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none"
            aria-label="Archive — Página Inicial"
          >
            <span className="w-2 h-2 bg-text-primary rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-text-primary group-hover:text-white transition-colors">
              {header.brand}
            </span>
          </NavLink>

          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden sm:flex items-center gap-6 sm:gap-8" aria-label="Navegação Direta">
              {header.links.map((link, index) => {
                const isExternal = 'isExternal' in link && Boolean(link.isExternal);

                return isExternal ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
                    aria-label="GitHub do autor (abre em nova aba)"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-text-muted hover:text-text-primary" />
                  </a>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <IconButton
              aria-label="Abrir menu de navegação"
              variant="bordered"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="w-4 h-4 text-text-primary" />
            </IconButton>
          </div>
        </div>
      </header>

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
