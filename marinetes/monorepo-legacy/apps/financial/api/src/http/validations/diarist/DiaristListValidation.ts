import type { DiaristListData } from '@marinetes/types/dtos/financial/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { number, string, object, boolean } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristListData>;

export const DiaristListValidation = buildValidation(
  object<SchemaType>({
    page: number(),
    itemsPerPage: number(),
    search: string(),
    activeRegister: boolean(),
    preRegister: boolean(),
    byDate: boolean(),
  }),
);
