import type { DiaristChangeAcceptingServicesData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { boolean, object } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristChangeAcceptingServicesData>;

export const DiaristChangeAcceptingServicesValidation = buildValidation(
  object<SchemaType>({
    accepting_services: boolean().required().strict(),
  }),
);
