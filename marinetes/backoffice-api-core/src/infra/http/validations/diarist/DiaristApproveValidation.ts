import * as z from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const DiaristApproveValidation = buildValidation(
  z.object({
    pixKey: z.string().nonempty(),
    pixKeyType: z.enum(['cpf', 'cnpj', 'phone', 'email', 'random_key']),
  }),
);
