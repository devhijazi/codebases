import type { AcceptData } from '@marinetes/types/dtos/scheduling-service';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<AcceptData>;

export const AcceptValidation = buildValidation(
  object<SchemaType>({
    callId: string().required(),
  }),
);
