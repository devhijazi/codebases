import { ErrorBase } from './ErrorBase';

export class ValidationError extends ErrorBase {
  readonly #errors: any[];

  constructor(errors: any[]) {
    super();

    this.#errors = errors;
  }

  get message(): string {
    return 'Fields in need of attention.';
  }

  get code(): string {
    return 'ValidationError';
  }

  get status(): number {
    return 400;
  }

  getData(): Record<string, any> {
    return {
      errors: this.#errors,
    };
  }
}
