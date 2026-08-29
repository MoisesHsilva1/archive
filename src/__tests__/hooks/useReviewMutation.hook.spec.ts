import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReviewMutation } from '@/hooks/useReviewMutation';
import * as mediaService from '@/services/media.service';
import * as reviewService from '@/services/review.service';
import { Category } from '@/enums/category.enum';
import { AuthUser } from '@/types/domain/auth.types';

vi.mock('@/services/media.service', () => ({
  uploadImageToCloudinary: vi.fn(),
  uploadMultipleImagesToCloudinary: vi.fn(),
}));

vi.mock('@/services/review.service', () => ({
  publishItemToFirestore: vi.fn(),
}));

describe('useReviewMutation hook', () => {
  const mockAuthor: AuthUser = {
    uid: 'author-1',
    email: 'owner@archive.io',
    displayName: 'Proprietário',
    photoURL: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar com estado limpo', () => {
    const { result } = renderHook(() => useReviewMutation());
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.uploadProgress).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.successItem).toBeNull();
  });

  it('deve orquestrar upload de imagens e publicação no Firestore com sucesso', async () => {
    const mockCoverMedia = {
      publicId: 'cover-id',
      url: 'https://cdn.com/cover.jpg',
      alt: 'Capa',
      aspectRatio: '16:9',
    };

    const mockSavedDoc = {
      id: 'item-123',
      title: 'Café Teste',
      slug: 'cafe-teste',
      category: Category.PLACES,
      content: 'Review completa.',
      coverImage: mockCoverMedia,
      gallery: [],
      tags: [],
      featured: false,
      authorId: 'author-1',
      authorName: 'Proprietário',
      createdAt: '2026-08-29T12:00:00Z',
      updatedAt: '2026-08-29T12:00:00Z',
    };

    vi.mocked(mediaService.uploadImageToCloudinary).mockResolvedValueOnce(
      mockCoverMedia
    );
    vi.mocked(reviewService.publishItemToFirestore).mockResolvedValueOnce(
      mockSavedDoc
    );

    const { result } = renderHook(() => useReviewMutation());

    const submitData = {
      values: {
        title: 'Café Teste',
        slug: 'cafe-teste',
        category: Category.PLACES,
        content: 'Review completa.',
        coverImage: {
          publicId: 'temp',
          url: 'https://placeholder.com',
          alt: 'Capa',
          aspectRatio: '16:9',
        },
        gallery: [],
        tags: [],
        featured: false,
      },
      coverFile: new File([''], 'cover.jpg', { type: 'image/jpeg' }),
      galleryFiles: [],
    };

    let publishedItem: unknown = null;
    await act(async () => {
      publishedItem = await result.current.publishReview(submitData, mockAuthor);
    });

    expect(mediaService.uploadImageToCloudinary).toHaveBeenCalledTimes(1);
    expect(reviewService.publishItemToFirestore).toHaveBeenCalledTimes(1);
    expect(publishedItem).toEqual(mockSavedDoc);
    expect(result.current.successItem).toEqual(mockSavedDoc);
  });

  it('deve capturar erro se o upload para o Cloudinary falhar', async () => {
    vi.mocked(mediaService.uploadImageToCloudinary).mockRejectedValueOnce(
      new Error('Erro de rede no upload')
    );

    const { result } = renderHook(() => useReviewMutation());

    const submitData = {
      values: {
        title: 'Café Teste',
        slug: 'cafe-teste',
        category: Category.PLACES,
        content: 'Review.',
        coverImage: {
          publicId: 'temp',
          url: 'temp',
          alt: 'Capa',
          aspectRatio: '16:9',
        },
        gallery: [],
        tags: [],
        featured: false,
      },
      coverFile: new File([''], 'cover.jpg', { type: 'image/jpeg' }),
      galleryFiles: [],
    };

    await act(async () => {
      try {
        await result.current.publishReview(submitData, mockAuthor);
      } catch {
        // expected error
      }
    });

    expect(result.current.error).toBe('Erro de rede no upload');
    expect(result.current.isSubmitting).toBe(false);
  });
});
