import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserValidationCodeCreateValidation = buildValidation(
  object({
    email: string().email().nonempty(),
  }),
);
