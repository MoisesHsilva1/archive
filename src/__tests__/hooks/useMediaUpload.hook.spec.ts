import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaUpload } from '@/hooks/useMediaUpload';

describe('useMediaUpload hook', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn((file: File) => `blob:mock-${file.name}`),
      revokeObjectURL: vi.fn(),
    });
  });

  it('deve inicializar com capa e galeria vazias', () => {
    const { result } = renderHook(() => useMediaUpload());
    expect(result.current.coverMedia).toBeNull();
    expect(result.current.galleryMedia).toEqual([]);
  });

  it('deve definir imagem de capa e criar preview URL', () => {
    const { result } = renderHook(() => useMediaUpload());
    const file = new File(['content'], 'cover.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.setCoverImage(file, 'Minha Capa');
    });

    expect(result.current.coverMedia).not.toBeNull();
    expect(result.current.coverMedia?.file).toBe(file);
    expect(result.current.coverMedia?.previewUrl).toBe('blob:mock-cover.jpg');
    expect(result.current.coverMedia?.alt).toBe('Minha Capa');
  });

  it('deve remover imagem de capa e revogar URL', () => {
    const { result } = renderHook(() => useMediaUpload());
    const file = new File(['content'], 'cover.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.setCoverImage(file);
    });
    expect(result.current.coverMedia).not.toBeNull();

    act(() => {
      result.current.removeCoverImage();
    });
    expect(result.current.coverMedia).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-cover.jpg');
  });

  it('deve adicionar e remover imagens da galeria', () => {
    const { result } = renderHook(() => useMediaUpload());
    const file1 = new File(['1'], 'g1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['2'], 'g2.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.addGalleryImage(file1, 'Galeria 1');
      result.current.addGalleryImage(file2, 'Galeria 2');
    });

    expect(result.current.galleryMedia).toHaveLength(2);

    const firstId = result.current.galleryMedia[0]!.id;
    act(() => {
      result.current.removeGalleryImage(firstId);
    });

    expect(result.current.galleryMedia).toHaveLength(1);
    expect(result.current.galleryMedia[0]?.file.name).toBe('g2.jpg');
  });

  it('deve limpar todas as mídias com clearAllMedia', () => {
    const { result } = renderHook(() => useMediaUpload());
    const file = new File(['1'], 'cover.jpg', { type: 'image/jpeg' });
    const gfile = new File(['2'], 'gallery.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.setCoverImage(file);
      result.current.addGalleryImage(gfile);
    });

    expect(result.current.coverMedia).not.toBeNull();
    expect(result.current.galleryMedia).toHaveLength(1);

    act(() => {
      result.current.clearAllMedia();
    });

    expect(result.current.coverMedia).toBeNull();
    expect(result.current.galleryMedia).toHaveLength(0);
  });
});
