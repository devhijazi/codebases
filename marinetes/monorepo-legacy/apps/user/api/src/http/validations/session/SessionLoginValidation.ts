import { SessionLoginData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { boolean, object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<SessionLoginData>;

export const SessionLoginValidation = buildValidation(
  object<SchemaType>({
    stay: boolean().default(false).strict(),
    email: string().required().email().trim().lowercase(),
    password: string().required(),
  }),
);
