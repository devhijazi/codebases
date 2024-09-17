/* eslint-disable no-nested-ternary */
import { z, ZodNumber, ZodOptional, ZodBoolean } from 'zod';

export function number<schema extends ZodNumber | ZodOptional<ZodNumber>>(
  schema: schema,
): z.ZodEffects<z.ZodTypeAny, any, unknown> {
  return z.preprocess(
    value =>
      typeof value === 'string'
        ? parseInt(value, 10)
        : typeof value === 'number'
        ? value
        : undefined,
    schema,
  );
}

export function boolean<schema extends ZodBoolean | ZodOptional<ZodBoolean>>(
  schema: schema,
): z.ZodEffects<z.ZodTypeAny, any, unknown> {
  return z.preprocess(
    value =>
      typeof value === 'string'
        ? value === 'true'
        : typeof value === 'boolean'
        ? value
        : undefined,
    schema,
  );
}
