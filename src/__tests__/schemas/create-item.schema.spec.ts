import { describe, it, expect } from 'vitest';
import { createItemSchema } from '@/schemas/create-item.schema';
import { Category } from '@/enums/category.enum';

describe('createItemSchema validation', () => {
  const validData = {
    title: 'Café do Centro',
    slug: 'cafe-do-centro',
    category: Category.PLACES,
    content: 'Um lugar aconchegante para ler e tomar café especial.',
    excerpt: 'Cafeteria especial no centro.',
    location: 'São Paulo, SP',
    rating: 9,
    coverImage: {
      publicId: 'archive/places/cafe-01',
      url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      alt: 'Fachada do café',
      aspectRatio: '16:9',
    },
    gallery: [
      {
        publicId: 'archive/places/cafe-02',
        url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        alt: 'Xícara de espresso',
        aspectRatio: '4:3',
      },
    ],
    tags: ['café', 'leitura', 'sp'],
    featured: true,
  };

  it('deve validar com sucesso um payload completo e válido', () => {
    const result = createItemSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('deve falhar se o título for menor que 2 caracteres', () => {
    const result = createItemSchema.safeParse({ ...validData, title: 'A' });
    expect(result.success).toBe(false);
  });

  it('deve falhar se a categoria for inválida', () => {
    const result = createItemSchema.safeParse({ ...validData, category: 'invalida' });
    expect(result.success).toBe(false);
  });

  it('deve falhar se a imagem de capa não possuir publicId ou url válida', () => {
    const result = createItemSchema.safeParse({
      ...validData,
      coverImage: { publicId: '', url: 'url-invalida' },
    });
    expect(result.success).toBe(false);
  });

  it('deve aceitar campos opcionais ausentes como gallery, excerpt, location e rating', () => {
    const minimalData = {
      title: 'Parque Ibirapuera',
      slug: 'parque-ibirapuera',
      category: Category.PLACES,
      content: 'Caminhada matinal sob o sol.',
      coverImage: {
        publicId: 'archive/places/parque-01',
        url: 'https://res.cloudinary.com/demo/image/upload/parque.jpg',
      },
    };

    const result = createItemSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.gallery).toEqual([]);
      expect(result.data.tags).toEqual([]);
      expect(result.data.featured).toBe(false);
    }
  });
});
