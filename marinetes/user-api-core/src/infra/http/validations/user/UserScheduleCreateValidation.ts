import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserScheduleCreateValidation = buildValidation(
  object({
    call: string().nonempty(),
  }),
);
