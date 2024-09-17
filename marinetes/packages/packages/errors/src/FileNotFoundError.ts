import { ErrorBase } from './ErrorBase';

export class FileNotFoundError extends ErrorBase {
  get message(): string {
    return 'File does not exists.';
  }

  get code(): string {
    return 'FileNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
