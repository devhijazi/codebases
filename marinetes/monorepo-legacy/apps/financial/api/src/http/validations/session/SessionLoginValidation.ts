import { SessionLoginData } from '@marinetes/types/dtos/financial/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<SessionLoginData>;

export const SessionLoginValidation = buildValidation(
  object<SchemaType>({
    email: string().email().required(),
    password: string().required(),
  }),
);
