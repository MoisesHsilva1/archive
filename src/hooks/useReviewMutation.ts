import { useState, useTransition, useCallback } from 'react';
import { ItemDocument, ItemCreatePayload, ItemMedia } from '@/types/domain/item.types';
import { AuthUser } from '@/types/domain/auth.types';
import { CreateItemFormSubmitData } from '@/components/organisms/create-item-form';
import {
  uploadImageToStorage,
  uploadMultipleImagesToStorage,
} from '@/services/media.service';
import { publishItemToFirestore } from '@/services/review.service';

export interface UseReviewMutationReturn {
  publishReview: (
    data: CreateItemFormSubmitData,
    author: AuthUser
  ) => Promise<ItemDocument>;
  isSubmitting: boolean;
  uploadProgress: number | null;
  error: string | null;
  successItem: ItemDocument | null;
  resetMutation: () => void;
}

export const useReviewMutation = (): UseReviewMutationReturn => {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successItem, setSuccessItem] = useState<ItemDocument | null>(null);

  const resetMutation = useCallback(() => {
    setError(null);
    setSuccessItem(null);
    setUploadProgress(null);
    setIsUploading(false);
  }, []);

  const publishReview = useCallback(
    async (
      data: CreateItemFormSubmitData,
      author: AuthUser
    ): Promise<ItemDocument> => {
      if (isPending || isUploading) {
        throw new Error('Uma publicação já está em andamento');
      }

      setError(null);
      setSuccessItem(null);
      setIsUploading(true);
      setUploadProgress(10);

      const targetFolder = `items/${data.values.category}`;

      try {
        setUploadProgress(25);
        const coverMedia: ItemMedia = await uploadImageToStorage(
          data.coverFile,
          {
            alt: data.values.title,
            folder: targetFolder,
            onProgress: (pct) => setUploadProgress(Math.min(60, 20 + Math.round(pct * 0.4))),
          }
        );

        let galleryMedia: ItemMedia[] = [];
        if (data.galleryFiles.length > 0) {
          setUploadProgress(65);
          galleryMedia = await uploadMultipleImagesToStorage(
            data.galleryFiles,
            {
              folder: `${targetFolder}/gallery`,
              onProgress: (pct) => setUploadProgress(Math.min(90, 60 + Math.round(pct * 0.3))),
            }
          );
        }

        setUploadProgress(95);

        const payload: ItemCreatePayload = {
          title: data.values.title,
          slug: data.values.slug,
          category: data.values.category,
          content: data.values.content,
          excerpt: data.values.excerpt || '',
          location: data.values.location || '',
          rating: data.values.rating || 0,
          coverImage: coverMedia,
          gallery: galleryMedia,
          tags: data.values.tags || [],
          featured: Boolean(data.values.featured),
          authorId: author.uid,
          authorName: author.displayName || author.email || 'Proprietário',
        };

        return await new Promise<ItemDocument>((resolve, reject) => {
          startTransition(async () => {
            try {
              const createdDoc = await publishItemToFirestore(payload, author);
              setSuccessItem(createdDoc);
              setUploadProgress(100);
              setIsUploading(false);
              resolve(createdDoc);
            } catch (err) {
              const message =
                err instanceof Error
                  ? err.message
                  : 'Falha ao persistir documento no Firestore';
              setError(message);
              setIsUploading(false);
              setUploadProgress(null);
              reject(err);
            }
          });
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : 'Erro ao realizar upload de imagens para o Firebase Storage';
        setError(message);
        setIsUploading(false);
        setUploadProgress(null);
        throw err;
      }
    },
    [isPending, isUploading]
  );

  return {
    publishReview,
    isSubmitting: isPending || isUploading,
    uploadProgress,
    error,
    successItem,
    resetMutation,
  };
};
