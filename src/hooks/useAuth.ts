import { useState, useEffect, useCallback } from 'react';
import { AuthUser, AuthState } from '@/types/domain/auth.types';
import { AuthCredentialsFormValues } from '@/schemas/auth.schema';
import {
  subscribeToAuthState,
  signInWithEmail,
  signOutUser,
  getCurrentUser,
} from '@/services/auth.service';

export interface UseAuthReturn extends AuthState {
  login: (credentials: AuthCredentialsFormValues) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(
    async (credentials: AuthCredentialsFormValues): Promise<AuthUser> => {
      setIsLoading(true);
      setError(null);
      try {
        const loggedUser = await signInWithEmail(
          credentials.email,
          credentials.password
        );
        setUser(loggedUser);
        setIsLoading(false);
        return loggedUser;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Credenciais inválidas ou erro na autenticação';
        setError(errorMessage);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await signOutUser();
      setUser(null);
      setIsLoading(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Falha ao encerrar a sessão';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    login,
    logout,
  };
};
