import type { ErrorObject } from '../types';

export abstract class ErrorBase {
  public abstract code: string;

  public abstract status: number;

  protected getData(): Record<string, any> {
    return {};
  }

  public toObject(): ErrorObject {
    return {
      ...this.getData(),
      code: this.code,
      status: this.status,
    };
  }
}
