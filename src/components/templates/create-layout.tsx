import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { AuthUser } from '@/types/domain/auth.types';

export interface CreateLayoutProps {
  user?: AuthUser | null;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const CreateLayout: React.FC<CreateLayoutProps> = ({
  user,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <header className="sticky top-0 z-30 w-full bg-black/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none group"
              aria-label="Voltar para a página inicial"
            >
              <span className="w-8 h-8 rounded-[1px] bg-black border border-border group-hover:border-text-primary flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 text-text-primary" />
              </span>
              <span className="hidden sm:inline">Voltar ao Archive</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
              Criar Experiência
            </span>

            {user && onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-xs font-mono text-text-muted hover:text-red-400 gap-1.5"
                aria-label="Encerrar sessão"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 sm:px-10 py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
};
