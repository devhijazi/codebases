import { boolean, object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const SessionLoginValidation = buildValidation(
  object({
    stay: boolean().default(false).optional(),
    email: string().nonempty().email().trim().toLowerCase(),
    password: string().nonempty(),
  }),
);
