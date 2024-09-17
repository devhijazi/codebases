import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const SolicitationDeniedValidation = buildValidation(
  z.object({
    diaristId: z.string().nonempty().uuid(),
  }),
);
