export interface ErrorObject {
  [key: string]: any;

  message: string;
  code: string;
  status: number;
}

export abstract class ErrorBase {
  public abstract message: string;

  public abstract code: string;

  public abstract status: number;

  protected getData(): Record<string, any> {
    return {};
  }

  public toObject(): ErrorObject {
    return {
      ...this.getData(),
      message: this.message,
      code: this.code,
      status: this.status,
    };
  }
}
