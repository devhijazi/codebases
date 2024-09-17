import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const UserScheduleConfirmedValidation = buildValidation(
  z.object({
    userId: z.string().nonempty().uuid(),
    scheduleId: z.string().nonempty().uuid(),
  }),
);
