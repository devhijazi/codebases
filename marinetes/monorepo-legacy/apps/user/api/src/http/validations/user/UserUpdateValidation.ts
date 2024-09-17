import type { UserUpdateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserUpdateData>;

export const UserUpdateValidation = buildValidation(
  object<SchemaType>({
    phone: string()
      .trim()
      .matches(/^[0-9]{2}9[0-9]{8}$/),
    full_name: string()
      .trim()
      .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g)
      .matches(
        /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
      ),
  }),
);
