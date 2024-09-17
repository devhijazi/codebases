import type { PaginateData } from '@marinetes/types/dtos/mixin/pagination';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { number, string, object } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<PaginateData>;

export const PaginationValidation = buildValidation(
  object<SchemaType>({
    page: number(),
    itemsPerPage: number(),
    search: string().trim(),
  }),
);
