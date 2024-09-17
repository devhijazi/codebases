import type { UserValidationCodeIsValidData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserValidationCodeIsValidData>;

export const UserValidationCodeIsValidValidation = buildValidation(
  object<SchemaType>({
    code: string().required(),
    email: string().required(),
  }),
);
