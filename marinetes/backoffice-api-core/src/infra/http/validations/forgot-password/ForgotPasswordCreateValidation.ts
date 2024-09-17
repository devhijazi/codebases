import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const ForgotPasswordCreateValidation = buildValidation(
  object({
    email: string().nonempty().trim().toLowerCase(),
  }),
);
