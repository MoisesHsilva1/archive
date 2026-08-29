import React, { useRef, useState } from 'react';
import { Camera, Upload, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ImagePreview } from '@/components/atoms/image-preview';
import { LocalMediaFile } from '@/hooks/useMediaUpload';

export interface ImageUploaderProps {
  label: string;
  hint?: string;
  error?: string;
  coverMedia?: LocalMediaFile | null;
  galleryMedia?: LocalMediaFile[];
  onSelectCover: (file: File) => void;
  onRemoveCover?: () => void;
  onAddGallery?: (file: File) => void;
  onRemoveGallery?: (id: string) => void;
  allowGallery?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  hint,
  error,
  coverMedia,
  galleryMedia = [],
  onSelectCover,
  onRemoveCover,
  onAddGallery,
  onRemoveGallery,
  allowGallery = true,
  disabled = false,
  className,
}) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelectCover(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onAddGallery) {
      Array.from(files).forEach((file) => onAddGallery(file));
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      if (!coverMedia) {
        const [firstFile, ...rest] = files;
        if (firstFile) {
          onSelectCover(firstFile);
        }
        if (allowGallery && onAddGallery && rest.length > 0) {
          rest.forEach((file) => onAddGallery(file));
        }
      } else if (allowGallery && onAddGallery) {
        files.forEach((file) => onAddGallery(file));
      }
    }
  };

  return (
    <div className={twMerge(clsx('space-y-3', className))}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-text-secondary flex items-center gap-1">
          <span>{label}</span>
          <span className="text-red-400">*</span>
        </label>
        {hint && (
          <span className="text-[11px] font-mono text-text-muted">{hint}</span>
        )}
      </div>

      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        aria-label="Selecionar imagem de capa"
        className="hidden"
        disabled={disabled}
        onChange={handleCoverChange}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        aria-label="Adicionar imagens à galeria"
        className="hidden"
        disabled={disabled}
        onChange={handleGalleryChange}
      />

      {!coverMedia ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && coverInputRef.current?.click()}
          className={clsx(
            'flex flex-col items-center justify-center p-8 sm:p-10 border border-dashed rounded-[2px] cursor-pointer transition-colors bg-background-surface/50 text-center',
            isDragOver
              ? 'border-text-primary bg-background-surface'
              : 'border-border hover:border-neutral-600',
            error && 'border-red-500/80',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className="flex items-center gap-2 text-text-muted mb-3">
            <Camera className="w-5 h-5" />
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            Selecione ou arraste a imagem de capa
          </p>
          <p className="text-xs font-mono text-text-muted">
            PNG, JPG, WebP ou AVIF até 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <ImagePreview
            src={coverMedia.previewUrl}
            alt={coverMedia.alt}
            isCover
            onRemove={onRemoveCover}
          />

          {allowGallery && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Galeria de Fotos Adicionais ({galleryMedia.length})
                </span>
                <button
                  type="button"
                  onClick={() => !disabled && galleryInputRef.current?.click()}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Foto</span>
                </button>
              </div>

              {galleryMedia.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {galleryMedia.map((media) => (
                    <ImagePreview
                      key={media.id}
                      src={media.previewUrl}
                      alt={media.alt}
                      aspectRatio="4:3"
                      onRemove={() => onRemoveGallery?.(media.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
