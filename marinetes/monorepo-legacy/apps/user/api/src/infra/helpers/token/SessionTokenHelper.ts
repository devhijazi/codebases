import { BaseTokenHelper } from './BaseTokenHelper';

interface DecodedData {
  sub: string;
}

export class SessionTokenHelper extends BaseTokenHelper {
  protected static get token(): string {
    return process.env.JWT_TOKEN;
  }

  public static decode(token: string): DecodedData {
    return super.decode(token);
  }

  public static create(id: string): string {
    return super._create({}, { subject: id, expiresIn: '1d' });
  }

  public static createRefreshToken(): string {
    return super._create({}, { expiresIn: '1d' });
  }
}
