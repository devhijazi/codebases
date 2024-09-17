import type { UserAddressCreateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, number, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserAddressCreateData>;

export const UserAddressCreateValidation = buildValidation(
  object<SchemaType>({
    category: number().equals([0, 1]).required(),
    type: number().equals([0, 1, 2]).required(),
    city: string().required().trim(),
    neighborhood: string().required().trim(),
    number: number().required().integer().min(0),
    rooms: number().required().integer().min(0),
    square_meters: number().required().integer().min(0),
    state: string().required().trim(),
    street: string().required(),
    title: string().required().trim(),
    zip_code: string().required().trim(),
  }),
);
