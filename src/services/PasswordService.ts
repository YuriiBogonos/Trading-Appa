import bcrypt from 'bcryptjs';

class PasswordService {
  private static instance: PasswordService;
  private saltRounds = 10;
  private secretKey = 'mysecretkey';

  private constructor() {}

  static getInstance(): PasswordService {
    if (!PasswordService.instance) {
      PasswordService.instance = new PasswordService();
    }
    return PasswordService.instance;
  }

  async hashPassword(password: string): Promise<string> {
    const saltedPassword = password + this.secretKey;
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(saltedPassword, salt);
    return `${salt}:${hash}`;
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [salt, hash] = storedHash.split(':');
    const saltedPassword = password + this.secretKey;
    const hashToVerify = await bcrypt.hash(saltedPassword, salt);
    return hash === hashToVerify;
  }
}

export default PasswordService;
