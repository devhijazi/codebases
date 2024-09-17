import { object, string, boolean } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const SessionLoginValidation = buildValidation(
  object({
    stay: boolean().default(false),
    email: string().email().nonempty(),
    password: string().nonempty(),
  }),
);
