import { SessionLoginData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string, boolean } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<SessionLoginData>;

export const SessionLoginValidation = buildValidation(
  object<SchemaType>({
    stay: boolean().strict().default(false),
    email: string().email().required(),
    password: string().required(),
  }),
);
