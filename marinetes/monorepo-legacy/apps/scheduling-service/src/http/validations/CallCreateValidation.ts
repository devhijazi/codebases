import type { CallCreateData } from '@marinetes/types/dtos/scheduling-service';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<CallCreateData>;

export const CallCreateValidation = buildValidation(
  object<SchemaType>({
    addressId: string().required(),
    budgetId: string().required(),
  }),
);
