import type { DiaristUpdateAcceptedServicesData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { array, string, object } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristUpdateAcceptedServicesData>;

export const DiaristUpdateAcceptedServicesValidation = buildValidation(
  object<SchemaType>({
    accepted_services: array().required().max(10).of(string()).strict(),
  }),
);
