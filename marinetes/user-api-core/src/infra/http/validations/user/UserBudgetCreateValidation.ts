import { isDate, parseISO } from 'date-fns';
import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserBudgetCreateValidation = buildValidation(
  z.object({
    date: z.string().transform(originalValue => {
      if (isDate(originalValue)) {
        return originalValue;
      }

      const parsedDate = parseISO(originalValue);

      if (isDate(parsedDate)) {
        return parsedDate;
      }

      return originalValue;
    }),
    price: z.number().int(),
    addressId: z.string().nonempty().uuid(),
    services: z.array(z.string().nonempty().uuid()).min(1),
  }),
);
