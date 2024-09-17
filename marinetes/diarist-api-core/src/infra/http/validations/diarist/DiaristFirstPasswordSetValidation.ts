import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristFirstPasswordSetValidation = buildValidation(
  object({
    token: string().nonempty().trim(),
    password: string().nonempty().trim(),
  }),
);
