import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const ServiceUpdateValidation = buildValidation(
  object({
    icon: string().nonempty(),
  }),
);
