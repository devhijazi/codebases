import type { ValidationRepository } from '@marinetes/database';
import { validationIsExpired } from '@marinetes/validation-is-expired';

import { userValidationConfig } from '@/config/user-validation';

export function userCreateValidationIsExpired(
  validation: ValidationRepository,
): boolean {
  return validationIsExpired(validation, userValidationConfig.minutesToExpires);
}
