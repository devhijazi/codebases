import type { ValidationRepository } from '@marinetesio/database/typeorm/mysql';

import { validationIsExpired } from '@marinetesio/validation-is-expired';

import { userValidationConfig } from '@/config/user-validation';

export function userCreateValidationIsExpired(
  validation: ValidationRepository,
): boolean {
  return validationIsExpired(validation, userValidationConfig.minutesToExpires);
}
