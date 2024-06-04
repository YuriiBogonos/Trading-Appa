import { PasswordStrength } from '@/types/enums.ts';

class PasswordComplexityService {
  static validatePassword(password: string) {
    const errors = {
      length: '',
      uppercase: '',
      lowercase: '',
      number: '',
      specialChar: '',
    };

    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must contain at least one number.';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.specialChar = 'Password must contain at least one special character.';
    }

    return errors;
  }

  static calculatePasswordStrength(password: string): number {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return Math.min(score, 3);
  }

  static getStrengthLabel(strength: number): string {
    switch (strength) {
      case 0:
      case 1:
        return PasswordStrength.WEAK;
      case 2:
        return PasswordStrength.FAIR;
      case 3:
        return PasswordStrength.GOOD;
      default:
        return '';
    }
  }
}

export default PasswordComplexityService;
