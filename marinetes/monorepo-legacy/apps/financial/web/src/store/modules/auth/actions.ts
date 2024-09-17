import { createActions } from '../config';
import type { Types, Payload } from './types';

export const types: Types = {
  logOut: '@auth/LOG_OUT',
  signInRequest: '@auth/SIGN_IN_REQUEST',
  signInSuccess: '@auth/SIGN_IN_SUCCESS',
};

export const actions = createActions<Types, Payload>({
  logOut: types.logOut,
  signInRequest: types.signInRequest,
  signInSuccess: types.signInSuccess,
});
