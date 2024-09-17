import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const CreateDiaristTransferValidation = buildValidation(
  z.object({
    value: z.number().nonnegative().min(1),
    operationType: z.enum(['pix']),
    bankDataId: z.string().optional(),
    pixDataId: z.string().optional(),
  }),
);
