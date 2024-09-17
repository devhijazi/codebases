import { string, object } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristUpdateAcceptedServicesValidation = buildValidation(
  object({
    accepted_services: string().array().max(10),
  }),
);
