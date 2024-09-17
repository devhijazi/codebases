/* eslint-disable no-nested-ternary */

import { z, ZodNumber, ZodOptional } from 'zod';

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
