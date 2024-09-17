import { object, number, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserAddressUpdateValidation = buildValidation(
  object({
    category: number().nonnegative().max(1),
    type: number().nonnegative().max(2),
    rooms: number().nonnegative(),
    square_meters: number().nonnegative(),
    title: string().nonempty().trim(),
  }),
);
