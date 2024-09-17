import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const SolicitationAcceptedValidation = buildValidation(
  z.object({
    diaristId: z.string().nonempty().uuid(),
  }),
);
