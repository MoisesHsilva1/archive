import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestoreStorage from 'firebase/storage';
import {
  uploadImageToStorage,
  uploadMultipleImagesToStorage,
  deleteImageFromStorage,
  sanitizeFileName,
} from '@/services/media.service';

vi.mock('firebase/storage', () => ({
  ref: vi.fn(() => ({})),
  uploadBytesResumable: vi.fn(),
  getDownloadURL: vi.fn(),
  deleteObject: vi.fn(),
  getStorage: vi.fn(() => ({})),
}));

vi.mock('@/services/firebase.service', () => ({
  storage: {},
  app: {},
  auth: {},
  db: {},
}));

describe('media.service (Firebase Storage)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve sanitizar nomes de arquivos com caracteres especiais', () => {
    expect(sanitizeFileName('Café & São Paulo (1).jpg')).toBe('cafe_sao_paulo_1_.jpg');
    expect(sanitizeFileName('FOTO 2026.PNG')).toBe('foto_2026.png');
  });

  it('deve realizar upload de imagem para o Firebase Storage e retornar ItemMedia', async () => {
    const mockFile = new File(['image-bytes'], 'fachada.jpg', { type: 'image/jpeg' });
    const mockSnapshot = {
      bytesTransferred: 100,
      totalBytes: 100,
      ref: {},
    };

    const mockUploadTask = {
      on: vi.fn((_event, progressCb, _errorCb, completeCb) => {
        if (progressCb) progressCb(mockSnapshot);
        if (completeCb) completeCb();
      }),
      snapshot: mockSnapshot,
    };

    vi.mocked(firestoreStorage.uploadBytesResumable).mockReturnValueOnce(
      mockUploadTask as unknown as firestoreStorage.UploadTask
    );
    vi.mocked(firestoreStorage.getDownloadURL).mockResolvedValueOnce(
      'https://firebasestorage.googleapis.com/v0/b/archive/o/fachada.jpg?alt=media'
    );

    const onProgress = vi.fn();
    const result = await uploadImageToStorage(mockFile, {
      alt: 'Fachada Principal',
      folder: 'items/places',
      onProgress,
    });

    expect(firestoreStorage.ref).toHaveBeenCalled();
    expect(firestoreStorage.uploadBytesResumable).toHaveBeenCalledTimes(1);
    expect(result.url).toBe(
      'https://firebasestorage.googleapis.com/v0/b/archive/o/fachada.jpg?alt=media'
    );
    expect(result.alt).toBe('Fachada Principal');
    expect(result.aspectRatio).toBe('16:9');
  });

  it('deve lidar com erro durante o upload no Firebase Storage', async () => {
    const mockFile = new File(['image-bytes'], 'fachada.jpg', { type: 'image/jpeg' });

    const mockUploadTask = {
      on: vi.fn((_event, _progressCb, errorCb) => {
        if (errorCb) errorCb(new Error('Permissão negada pelo Storage Rules'));
      }),
    };

    vi.mocked(firestoreStorage.uploadBytesResumable).mockReturnValueOnce(
      mockUploadTask as unknown as firestoreStorage.UploadTask
    );

    await expect(uploadImageToStorage(mockFile)).rejects.toThrow(
      'Firebase Storage: Permissão negada pelo Storage Rules'
    );
  });

  it('deve realizar upload de múltiplos arquivos para o Storage', async () => {
    const file1 = new File(['1'], 'f1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['2'], 'f2.jpg', { type: 'image/jpeg' });

    const createMockTask = () => ({
      on: vi.fn((_event, _progressCb, _errorCb, completeCb) => {
        if (completeCb) completeCb();
      }),
      snapshot: { ref: {} },
    });

    vi.mocked(firestoreStorage.uploadBytesResumable)
      .mockReturnValueOnce(createMockTask() as unknown as firestoreStorage.UploadTask)
      .mockReturnValueOnce(createMockTask() as unknown as firestoreStorage.UploadTask);

    vi.mocked(firestoreStorage.getDownloadURL)
      .mockResolvedValueOnce('https://storage.com/f1.jpg')
      .mockResolvedValueOnce('https://storage.com/f2.jpg');

    const results = await uploadMultipleImagesToStorage([file1, file2], {
      folder: 'items/places/gallery',
    });

    expect(results).toHaveLength(2);
    expect(results[0]?.url).toBe('https://storage.com/f1.jpg');
    expect(results[1]?.url).toBe('https://storage.com/f2.jpg');
  });

  it('deve excluir imagem com deleteImageFromStorage', async () => {
    vi.mocked(firestoreStorage.deleteObject).mockResolvedValueOnce();

    await deleteImageFromStorage('items/places/sample.jpg');
    expect(firestoreStorage.deleteObject).toHaveBeenCalledTimes(1);
  });
});
