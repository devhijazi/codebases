import { object, string, number } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristAddressUpdateValidation = buildValidation(
  object({
    city: string().nonempty().trim(),
    street: string().nonempty().trim(),
    number: number().nonnegative().min(0),
    zip_code: string()
      .nonempty()
      .trim()
      .regex(/^[0-9]{8}$/),
    neighborhood: string().trim().nonempty(),
    state: string().trim().nonempty(),
  }),
);
