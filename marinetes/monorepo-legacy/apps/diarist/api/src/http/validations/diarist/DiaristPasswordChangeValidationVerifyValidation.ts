import type { DiaristPasswordChangeValidationVerifyData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType =
  YupObjectSchemaType<DiaristPasswordChangeValidationVerifyData>;

export const DiaristPasswordChangeValidationVerifyValidation = buildValidation(
  object<SchemaType>({
    code: string().required().trim(),
  }),
);
