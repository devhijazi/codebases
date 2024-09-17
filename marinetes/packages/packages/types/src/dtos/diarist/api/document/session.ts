import type { DiaristDocument } from './diarist';

export type SessionLoginDocument = {
  refreshToken: string | null;
  token: string;
  user: DiaristDocument;
};

export type SessionLoginVerifyDocument = {
  ok: boolean;
};

export type SessionLoginRefreshDocument = {
  token: string;
  refreshToken: string;
};
