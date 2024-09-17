import { environment } from './environment';

export const sessionConfig = {
  jwtToken: environment.jwtToken,
  tokenExpirationTimeInMilliseconds: 60000 * 60 * 24, // 1d
  refreshTokenExpirationTimeInMilliseconds: 60000 * 60 * 24, // 1d
} as const;
