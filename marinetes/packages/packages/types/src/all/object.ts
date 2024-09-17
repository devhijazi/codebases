import type { Nullable } from './mixin';

export type AnyObject = Record<string, any>;

export type NullableObject<T> = {
  [Key in keyof T]-?: Nullable<T[Key]>;
};

export type NotRequiredObject<T> = {
  [Key in keyof T]?: T[Key];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export type RemoveObjectProperties<
  T extends AnyObject,
  Properties extends keyof T,
> = {
  [Key in Exclude<keyof T, Properties>]: T[Key];
};

export type RequiredProperties<T extends AnyObject, P extends keyof T> = Omit<
  T,
  P
> &
  {
    [Key in P]-?: T[Key];
  };

export type MergeObject<O extends AnyObject, M extends AnyObject> = {
  obj: {
    [K in keyof (O & M)]: (O & M)[K];
  };
}['obj'];

export type CloneObject<O extends AnyObject> = {
  obj: {
    [K in keyof O]: O[K];
  };
}['obj'];
