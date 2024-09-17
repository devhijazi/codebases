import { BaseTokenHelper } from './BaseTokenHelper';

interface DecodedData {
  sub: string;
}

export class DiaristSessionTokenHelper extends BaseTokenHelper {
  protected static get token(): string {
    return process.env.DIARIST_JWT_TOKEN;
  }

  public static decode(token: string): DecodedData {
    return super.decode(token);
  }
}
