import { Action, Reducer } from 'redux';
import { persistReducer, Storage, PersistState } from 'redux-persist';
import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import localStorage from 'redux-persist/lib/storage';

export type Actions<T, P = any> = {
  [Key in keyof T]: (payload: Partial<P>) => ActionReturn<Key>;
};

export interface ActionBase {
  key: string;
  type: string;
  dispatch: any;
}

export interface ActionReturn<K> {
  type: K;
  payload: any;
}

export function createPersistor<S, A extends Action>(
  reducer: ((state: S, action: A) => S) | Reducer<S, A>,
  key: string,
  storage: Storage = localStorage,
): Reducer<S & { _persist: PersistState }, A> {
  return persistReducer<S, A>(
    {
      key,
      storage,
      stateReconciler,
      keyPrefix: '@marinetes:',
      blacklist: ['_persist'],
    },
    reducer as Reducer<S, A>,
  );
}

export function createActions<T, P = any>(actions: T): Actions<T, P> {
  return Object.entries(actions)
    .map(([keyFuction, action]) => [
      keyFuction,
      (payload: any) => ({ payload, type: action }),
    ])
    .reduce(
      (obj, [key, fn]) => Object.assign(obj, { [key as string]: fn }),
      {},
    ) as Actions<T>;
}
