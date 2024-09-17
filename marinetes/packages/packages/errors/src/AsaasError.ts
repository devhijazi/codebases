import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class AsaasError extends ErrorBase {
  readonly #errors?: any[];

  constructor(errors?: any[]) {
    super();

    this.#errors = errors;
  }

  get message(): string {
    return 'There was an error making the request to Asaas.';
  }

  get code(): string {
    return 'AsaasError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }

  getData(): Record<string, any> {
    return {
      errors: this.#errors,
    };
  }
}
