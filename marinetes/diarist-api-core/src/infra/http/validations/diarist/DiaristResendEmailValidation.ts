import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristResendEmailValidation = buildValidation(
  object({
    email: string().email().nonempty().trim().toLowerCase(),
    //   full_name: string()
    //     .required()
    //     .trim()
    //     .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
    //     .matches(
    //       /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
    //     ),
  }),
);
