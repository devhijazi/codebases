import type { ValueOf } from '@marinetes/types/all';

import { ActionBase } from '../config';

export type Payload = Pick<State, 'token' | 'signed' | 'refreshToken'>;

export interface Action extends ActionBase {
  payload: Payload;
  type: ValueOf<Types>;
}

export interface State {
  token: string;
  refreshToken: string;
  signed: boolean;
}

export interface Types {
  logOut: '@auth/LOG_OUT';
  signInRequest: '@auth/SIGN_IN_REQUEST';
  signInSuccess: '@auth/SIGN_IN_SUCCESS';
}
