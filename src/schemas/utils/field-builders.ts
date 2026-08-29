import { z } from 'zod';

export const trimmedString = (min = 1, max = 255, message?: string) =>
  z
    .string()
    .trim()
    .min(min, { message: message ?? `Deve ter pelo menos ${min} caracteres` })
    .max(max, { message: message ?? `Deve ter no máximo ${max} caracteres` });

export const slugSchema = () =>
  z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'O slug deve conter apenas letras minúsculas, números e hífens',
    });

export const positiveNumber = (message?: string) =>
  z.number().positive({ message: message ?? 'O valor deve ser um número positivo' });

export const numberRange = (min: number, max: number, message?: string) =>
  z
    .number()
    .min(min, { message: message ?? `O valor deve ser no mínimo ${min}` })
    .max(max, { message: message ?? `O valor deve ser no máximo ${max}` });

export const generateSlug = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};
