import type { SearchData } from '@marinetes/types/dtos/mixin/search';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { string, object } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<SearchData>;

export const SearchValidation = buildValidation(
  object<SchemaType>({
    search: string().required(),
  }),
);
