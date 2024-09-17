import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristPasswordChangeValidation = buildValidation(
  object({
    code: string().nonempty().trim(),
    password: string().nonempty().trim(),
  }),
);
