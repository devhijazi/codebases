import type { DiaristFirstPasswordSetData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristFirstPasswordSetData>;

export const DiaristFirstPasswordSetValidation = buildValidation(
  object<SchemaType>({
    token: string().required().trim(),
    password: string().required().trim(),
  }),
);
