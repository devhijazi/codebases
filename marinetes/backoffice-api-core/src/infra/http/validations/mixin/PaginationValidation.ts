import { number as zodNumber, string, object } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';
import { number } from '@/shared/utils/zod';

export const PaginationValidation = buildValidation(
  object({
    page: number(<any>zodNumber().int().nonnegative().default(1)),
    itemsPerPage: number(
      <any>zodNumber().int().nonnegative().min(5).max(20).default(10),
    ),
    search: string().optional().nullable().default(null),
  }),
);
