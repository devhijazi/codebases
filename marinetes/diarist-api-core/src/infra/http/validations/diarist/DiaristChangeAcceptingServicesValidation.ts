import { boolean, object } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristChangeAcceptingServicesValidation = buildValidation(
  object({
    accepting_services: boolean(),
  }),
);
