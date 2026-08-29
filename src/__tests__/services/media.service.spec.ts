import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axiosClient } from '@/api/axiosClient';
import {
  uploadImageToCloudinary,
  uploadMultipleImagesToCloudinary,
} from '@/services/media.service';

vi.mock('@/api/axiosClient', () => ({
  axiosClient: {
    post: vi.fn(),
  },
}));

describe('media.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve realizar upload de imagem para o Cloudinary e formatar resposta ItemMedia', async () => {
    const mockFile = new File(['image-bits'], 'fachada.jpg', { type: 'image/jpeg' });
    const mockCloudinaryResponse = {
      data: {
        public_id: 'archive/items/fachada-123',
        secure_url: 'https://res.cloudinary.com/demo/image/upload/fachada-123.jpg',
        url: 'http://res.cloudinary.com/demo/image/upload/fachada-123.jpg',
        format: 'jpg',
        width: 1920,
        height: 1080,
        bytes: 204800,
        created_at: '2026-08-29T12:00:00Z',
        original_filename: 'fachada',
      },
    };

    vi.mocked(axiosClient.post).mockResolvedValueOnce(mockCloudinaryResponse);

    const onProgress = vi.fn();
    const result = await uploadImageToCloudinary(mockFile, {
      alt: 'Fachada Principal',
      onProgress,
    });

    expect(axiosClient.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      publicId: 'archive/items/fachada-123',
      url: 'https://res.cloudinary.com/demo/image/upload/fachada-123.jpg',
      alt: 'Fachada Principal',
      aspectRatio: '1920:1080',
      width: 1920,
      height: 1080,
    });
  });

  it('deve realizar upload de múltiplos arquivos em lote', async () => {
    const file1 = new File(['1'], 'f1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['2'], 'f2.jpg', { type: 'image/jpeg' });

    vi.mocked(axiosClient.post)
      .mockResolvedValueOnce({
        data: {
          public_id: 'img-1',
          secure_url: 'https://cdn.com/1.jpg',
          width: 800,
          height: 600,
        },
      })
      .mockResolvedValueOnce({
        data: {
          public_id: 'img-2',
          secure_url: 'https://cdn.com/2.jpg',
          width: 800,
          height: 600,
        },
      });

    const results = await uploadMultipleImagesToCloudinary([file1, file2]);
    expect(results).toHaveLength(2);
    expect(results[0]?.publicId).toBe('img-1');
    expect(results[1]?.publicId).toBe('img-2');
  });
});
