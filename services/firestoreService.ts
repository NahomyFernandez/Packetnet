// services/firestoreService.ts
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile } from '../types';
import type { User } from 'firebase/auth';

/**
 * Crea un nuevo perfil de usuario en Firestore después del registro.
 * @param user El objeto de usuario de Firebase Auth.
 * @param name (Opcional) El nombre inicial para el perfil.
 */
export const createUserProfile = async (user: User, name: string = 'Nuevo Usuario'): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  const newUserProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    name: name,
  };
  await setDoc(userRef, newUserProfile);
};

/**
 * Obtiene el perfil de un usuario desde Firestore.
 * @param uid El ID del usuario.
 * @returns El perfil del usuario o null si no existe.
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

/**
 * Actualiza el perfil de un usuario en Firestore.
 * @param uid El ID del usuario.
 * @param data Los datos parciales a actualizar.
 */
export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};