import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const SessionRefreshValidation = buildValidation(
  object({
    refreshToken: string().nonempty(),
  }),
);
