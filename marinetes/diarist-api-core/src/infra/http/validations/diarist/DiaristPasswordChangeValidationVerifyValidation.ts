import type { DiaristPasswordChangeValidationVerifyData } from '@marinetesio/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetesio/types/modules/yup';

import { object, string } from 'zod';

import { buildValidation } from '@/core/infra/http/builders/validation';

type SchemaType =
  YupObjectSchemaType<DiaristPasswordChangeValidationVerifyData>;

export const DiaristPasswordChangeValidationVerifyValidation = buildValidation(
  object<SchemaType>({
    code: string().nonempty().trim(),
  }),
);
