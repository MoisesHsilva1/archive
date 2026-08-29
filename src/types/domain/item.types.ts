import { Category } from '@/enums/category.enum';

export interface ItemMedia {
  readonly publicId: string;
  readonly url: string;
  readonly alt: string;
  readonly aspectRatio?: string;
  readonly width?: number;
  readonly height?: number;
}

export interface ItemDocument {
  readonly id?: string;
  readonly title: string;
  readonly slug: string;
  readonly category: Category;
  readonly content: string;
  readonly excerpt?: string;
  readonly location?: string;
  readonly rating?: number;
  readonly coverImage: ItemMedia;
  readonly gallery?: readonly ItemMedia[];
  readonly tags: readonly string[];
  readonly featured: boolean;
  readonly authorId: string;
  readonly authorName: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type ItemCreatePayload = Omit<ItemDocument, 'id' | 'createdAt' | 'updatedAt'>;
