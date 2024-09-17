import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserValidationCodeIsValidValidation = buildValidation(
  object({
    code: string().nonempty(),
    email: string().nonempty(),
  }),
);
