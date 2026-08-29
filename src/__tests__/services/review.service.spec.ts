import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import {
  publishItemToFirestore,
  fetchItemsFromFirestore,
  fetchItemBySlug,
  mapDocToItem,
} from '@/services/review.service';
import { Category } from '@/enums/category.enum';
import { AuthUser } from '@/types/domain/auth.types';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getFirestore: vi.fn(),
}));

vi.mock('@/services/firebase.service', () => ({
  db: {},
  app: {},
  auth: {},
}));

describe('review.service', () => {
  const mockAuthor: AuthUser = {
    uid: 'owner-id',
    email: 'owner@archive.io',
    displayName: 'Moisés',
    photoURL: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve publicar item no Firestore com timestamps e dados do autor', async () => {
    const mockPayload = {
      title: 'Café do Bairro',
      slug: 'cafe-do-bairro',
      category: Category.PLACES,
      content: 'Excelente ambiente.',
      excerpt: 'Resumo.',
      location: 'São Paulo',
      rating: 9,
      coverImage: {
        publicId: 'cover-1',
        url: 'https://cdn.com/cover.jpg',
        alt: 'Fachada',
      },
      gallery: [],
      tags: ['cafe'],
      featured: false,
      authorId: 'owner-id',
      authorName: 'Moisés',
    };

    vi.mocked(firestore.addDoc).mockResolvedValueOnce({
      id: 'generated-doc-id',
    } as unknown as firestore.DocumentReference);

    const result = await publishItemToFirestore(mockPayload, mockAuthor);

    expect(firestore.addDoc).toHaveBeenCalledTimes(1);
    expect(result.id).toBe('generated-doc-id');
    expect(result.title).toBe('Café do Bairro');
    expect(result.authorId).toBe('owner-id');
    expect(result.createdAt).toBeDefined();
  });

  it('deve converter documento do Firestore para ItemDocument com mapDocToItem', () => {
    const mockDoc = {
      id: 'doc-123',
      data: () => ({
        title: 'Lugar Bacana',
        slug: 'lugar-bacana',
        category: Category.PLACES,
        content: 'Review completa.',
        coverImage: { publicId: '1', url: 'https://cdn.com/1.jpg', alt: 'Capa' },
        authorId: 'owner-1',
        authorName: 'Moisés',
        createdAt: '2026-08-29T12:00:00Z',
        updatedAt: '2026-08-29T12:00:00Z',
      }),
    } as unknown as firestore.QueryDocumentSnapshot;

    const item = mapDocToItem(mockDoc);
    expect(item.id).toBe('doc-123');
    expect(item.title).toBe('Lugar Bacana');
    expect(item.gallery).toEqual([]);
    expect(item.tags).toEqual([]);
  });

  it('deve buscar lista de itens ordenados com fetchItemsFromFirestore', async () => {
    const mockDocs = [
      {
        id: 'doc-1',
        data: () => ({
          title: 'Item 1',
          slug: 'item-1',
          category: Category.PLACES,
          content: 'C1',
          coverImage: { publicId: '1', url: 'https://cdn.com/1.jpg', alt: '1' },
          authorId: 'owner-1',
          authorName: 'Moisés',
          createdAt: '2026-08-29T12:00:00Z',
          updatedAt: '2026-08-29T12:00:00Z',
        }),
      },
    ] as unknown as firestore.QueryDocumentSnapshot[];

    vi.mocked(firestore.getDocs).mockResolvedValueOnce({
      docs: mockDocs,
    } as unknown as firestore.QuerySnapshot);

    const items = await fetchItemsFromFirestore(10);
    expect(items).toHaveLength(1);
    expect(items[0]?.title).toBe('Item 1');
  });

  it('deve buscar item único por slug com fetchItemBySlug', async () => {
    const mockDoc = {
      id: 'doc-single',
      data: () => ({
        title: 'Single Item',
        slug: 'single-item',
        category: Category.PLACES,
        content: 'Conteudo',
        coverImage: { publicId: '1', url: 'https://cdn.com/1.jpg', alt: '1' },
        authorId: 'owner-1',
        authorName: 'Moisés',
        createdAt: '2026-08-29T12:00:00Z',
        updatedAt: '2026-08-29T12:00:00Z',
      }),
    } as unknown as firestore.QueryDocumentSnapshot;

    vi.mocked(firestore.getDocs).mockResolvedValueOnce({
      docs: [mockDoc],
    } as unknown as firestore.QuerySnapshot);

    const item = await fetchItemBySlug('single-item');
    expect(item).not.toBeNull();
    expect(item?.slug).toBe('single-item');
  });
});
