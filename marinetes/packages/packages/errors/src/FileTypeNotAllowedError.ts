import { ErrorBase } from './ErrorBase';

export class FileTypeNotAllowedError extends ErrorBase {
  get message(): string {
    return 'Unsupported file type.';
  }

  get code(): string {
    return 'FileTypeNotAllowedError';
  }

  get status(): number {
    return 400;
  }
}
