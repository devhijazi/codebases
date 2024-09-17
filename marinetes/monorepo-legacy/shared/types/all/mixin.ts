export type Nullable<T> = T | null;

export type AnyThing<T> = T | Promise<T>;

export type PromiseType<T> = T extends Promise<infer R> ? R : T;

export type ValueOf<T> = T[keyof T];

export type RemoveNotUndefinedValues<V> = V extends undefined ? V : never;
