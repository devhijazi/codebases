import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserUpdateValidation = buildValidation(
  object({
    phone: string()
      .trim()
      .regex(/^[0-9]{2}9[0-9]{8}$/),
    full_name: string()
      .trim()
      .regex(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
      .regex(
        /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
      ),
  }),
);
