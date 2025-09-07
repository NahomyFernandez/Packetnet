import { db } from "./firebase";
import {
  doc, getDoc, setDoc, updateDoc, onSnapshot,
  serverTimestamp, Timestamp,
  FieldValue, WithFieldValue, UpdateData
} from "firebase/firestore";
import type { User } from "firebase/auth";

export type UserProfile = {
  uid: string;
  email: string | null;
  name?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  phone?: string | null;
  address?: {
    line1?: string; line2?: string; city?: string; state?: string;
    postalCode?: string; country?: string;
  };
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
};

export async function createUserProfile(user: User): Promise<void> {
  if (!user?.uid) return;
  const ref = doc(db, "users", user.uid);
  const friendlyName = user.displayName ?? null;

  const data: WithFieldValue<UserProfile> = {
    uid: user.uid,
    email: user.email ?? null,
    name: friendlyName,
    displayName: friendlyName,
    photoURL: user.photoURL ?? null,
    phone: (user as any).phoneNumber ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, data, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as UserProfile;
  if (data.name && !data.displayName) data.displayName = data.name;
  if (data.displayName && !data.name) data.name = data.displayName;
  return data;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const ref = doc(db, "users", uid);

  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  } satisfies UpdateData<UserProfile>;

  if ((payload as any).name && !(payload as any).displayName) {
    (payload as any).displayName = (payload as any).name;
  }
  if ((payload as any).displayName && !(payload as any).name) {
    (payload as any).name = (payload as any).displayName;
  }

  await updateDoc(ref, payload);
}

export function onUserProfileSnapshot(
  uid: string,
  cb: (profile: UserProfile | null) => void
) {
  const ref = doc(db, "users", uid);
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) return cb(null);
    const data = snap.data() as UserProfile;
    if (data.name && !data.displayName) data.displayName = data.name;
    if (data.displayName && !data.name) data.name = data.displayName;
    cb(data);
  });
}
