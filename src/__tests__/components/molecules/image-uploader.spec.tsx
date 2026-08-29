import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUploader } from '@/components/molecules/image-uploader';

describe('ImageUploader component', () => {
  it('deve renderizar área de upload quando não houver imagem de capa selecionada', () => {
    render(
      <ImageUploader
        label="Fotografia de Capa"
        onSelectCover={vi.fn()}
      />
    );

    expect(screen.getByText(/Fotografia de Capa/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Selecione ou arraste a imagem de capa/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar preview quando houver capa selecionada', () => {
    const coverMedia = {
      id: 'cover-1',
      file: new File([''], 'cover.jpg', { type: 'image/jpeg' }),
      previewUrl: 'https://archive.io/cover.jpg',
      alt: 'Capa do Lugar',
    };

    render(
      <ImageUploader
        label="Fotografia de Capa"
        coverMedia={coverMedia}
        onSelectCover={vi.fn()}
        onRemoveCover={vi.fn()}
      />
    );

    expect(screen.getByAltText(/Capa do Lugar/i)).toBeInTheDocument();
    expect(screen.getByText(/Capa Principal/i)).toBeInTheDocument();
  });

  it('deve disparar onSelectCover ao escolher arquivo pelo input', async () => {
    const user = userEvent.setup();
    const handleSelectCover = vi.fn();

    render(
      <ImageUploader
        label="Fotografia de Capa"
        onSelectCover={handleSelectCover}
      />
    );

    const input = screen.getByLabelText(/Selecionar imagem de capa/i);
    const file = new File(['content'], 'test.png', { type: 'image/png' });

    await user.upload(input, file);
    expect(handleSelectCover).toHaveBeenCalledWith(file);
  });
});
