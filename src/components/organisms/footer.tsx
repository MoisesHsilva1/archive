import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT } from '@/constants/home.constants';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const { footer } = HOME_CONTENT;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Rodapé do Archive"
      className={`w-full py-12 sm:py-16 bg-black border-t border-border ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
          <span className="font-bold text-text-primary tracking-wide">{footer.brand}</span>
          <span>/</span>
          <span>{footer.year}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={footer.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <span>Topo</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
