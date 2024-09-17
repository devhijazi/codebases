import type {
  ReactNode,
  Ref,
  ReactElement,
  SVGProps,
  DetailedHTMLProps,
} from 'react';

import type { AnyObject, ValueOf } from '@marinetes/types/all';

export type PropsWithChildren<T extends AnyObject = {}> = T & {
  children: ReactNode;
};

//

export type ElementTags = keyof JSX.IntrinsicElements;

export type AcceptedLegacyType = ElementTags | ComponentType<any>;

export type ComponentType<P = any> =
  | ((props: P) => ReactElement<any, any> | null)
  | ((props: P, ref: Ref<any>) => ReactElement<any, any> | null);

export type ElementsType = {
  [Tag in keyof JSX.IntrinsicElements]: GetElementProps<
    JSX.IntrinsicElements[Tag]
  >;
};

//

export type GetElementByTag<Tag extends ElementTags> = ElementsType[Tag];

export type GetTagProps<T> = T extends ElementTags ? ElementsType[T] : never;

export type GetComponentProps<T> = T extends ComponentType<infer P> ? P : never;

export type GetElementProps<T extends ValueOf<JSX.IntrinsicElements>> =
  T extends DetailedHTMLProps<infer P, any>
    ? P
    : T extends SVGProps<infer P>
    ? SVGProps<P>
    : never;

export type GetComponentOrElementProps<E> = E extends ComponentType<infer P>
  ? P
  : E extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[E]
  : never;

//

export type MakePolymorphicComponentProps<
  Tag extends ElementTags,
  Props extends AnyObject,
  T extends AcceptedLegacyType,
> = {
  as?: T;
} & ElementsType[Tag] &
  GetComponentOrElementProps<T> &
  Props;

export interface PolymorphicComponent<
  Tag extends ElementTags,
  Props extends AnyObject = {},
> {
  <T extends AcceptedLegacyType>(
    props: MakePolymorphicComponentProps<Tag, Props, T>,
  ): ReactElement<any, any> | null;
}

export type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});
