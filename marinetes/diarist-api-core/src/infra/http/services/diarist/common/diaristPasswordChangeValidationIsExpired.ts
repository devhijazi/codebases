import type { ValidationRepository } from '@marinetesio/database/typeorm/mysql';

import { diaristPasswordChangeValidationConfig } from '@marinetesio/diarist-validation-config';
import { validationIsExpired } from '@marinetesio/validation-is-expired';

export function diaristPasswordChangeValidationIsExpired(
  validation: ValidationRepository,
): boolean {
  return validationIsExpired(
    validation,
    diaristPasswordChangeValidationConfig.minutesToExpires,
  );
}
