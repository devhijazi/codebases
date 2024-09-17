import type { ScheduleCreateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<ScheduleCreateData>;

export const UserScheduleCreateValidation = buildValidation(
  object<SchemaType>({
    call: string().required(),
  }),
);
