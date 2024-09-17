import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/Validation';

export const DiaristScheduleWaitingConfirmationValidation = buildValidation(
  z.object({
    diaristId: z.string().nonempty().uuid(),
    scheduleId: z.string().nonempty().uuid(),
  }),
);
