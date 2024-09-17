import { ErrorBase } from './ErrorBase';

export class DiaristIsAlreadyInOneServiceError extends ErrorBase {
  get message(): string {
    return 'Diarist is already in one service.';
  }

  get code(): string {
    return 'DiaristIsAlreadyInOneServiceError';
  }

  get status(): number {
    return 400;
  }
}
