import type { ServiceUpdateData } from '@marinetes/types/dtos/financial/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<ServiceUpdateData>;

export const ServiceUpdateValidation = buildValidation(
  object<SchemaType>({
    icon: string().required(),
  }),
);
