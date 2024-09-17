import type { DiaristAddress, LeanModel } from '@marinetes/types/model';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string, number } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<LeanModel<DiaristAddress>>;

export const DiaristAddressUpdateValidation = buildValidation(
  object<SchemaType>({
    city: string().required().trim(),
    street: string().required().trim(),
    number: number().required().min(0),
    zip_code: string()
      .required()
      .trim()
      .matches(/^[0-9]{8}$/),
    neighborhood: string().trim().required(),
    state: string().trim().required(),
  }),
);
