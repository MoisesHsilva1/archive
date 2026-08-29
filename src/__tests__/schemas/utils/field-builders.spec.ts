import { describe, it, expect } from 'vitest';
import {
  trimmedString,
  slugSchema,
  positiveNumber,
  numberRange,
  generateSlug,
} from '@/schemas/utils/field-builders';

describe('field-builders utils', () => {
  it('deve validar trimmedString com sucesso para strings dentro do tamanho permitido', () => {
    const schema = trimmedString(3, 10);
    const result = schema.safeParse('  olá mundo  ');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('olá mundo');
    }
  });

  it('deve falhar trimmedString para strings menores que o mínimo', () => {
    const schema = trimmedString(5, 10, 'Tamanho insuficiente');
    const result = schema.safeParse(' oi ');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Tamanho insuficiente');
    }
  });

  it('deve validar slugSchema apenas para formatos válidos em kebab-case', () => {
    const schema = slugSchema();
    expect(schema.safeParse('cafe-do-centro').success).toBe(true);
    expect(schema.safeParse('sp-2026').success).toBe(true);
    expect(schema.safeParse('Café do Centro').success).toBe(false);
    expect(schema.safeParse('cafe_centro').success).toBe(false);
    expect(schema.safeParse('-cafe-').success).toBe(false);
  });

  it('deve validar positiveNumber para valores positivos e rejeitar zero ou negativos', () => {
    const schema = positiveNumber();
    expect(schema.safeParse(10).success).toBe(true);
    expect(schema.safeParse(0.5).success).toBe(true);
    expect(schema.safeParse(0).success).toBe(false);
    expect(schema.safeParse(-5).success).toBe(false);
  });

  it('deve validar numberRange para limites mínimo e máximo', () => {
    const schema = numberRange(0, 10);
    expect(schema.safeParse(0).success).toBe(true);
    expect(schema.safeParse(8.5).success).toBe(true);
    expect(schema.safeParse(10).success).toBe(true);
    expect(schema.safeParse(-1).success).toBe(false);
    expect(schema.safeParse(11).success).toBe(false);
  });

  it('deve converter títulos em slugs válidos com generateSlug', () => {
    expect(generateSlug('Café & Livraria São Paulo')).toBe('cafe-livraria-sao-paulo');
    expect(generateSlug('Experiência 10/10 no Parque!')).toBe('experiencia-1010-no-parque');
    expect(generateSlug('  Espaço   Cultural  ')).toBe('espaco-cultural');
  });
});
