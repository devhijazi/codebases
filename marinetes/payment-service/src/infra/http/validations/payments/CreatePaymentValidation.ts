import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const CreatePaymentValidation = buildValidation(
  z.object({
    userId: z.string().nonempty().uuid(),
    method: z.enum(['pix']),
    value: z.number().int(),
  }),
);
