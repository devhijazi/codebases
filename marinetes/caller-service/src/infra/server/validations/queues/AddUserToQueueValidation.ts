import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const AddUserToQueueValidation = buildValidation(
  z.object({
    userId: z.string().nonempty().uuid(),
    budgetId: z.string().nonempty().uuid(),
  }),
);
