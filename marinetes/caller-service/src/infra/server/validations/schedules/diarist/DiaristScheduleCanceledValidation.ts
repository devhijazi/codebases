import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const DiaristScheduleCanceledValidation = buildValidation(
  z.object({
    diaristId: z.string().nonempty().uuid(),
    scheduleId: z.string().nonempty().uuid(),
  }),
);
