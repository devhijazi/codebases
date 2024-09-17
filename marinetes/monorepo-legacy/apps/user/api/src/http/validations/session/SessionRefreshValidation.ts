import type { SessionRefreshData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<SessionRefreshData>;

export const SessionRefreshValidation = buildValidation(
  object<SchemaType>({
    refreshToken: string().required(),
  }),
);
