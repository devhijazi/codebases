import { TokenError } from '@marinetesio/errors';
import { sign, verify, decode, SignOptions } from 'jsonwebtoken';

export abstract class BaseTokenHelper {
  protected static get token(): string {
    throw new Error('Instance not implemented jwt token.');
  }

  public static verify(token: string): boolean {
    try {
      verify(token, this.token);
      return true;
    } catch {
      return false;
    }
  }

  public static decode(token: string): any {
    const isValid = this.verify(token);

    if (!isValid) {
      throw new TokenError();
    }

    return decode(token);
  }

  /**
   * "create()" is implemented by instance
   */
  public static _create(
    payload: string | Record<string, any> | Buffer,
    options?: SignOptions,
  ): string {
    return sign(payload, this.token, options);
  }
}
