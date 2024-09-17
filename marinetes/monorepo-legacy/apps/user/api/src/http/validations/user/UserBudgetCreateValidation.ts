import type { BudgetCreateData } from '@marinetes/types/dtos/user/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { isDate, parseISO } from 'date-fns';
import { object, string, date } from 'yup';

import { buildValidation } from '@core/builders/validation';

type SchemaType = YupObjectSchemaType<BudgetCreateData>;

export const UserBudgetCreateValidation = buildValidation(
  object<SchemaType>({
    date: date()
      .required()
      .transform((_, originalValue) => {
        if (isDate(originalValue)) {
          return originalValue;
        }

        const parsedDate = parseISO(originalValue);

        if (isDate(parsedDate)) {
          return parsedDate;
        }

        return originalValue;
      }) as any,
    address: string().required(),
  }),
);
