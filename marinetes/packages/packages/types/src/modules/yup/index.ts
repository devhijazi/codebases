import type { AnyObject, IsNullable } from '../../all';
import type {
  ArraySchema,
  DateSchema,
  ObjectSchema,
  NumberSchema,
  StringSchema,
  BooleanSchema,
} from 'yup';
import type { TypeOfShape, OptionalObjectSchema } from 'yup/lib/object';

export type YupMaybe<T> = T | null | undefined;

export type GetYupSchema<T> = T extends number
  ? NumberSchema<YupMaybe<T>>
  : T extends string
  ? StringSchema<YupMaybe<T>>
  : T extends Date
  ? DateSchema<YupMaybe<T>>
  : T extends Array<infer E>
  ? ArraySchema<GetYupSchema<E>>
  : T extends AnyObject
  ? YupObjectSchema<T>
  : T extends boolean
  ? BooleanSchema<YupMaybe<boolean>>
  : never;

export type YupObjectSchemaType<T extends AnyObject> = {
  [Key in keyof T]-?: GetYupSchema<T[Key]>;
};

export type YupObjectSchema<T extends AnyObject> = IsNullable<T> extends true
  ?
      | ObjectSchema<
          YupObjectSchemaType<T>,
          AnyObject,
          TypeOfShape<YupObjectSchemaType<T>> | null
        >
      | OptionalObjectSchema<YupObjectSchemaType<T>>
  : ObjectSchema<YupObjectSchemaType<T>>;
