import { object, number, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserAddressCreateValidation = buildValidation(
  object({
    category: number().min(0).max(1),
    type: number().min(0).max(2),
    city: string().nonempty().trim(),
    neighborhood: string().nonempty().trim(),
    number: string().nonempty(),
    complement: string().nullable().optional(),
    rooms: number().nonnegative(),
    square_meters: number().nonnegative(),
    state: string().nonempty().trim(),
    street: string().nonempty(),
    title: string().nonempty().trim(),
    zip_code: string().nonempty().trim(),
  }),
);
