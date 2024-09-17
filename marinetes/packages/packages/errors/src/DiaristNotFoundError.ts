import { ErrorBase } from './ErrorBase';

export class DiaristNotFoundError extends ErrorBase {
  get message(): string {
    return 'Diarist not found.';
  }

  get code(): string {
    return 'DiaristNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
