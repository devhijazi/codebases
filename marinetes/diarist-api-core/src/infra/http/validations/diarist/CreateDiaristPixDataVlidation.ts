/* eslint-disable no-useless-escape */

import { z } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const CreateDiaristPixDataValidation = buildValidation(
  z.object({
    key: z.string().nonempty(),
    keyType: z.enum(['cpf', 'cnpj', 'phone', 'email', 'random_key']),
  }),
);
