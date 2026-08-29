import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import * as authService from '@/services/auth.service';
import { AuthUser } from '@/types/domain/auth.types';

vi.mock('@/services/auth.service', () => ({
  subscribeToAuthState: vi.fn(),
  signInWithEmail: vi.fn(),
  signOutUser: vi.fn(),
  getCurrentUser: vi.fn(() => null),
}));

describe('useAuth hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar com estado de carregamento e escutar mudanças de autenticação', () => {
    let authCallback: ((user: AuthUser | null) => void) | null = null;
    vi.mocked(authService.subscribeToAuthState).mockImplementationOnce((cb) => {
      authCallback = cb;
      return () => {};
    });

    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);

    act(() => {
      authCallback?.({
        uid: 'owner-1',
        email: 'owner@archive.io',
        displayName: 'Moisés',
        photoURL: null,
      });
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe('owner@archive.io');
  });

  it('deve lidar com login com sucesso', async () => {
    const mockUser: AuthUser = {
      uid: 'owner-1',
      email: 'owner@archive.io',
      displayName: 'Moisés',
      photoURL: null,
    };
    vi.mocked(authService.subscribeToAuthState).mockReturnValue(() => {});
    vi.mocked(authService.signInWithEmail).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'owner@archive.io',
        password: 'password123',
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('deve capturar erro em caso de falha no login', async () => {
    vi.mocked(authService.subscribeToAuthState).mockReturnValue(() => {});
    vi.mocked(authService.signInWithEmail).mockRejectedValueOnce(
      new Error('Senha incorreta')
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login({
          email: 'owner@archive.io',
          password: 'wrongpassword',
        });
      } catch {
        // expected error
      }
    });

    expect(result.current.error).toBe('Senha incorreta');
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('deve lidar com logout com sucesso', async () => {
    vi.mocked(authService.subscribeToAuthState).mockReturnValue(() => {});
    vi.mocked(authService.signOutUser).mockResolvedValueOnce();

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
