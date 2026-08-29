import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Category, CATEGORY_METADATA_MAP } from '@/enums/category.enum';
import { Badge } from '@/components/atoms/badge';

export interface ReviewPreviewCardProps {
  title?: string;
  category?: Category;
  content?: string;
  location?: string;
  rating?: number;
  coverPreviewUrl?: string | null;
  className?: string;
}

export const ReviewPreviewCard: React.FC<ReviewPreviewCardProps> = ({
  title,
  category = Category.PLACES,
  content,
  location,
  rating,
  coverPreviewUrl,
  className = '',
}) => {
  const categoryMeta = CATEGORY_METADATA_MAP[category];

  return (
    <article
      aria-label="Pré-visualização da experiência"
      className={`p-6 sm:p-8 bg-background-secondary border border-border rounded-[2px] space-y-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
          Pré-visualização Editorial
        </span>
        <Badge variant="outline">{categoryMeta?.label ?? 'Acervo'}</Badge>
      </div>

      {coverPreviewUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-[2px] border border-border bg-background-surface">
          <img
            src={coverPreviewUrl}
            alt={title || 'Pré-visualização da capa'}
            className="w-full h-full object-cover grayscale contrast-105"
          />
        </div>
      ) : (
        <div className="aspect-video w-full flex items-center justify-center rounded-[2px] border border-dashed border-border bg-background-surface/30">
          <p className="text-xs font-mono text-text-muted">
            Nenhuma imagem de capa selecionada
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight leading-snug">
            {title && title.trim().length > 0
              ? title
              : 'Título da Experiência ou Lugar'}
          </h3>

          {rating !== undefined && rating > 0 && (
            <div className="flex items-center gap-1 text-xs font-mono text-text-primary">
              <Star className="w-3.5 h-3.5 fill-text-primary" />
              <span>{rating}/10</span>
            </div>
          )}
        </div>

        {location && location.trim().length > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
            <MapPin className="w-3.5 h-3.5 text-text-secondary" />
            <span>{location}</span>
          </div>
        )}

        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line line-clamp-4">
          {content && content.trim().length > 0
            ? content
            : 'O relato ou análise pessoal aparecerá aqui conforme você preenche o formulário...'}
        </p>
      </div>
    </article>
  );
};
