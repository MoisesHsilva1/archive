import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firebaseAuth from 'firebase/auth';
import {
  signInWithEmail,
  signOutUser,
  subscribeToAuthState,
  getCurrentUser,
  formatAuthUser,
} from '@/services/auth.service';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(() => ({ currentUser: null })),
}));

vi.mock('@/services/firebase.service', () => ({
  auth: { currentUser: null },
  app: {},
  db: {},
}));

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve formatar o usuário do Firebase Auth corretamente', () => {
    const mockFirebaseUser = {
      uid: 'user-123',
      email: 'owner@archive.io',
      displayName: 'Proprietário',
      photoURL: 'https://archive.io/avatar.jpg',
    } as firebaseAuth.User;

    const formatted = formatAuthUser(mockFirebaseUser);
    expect(formatted).toEqual({
      uid: 'user-123',
      email: 'owner@archive.io',
      displayName: 'Proprietário',
      photoURL: 'https://archive.io/avatar.jpg',
    });
  });

  it('deve retornar null ao formatar usuário nulo', () => {
    expect(formatAuthUser(null)).toBeNull();
  });

  it('deve retornar null ao obter usuário atual quando não logado', () => {
    expect(getCurrentUser()).toBeNull();
  });

  it('deve realizar login com email e senha com sucesso', async () => {
    const mockUser = {
      uid: 'user-123',
      email: 'owner@archive.io',
      displayName: 'Proprietário',
      photoURL: null,
    };

    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValueOnce({
      user: mockUser,
    } as unknown as firebaseAuth.UserCredential);

    const result = await signInWithEmail('owner@archive.io', 'password123');
    expect(result.uid).toBe('user-123');
    expect(result.email).toBe('owner@archive.io');
    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('deve deslogar o usuário com signOutUser', async () => {
    vi.mocked(firebaseAuth.signOut).mockResolvedValueOnce();
    await signOutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1);
  });

  it('deve registrar observer de autenticação com subscribeToAuthState', () => {
    const callback = vi.fn();
    const unsubscribeMock = vi.fn();
    vi.mocked(firebaseAuth.onAuthStateChanged).mockReturnValueOnce(unsubscribeMock);

    const unsubscribe = subscribeToAuthState(callback);
    expect(firebaseAuth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toBe(unsubscribeMock);
  });
});
