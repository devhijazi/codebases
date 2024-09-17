import { BaseTokenHelper } from './BaseTokenHelper';

interface DecodedData {
  sub: string;
}

export class UserSessionTokenHelper extends BaseTokenHelper {
  protected static get token(): string {
    return process.env.USER_JWT_TOKEN;
  }

  public static decode(token: string): DecodedData {
    return super.decode(token);
  }
}
