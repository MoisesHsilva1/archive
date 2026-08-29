import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from 'firebase/auth';
import { auth } from '@/services/firebase.service';
import { AuthUser } from '@/types/domain/auth.types';

export const formatAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const formattedUser = formatAuthUser(credential.user);
  if (!formattedUser) {
    throw new Error('Falha ao processar dados do usuário autenticado');
  }
  return formattedUser;
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const subscribeToAuthState = (
  callback: (user: AuthUser | null) => void
): Unsubscribe => {
  return onAuthStateChanged(auth, (user) => {
    callback(formatAuthUser(user));
  });
};

export const getCurrentUser = (): AuthUser | null => {
  return formatAuthUser(auth.currentUser);
};
