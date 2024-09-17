import type { ServiceCreateData } from '@marinetes/types/dtos/financial/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<ServiceCreateData>;

export const ServiceCreateValidation = buildValidation(
  object<SchemaType>({
    title: string().required(),
    icon: string().required(),
  }),
);
