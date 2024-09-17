import type { RemoveNotUndefinedValues } from './mixin';

export type IsNullable<T> = T extends null ? true : never;

export type IsNeverType<T> = [T] extends [never] ? true : false;

export type IsPartial<V> = [RemoveNotUndefinedValues<V>] extends [never]
  ? false
  : true;

export type IsAllPartial<T> =
  __MakeIsPartialObject<T>[keyof __MakeIsPartialObject<T>] extends true
    ? true
    : false;

export type __MakeIsPartialObject<T> = {
  [K in keyof T]-?: IsPartial<T[K]>;
};
