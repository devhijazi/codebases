import type { UserValidationCodeCreateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserValidationCodeCreateData>;

export const UserValidationCodeCreateValidation = buildValidation(
  object<SchemaType>({
    email: string().email().required(),
  }),
);
