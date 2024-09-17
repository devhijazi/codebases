import type { UserDocument } from './user';

export type SessionLoginDocument = {
  refreshToken: string | null;
  token: string;
  user: UserDocument;
};

export type SessionLoginVerifyDocument = {
  ok: boolean;
};

export type SessionLoginRefreshDocument = {
  token: string;
  refreshToken: string;
};
