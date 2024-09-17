import * as z from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';
import { boolean, number } from '@/shared/utils/zod';

export const DiaristListValidation = buildValidation(
  z.object({
    page: number(z.number()),
    itemsPerPage: number(z.number()),
    search: z.string(),
    status: z.string().optional(),
    byDate: boolean(z.boolean()),
  }),
);
