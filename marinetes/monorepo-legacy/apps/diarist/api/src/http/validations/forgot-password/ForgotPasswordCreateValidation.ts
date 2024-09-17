import type { ForgotPasswordCreateData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<ForgotPasswordCreateData>;

export const ForgotPasswordCreateValidation = buildValidation(
  object<SchemaType>({
    email: string().required().trim().lowercase(),
  }),
);
