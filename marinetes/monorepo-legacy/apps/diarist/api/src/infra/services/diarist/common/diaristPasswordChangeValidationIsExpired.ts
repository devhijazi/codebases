import type { ValidationRepository } from '@marinetes/database';
import { diaristPasswordChangeValidationConfig } from '@marinetes/diarist-validation-config';
import { validationIsExpired } from '@marinetes/validation-is-expired';

export function diaristPasswordChangeValidationIsExpired(
  validation: ValidationRepository,
): boolean {
  return validationIsExpired(
    validation,
    diaristPasswordChangeValidationConfig.minutesToExpires,
  );
}
