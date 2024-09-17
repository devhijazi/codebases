import { number, string, object } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

export const PaginationValidation = buildValidation(
  object({
    page: number(),
    itemsPerPage: number(),
    search: string(),
  }),
);
