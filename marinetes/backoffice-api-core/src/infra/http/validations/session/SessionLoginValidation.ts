import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const SessionLoginValidation = buildValidation(
  object({
    email: string().email().nonempty(),
    password: string().nonempty(),
  }),
);
