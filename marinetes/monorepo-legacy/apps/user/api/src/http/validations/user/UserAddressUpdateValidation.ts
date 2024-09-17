import type { UserAddressUpdateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, number, string } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<UserAddressUpdateData>;

export const UserAddressUpdateValidation = buildValidation(
  object<SchemaType>({
    category: number().equals([0, 1]).required(),
    type: number().equals([0, 1, 2]).required(),
    rooms: number().required().integer().min(0),
    square_meters: number().required().integer().min(0),
    title: string().required().trim(),
  }),
);
