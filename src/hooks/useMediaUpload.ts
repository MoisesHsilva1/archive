import { useState, useCallback, useEffect } from 'react';

export interface LocalMediaFile {
  id: string;
  file: File;
  previewUrl: string;
  alt: string;
}

export interface UseMediaUploadReturn {
  coverMedia: LocalMediaFile | null;
  galleryMedia: LocalMediaFile[];
  setCoverImage: (file: File, alt?: string) => void;
  removeCoverImage: () => void;
  addGalleryImage: (file: File, alt?: string) => void;
  removeGalleryImage: (id: string) => void;
  clearAllMedia: () => void;
}

export const useMediaUpload = (): UseMediaUploadReturn => {
  const [coverMedia, setCoverMedia] = useState<LocalMediaFile | null>(null);
  const [galleryMedia, setGalleryMedia] = useState<LocalMediaFile[]>([]);

  const setCoverImage = useCallback((file: File, alt = 'Imagem de capa') => {
    setCoverMedia((prev) => {
      if (prev?.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return {
        id: `cover-${Date.now()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        alt,
      };
    });
  }, []);

  const removeCoverImage = useCallback(() => {
    setCoverMedia((prev) => {
      if (prev?.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return null;
    });
  }, []);

  const addGalleryImage = useCallback((file: File, alt = 'Imagem da galeria') => {
    setGalleryMedia((prev) => [
      ...prev,
      {
        id: `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        alt,
      },
    ]);
  }, []);

  const removeGalleryImage = useCallback((id: string) => {
    setGalleryMedia((prev) => {
      const itemToRemove = prev.find((item) => item.id === id);
      if (itemToRemove?.previewUrl) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clearAllMedia = useCallback(() => {
    if (coverMedia?.previewUrl) {
      URL.revokeObjectURL(coverMedia.previewUrl);
    }
    for (const item of galleryMedia) {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    }
    setCoverMedia(null);
    setGalleryMedia([]);
  }, [coverMedia, galleryMedia]);

  useEffect(() => {
    return () => {
      if (coverMedia?.previewUrl) {
        URL.revokeObjectURL(coverMedia.previewUrl);
      }
      for (const item of galleryMedia) {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      }
    };
  }, [coverMedia, galleryMedia]);

  return {
    coverMedia,
    galleryMedia,
    setCoverImage,
    removeCoverImage,
    addGalleryImage,
    removeGalleryImage,
    clearAllMedia,
  };
};
