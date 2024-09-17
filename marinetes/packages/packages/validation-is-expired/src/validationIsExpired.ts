import type { Validation } from '@marinetesio/types/model';

const convertMinutesToMS = (minutes: number): number => minutes * 60 * 1000;

export function validationIsExpired(
  validation: Validation,
  expiresTimeInMinutes: number,
): boolean {
  const expiresTimeInMS = convertMinutesToMS(expiresTimeInMinutes);

  const now = Date.now();
  const validationExpiresTimestamp =
    Number(validation.created_timestamp) + expiresTimeInMS;

  return now >= validationExpiresTimestamp;
}
