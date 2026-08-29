import { describe, it, expect } from 'vitest';
import { authCredentialsSchema } from '@/schemas/auth.schema';

describe('authCredentialsSchema validation', () => {
  it('deve validar credenciais com email válido e senha de pelo menos 6 caracteres', () => {
    const result = authCredentialsSchema.safeParse({
      email: 'owner@archive.io',
      password: 'secretpassword123',
    });
    expect(result.success).toBe(true);
  });

  it('deve falhar para emails em formato inválido', () => {
    const result = authCredentialsSchema.safeParse({
      email: 'invalid-email',
      password: 'secretpassword123',
    });
    expect(result.success).toBe(false);
  });

  it('deve falhar para senhas com menos de 6 caracteres', () => {
    const result = authCredentialsSchema.safeParse({
      email: 'owner@archive.io',
      password: '123',
    });
    expect(result.success).toBe(false);
  });
});
