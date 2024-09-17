import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const RemoveUserFromQueueValidation = buildValidation(
  z.object({
    userId: z.string().nonempty().uuid(),
  }),
);
