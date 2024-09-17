import type { DiaristCreateData } from '@marinetes/types/dtos/financial/api';
import type { DiaristAddress, LeanModel } from '@marinetes/types/model';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string, number } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<DiaristCreateData>;

type AddressSchemaType = YupObjectSchemaType<LeanModel<DiaristAddress>>;

export const DiaristCreateValidation = buildValidation(
  object<SchemaType>({
    email: string().email().required().trim().lowercase(),
    full_name: string()
      .required()
      .trim()
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
      .matches(
        /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
      ),
    birthdate: string()
      .required()
      .matches(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/),
    document: string()
      .required()
      .trim()
      .matches(/^[0-9]{11}$/),
    phone: string()
      .required()
      .trim()
      .matches(/^[0-9]{2}9[0-9]{8}$/),
    general_register: string()
      .required()
      .trim()
      .matches(/^[0-9]{4,20}$/),
    address: object<AddressSchemaType>({
      city: string().required().trim(),
      street: string().required().trim(),
      number: number().required().min(0),
      zip_code: string()
        .required()
        .trim()
        .matches(/^[0-9]{8}$/),
      neighborhood: string().trim().required(),
      state: string().trim().required(),
    }).required(),
  }),
);
