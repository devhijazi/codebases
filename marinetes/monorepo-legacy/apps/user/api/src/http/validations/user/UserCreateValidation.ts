import type { UserCreateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserCreateData>;

type DataSchemaType = YupObjectSchemaType<UserCreateData['data']>;

export const UserCreateValidation = buildValidation(
  object<SchemaType>({
    code: string().required(),
    data: object<DataSchemaType>({
      full_name: string()
        .required()
        .trim()
        .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
        .matches(
          /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
        ),
      phone: string()
        .required()
        .trim()
        .matches(/^[0-9]{2}9[0-9]{8}$/),
      email: string().email().required().trim().lowercase(),
      password: string().required().trim(),
      document: string()
        .required()
        .trim()
        .matches(/^[0-9]{11}$/),
    }),
  }),
);
