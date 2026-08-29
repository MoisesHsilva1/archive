import { z } from 'zod';
import { trimmedString, slugSchema } from '@/schemas/utils/field-builders';
import { Category } from '@/enums/category.enum';

export const itemMediaSchema = z.object({
  publicId: z.string().min(1, 'O identificador da imagem é obrigatório'),
  url: z.string().url('URL inválida da imagem'),
  alt: z.string().default('Imagem do acervo'),
  aspectRatio: z.string().default('16:9'),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const createItemSchema = z.object({
  title: trimmedString(2, 120, 'O título deve ter entre 2 e 120 caracteres'),
  slug: slugSchema(),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: 'Selecione uma categoria válida' }),
  }),
  content: trimmedString(1, 5000, 'O conteúdo ou relato é obrigatório'),
  excerpt: trimmedString(0, 300, 'O resumo deve ter no máximo 300 caracteres').optional(),
  location: trimmedString(0, 100, 'A localização deve ter no máximo 100 caracteres').optional(),
  rating: z.number().min(0, 'A nota mínima é 0').max(10, 'A nota máxima é 10').optional(),
  coverImage: itemMediaSchema,
  gallery: z.array(itemMediaSchema).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type CreateItemFormValues = z.infer<typeof createItemSchema>;
