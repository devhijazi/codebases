import type { ForgotPasswordResetData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<ForgotPasswordResetData>;

export const ForgotPasswordResetValidation = buildValidation(
  object<SchemaType>({
    token: string().required(),
    password: string().required().trim(),
  }),
);
