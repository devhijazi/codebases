import type { ValidationError } from 'yup';

export function parseInnerErrors(
  inner: ValidationError['inner'],
): Record<string, string> {
  return inner.reduce(
    (obj, field) =>
      Object.assign(obj, {
        [field.path as string]: field.message,
      }),
    {},
  );
}
