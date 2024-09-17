import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const UserCreateValidation = buildValidation(
  object({
    code: string().nonempty(),
    data: object({
      full_name: string()
        .nonempty()
        .trim()
        .regex(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
        .regex(
          /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
        ),
      phone: string()
        .nonempty()
        .trim()
        .regex(/^[0-9]{2}9[0-9]{8}$/),
      email: string().email().nonempty().trim().toLowerCase(),
      password: string().nonempty().trim(),
      document: string()
        .nonempty()
        .trim()
        .regex(/^[0-9]{11}$/),
    }),
  }),
);
