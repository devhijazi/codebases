import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const ForgotPasswordResetValidation = buildValidation(
  object({
    token: string().nonempty(),
    password: string().nonempty(),
  }),
);
