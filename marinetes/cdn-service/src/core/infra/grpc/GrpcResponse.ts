import { ErrorBase } from '@hitechline/marinetes-errors';

export function getError(error: ErrorBase): string {
  const { message, code, status } = error;

  const errorInString = JSON.stringify({
    message,
    code,
    status,
  });

  return errorInString;
}
