import * as z from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const CreatePaymentValidation = buildValidation(
  z.object({
    value: z.number().nonnegative().int(),
    method: z.enum(['pix']),
  }),
);
