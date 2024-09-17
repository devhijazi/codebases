import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const ServiceCreateValidation = buildValidation(
  object({
    title: string().nonempty(),
    icon: string().nonempty(),
  }),
);
