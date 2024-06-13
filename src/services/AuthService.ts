import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Database, equalTo, get, orderByChild, query, ref, set, update } from 'firebase/database';

import { auth, database } from '../../firebase';
import PasswordService from './PasswordService';

interface User {
  email: string;
  nickname: string;
  isVerified: boolean;
  passwordResetCode: string | null;
  hashedPassword: string;
}

export class AuthService {
  private static instance: AuthService;
  private passwordService = PasswordService.getInstance();

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
    const hashedPassword = await this.passwordService.hashPassword(password);
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: nickname });
    await set(ref(this.db, `users/${user.uid}`), {
      email,
      nickname,
      isVerified: false,
      passwordResetCode: null,
      hashedPassword,
    });
    await sendEmailVerification(user);
    return userCredential;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ email: string; nickname: string; uid: string }> {
    const userRef = query(ref(this.db, 'users'), orderByChild('email'), equalTo(email));
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error('User not found');
    }

    const userData = snapshot.val() as Record<string, User>;
    const userId = Object.keys(userData)[0];
    const user = userData[userId];

    // Verify the password using the updated PasswordService
    const isPasswordValid = await this.passwordService.verifyPassword(
      password,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    if (!user.isVerified) {
      throw new Error('Email not verified');
    }

    return { email: user.email, nickname: user.nickname, uid: userId };
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  async verifyUser(uid: string): Promise<void> {
    const userRef = ref(this.db, `users/${uid}`);
    await update(userRef, { isVerified: true });
  }

  async getUserByEmail(email: string): Promise<Record<string, User> | null> {
    const userRef = query(ref(this.db, 'users'), orderByChild('email'), equalTo(email));
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val() as Record<string, User>;
    }
    return null;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const userId = Object.keys(user)[0];
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      await this.updatePasswordResetCode(userId, resetCode);

      const response = await fetch(
        'http://127.0.0.1:5001/traiding-app/us-central1/sendVerificationCode',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code: resetCode }),
        }
      );

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to send password reset email');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to send password reset email: ${error.message}`);
      } else {
        throw new Error('Failed to send password reset email due to an unknown error.');
      }
    }
  }
  async verifyResetCode(email: string, resetCode: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const userId = Object.keys(user)[0];
    const storedResetCode = user[userId].passwordResetCode;

    if (storedResetCode !== resetCode) {
      throw new Error('Invalid reset code');
    }
  }

  async updatePasswordResetCode(uid: string, code: string | null): Promise<void> {
    const userRef = ref(this.db, `users/${uid}`);
    await update(userRef, { passwordResetCode: code });
  }

  async emailExists(email: string): Promise<boolean> {
    const userRef = query(ref(this.db, 'users'), orderByChild('email'), equalTo(email));
    const snapshot = await get(userRef);
    return snapshot.exists();
  }

  async verifyResetCodeAndResetPassword(
    email: string,
    resetCode: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const userId = Object.keys(user)[0];
    const storedResetCode = user[userId].passwordResetCode;

    if (storedResetCode !== resetCode) {
      throw new Error('Invalid reset code');
    }

    await this.updatePassword(userId, newPassword);
    await this.updatePasswordResetCode(userId, null);
  }

  async updatePassword(uid: string, newPassword: string): Promise<void> {
    const hashedPassword = await this.passwordService.hashPassword(newPassword);
    const userRef = ref(this.db, `users/${uid}`);
    await update(userRef, { hashedPassword });
  }
}
