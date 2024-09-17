import { object, string, number } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristCreateValidation = buildValidation(
  object({
    email: string().email().nonempty().trim().toLowerCase(),
    full_name: string()
      .nonempty()
      .trim()
      .regex(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
      .regex(
        /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
      ),
    birthdate: string()
      .nonempty()
      .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/),
    document: string()
      .nonempty()
      .trim()
      .regex(/^[0-9]{11}$/),
    phone: string()
      .nonempty()
      .trim()
      .regex(/^[0-9]{2}9[0-9]{8}$/),
    general_register: string()
      .nonempty()
      .trim()
      .regex(/^[0-9]{4,20}$/),
    address: object({
      city: string().nonempty().trim(),
      street: string().nonempty().trim(),
      number: number().nonnegative().min(0),
      zip_code: string()
        .nonempty()
        .trim()
        .regex(/^[0-9]{8}$/),
      neighborhood: string().trim().nonempty(),
      state: string().trim().nonempty(),
    }).required(),
  }),
);
