import React from 'react';
import { Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '@/components/atoms/icon-button';

export interface ImagePreviewProps {
  src: string;
  alt?: string;
  onRemove?: () => void;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  className?: string;
  isCover?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = 'Pré-visualização da imagem',
  onRemove,
  aspectRatio = '16:9',
  className,
  isCover = false,
}) => {
  const aspectStyles = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    auto: '',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative group overflow-hidden rounded-[2px] bg-background-surface border border-border',
          aspectStyles[aspectRatio],
          className
        )
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-300"
      />
      {isCover && (
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-border text-[10px] font-mono uppercase tracking-widest text-text-primary">
          Capa Principal
        </span>
      )}
      {onRemove && (
        <div className="absolute top-2 right-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton
            type="button"
            aria-label="Remover imagem"
            variant="bordered"
            size="sm"
            onClick={onRemove}
            className="bg-black/80 hover:bg-red-950/80 hover:border-red-500/50"
          >
            <Trash2 className="w-3.5 h-3.5 text-text-primary hover:text-red-400" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
