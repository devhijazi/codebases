import type { EmployeeDocument } from './employee';

export type SessionLoginDocument = {
  token: string;
  user: EmployeeDocument;
};

export type SessionLoginVerifyDocument = {
  ok: boolean;
};
