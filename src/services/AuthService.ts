import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Database, equalTo, get, orderByChild, query, ref, set, update } from 'firebase/database';

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
      isVerified: false,
    });
    await sendEmailVerification(user);
    return userCredential;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    const userRef = ref(this.db, `users/${user.uid}`);
    const snapshot = await get(query(userRef, orderByChild('isVerified'), equalTo(true)));

    if (snapshot.exists() && !snapshot.val().isVerified) {
      throw new Error('Email not verified');
    }

    return userCredential;
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  async verifyUser(uid: string): Promise<void> {
    const userRef = ref(this.db, `users/${uid}`);
    await update(userRef, { isVerified: true });
  }

  async getUserByEmail(email: string): Promise<any> {
    const userRef = query(ref(this.db, 'users'), orderByChild('email'), equalTo(email));
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  }

  async confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
    try {
      await firebaseConfirmPasswordReset(this.auth, oobCode, newPassword);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to reset password: ${error.message}`);
      } else {
        throw new Error('Failed to reset password due to an unknown error.');
      }
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await firebaseSendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to send password reset email: ${error.message}`);
      } else {
        throw new Error('Failed to send password reset email due to an unknown error.');
      }
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const userRef = query(ref(this.db, 'users'), orderByChild('email'), equalTo(email));
    const snapshot = await get(userRef);
    return snapshot.exists();
  }
}
