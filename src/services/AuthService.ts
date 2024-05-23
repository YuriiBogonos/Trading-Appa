// src/services/AuthService.ts
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Database, ref, set } from 'firebase/database';

import { auth, database } from '../../firebase.ts';

export class AuthService {
  private static instance: AuthService;

  private constructor(
    private auth: Auth,
    private db: Database
  ) {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(auth, database);
    }
    return AuthService.instance;
  }

  async signUp(email: string, password: string, nickname: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: nickname });
    await set(ref(this.db, `users/${user.uid}`), {
      email,
      nickname,
    });
    return userCredential;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }
}
