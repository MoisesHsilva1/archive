import { z } from 'zod';
import { trimmedString } from '@/schemas/utils/field-builders';
import { Category } from '@/enums/category.enum';

export const itemMediaSchema = z.object({
  publicId: z.string().min(1, 'O identificador da imagem é obrigatório'),
  url: z.string().url('URL inválida da imagem'),
  alt: z.string().default('Imagem do acervo'),
  aspectRatio: z.string().default('16:9'),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const createItemSchema = z
  .object({
    title: z.string().trim().max(120, 'O título deve ter no máximo 120 caracteres').default(''),
    slug: z.string().trim().default(''),
    category: z.nativeEnum(Category, {
      errorMap: () => ({ message: 'Selecione uma categoria válida' }),
    }),
    content: z.string().trim().max(5000, 'O conteúdo deve ter no máximo 5000 caracteres').default(''),
    excerpt: trimmedString(0, 300, 'O resumo deve ter no máximo 300 caracteres').optional(),
    location: trimmedString(0, 100, 'A localização deve ter no máximo 100 caracteres').optional(),
    rating: z.number().min(0, 'A nota mínima é 0').max(10, 'A nota máxima é 10').optional(),
    coverImage: itemMediaSchema,
    gallery: z.array(itemMediaSchema).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.category === Category.PLACES) {
      if (!data.title || data.title.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O título deve ter entre 2 e 120 caracteres',
          path: ['title'],
        });
      }
      if (!data.content || data.content.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O conteúdo ou relato é obrigatório',
          path: ['content'],
        });
      }
    }
  });

export type CreateItemFormValues = z.infer<typeof createItemSchema>;
