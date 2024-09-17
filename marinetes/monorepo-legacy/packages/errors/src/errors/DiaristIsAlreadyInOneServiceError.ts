import { ErrorBase } from '../common/ErrorBase';

export class DiaristIsAlreadyInOneServiceError extends ErrorBase {
  get code(): string {
    return 'DiaristIsAlreadyInOneServiceError';
  }

  get status(): number {
    return 400;
  }
}
