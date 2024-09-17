import type { AxiosResponse } from 'axios';
import { REHYDRATE } from 'redux-persist';
import { takeLatest, all, put, call } from 'redux-saga/effects';

import { api } from '@modules/services/api';

import { types, actions } from './actions';
import type { Action } from './types';

export function* signIn({ payload: { token, refreshToken } }: Action) {
  api.defaults.headers.Authorization = `Bearer ${token}`;

  yield put(actions.signInSuccess({ token, refreshToken }));
}

export function* setToken({ key, payload }: Action) {
  if (!payload) return;

  if (key === 'auth') {
    const { token, signed } = payload;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const response: AxiosResponse = yield call(
          api.get,
          'sessions/login/verify',
        );
        const { ok } = response.data;

        if (!ok) throw new Error('Invalid OK Response');
      } catch {
        yield put(actions.logOut({}));
      }
    } else if (signed) {
      yield put(actions.logOut({}));
    }
  }
}

export default all([
  takeLatest(REHYDRATE, setToken),
  takeLatest(types.signInRequest, signIn),
]);

/* eslint @typescript-eslint/explicit-function-return-type: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
