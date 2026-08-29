import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@/components/atoms/icon-button';
import { NavDrawerItem } from '@/components/molecules/nav-drawer-item';
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants';

export interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de Navegação"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        data-testid="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      <aside className="relative z-10 w-full max-w-md h-full bg-black border-l border-border flex flex-col justify-between p-6 sm:p-10 shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-text-primary rounded-full" />
            <span className="font-display font-bold text-lg tracking-tight uppercase text-text-primary">
              Navegação
            </span>
          </div>

          <IconButton
            aria-label="Fechar menu de navegação"
            variant="bordered"
            size="sm"
            onClick={onClose}
          >
            <X className="w-4 h-4 text-text-primary" />
          </IconButton>
        </div>

        <nav className="flex-1 py-8 sm:py-12 space-y-1" aria-label="Rotas do Archive">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/' && !location.hash
                : location.hash === item.href.replace('/', '');

            return (
              <NavDrawerItem
                key={item.id}
                item={item}
                isActive={isActive}
                onSelect={onClose}
              />
            );
          })}
        </nav>

        <div className="pt-6 border-t border-border flex items-center text-xs font-mono text-text-muted">
          <span>ARCHIVE // v0</span>
        </div>
      </aside>
    </div>
  );
};
