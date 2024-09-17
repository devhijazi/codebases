import { all, AllEffect, ForkEffect } from 'redux-saga/effects';

import authReducer from './auth/reducer';
import authSagas from './auth/sagas';

export const rootReducer = {
  auth: authReducer,
};

export function* rootSaga(): Generator<
  AllEffect<AllEffect<ForkEffect<never>>>,
  any,
  unknown
> {
  return yield all([authSagas]);
}
