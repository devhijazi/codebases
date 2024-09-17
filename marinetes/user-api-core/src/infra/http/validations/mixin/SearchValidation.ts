import { string, object } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const SearchValidation = buildValidation(
  object({
    search: string().nonempty().trim(),
  }),
);
