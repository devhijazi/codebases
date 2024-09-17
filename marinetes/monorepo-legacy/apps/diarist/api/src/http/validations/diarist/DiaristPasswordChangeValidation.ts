import type { DiaristPasswordChangeData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristPasswordChangeData>;

export const DiaristPasswordChangeValidation = buildValidation(
  object<SchemaType>({
    code: string().required().trim(),
    password: string().required().trim(),
  }),
);
