import type { GetArrayType } from '../all';

export type ModelBaseFields = 'id' | `${'created' | 'updated'}_at`;

type ParseModelField<T> = T extends Record<string, any>
  ? LeanModel<T>
  : T extends Record<string, any>[]
  ? LeanModel<GetArrayType<T>>[]
  : T;

export interface ModelBase {
  id: string;
  created_at: string;
  updated_at: string;
}

export type LeanModel<T> = {
  [Key in Exclude<keyof T, ModelBaseFields>]: ParseModelField<T[Key]>;
};
