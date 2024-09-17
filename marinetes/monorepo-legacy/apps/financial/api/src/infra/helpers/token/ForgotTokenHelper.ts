import { BaseTokenHelper } from './BaseTokenHelper';

interface DecodedData {
  email: string;
}

export class ForgotTokenHelper extends BaseTokenHelper {
  protected static get token(): string {
    return process.env.JWT_RESET_TOKEN;
  }

  public static decode(token: string): DecodedData {
    return super.decode(token);
  }

  public static create(email: string): string {
    return super.create({ email }, { expiresIn: '1d' });
  }
}
