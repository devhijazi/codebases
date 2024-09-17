/* eslint-disable @typescript-eslint/ban-types */

import {
  createElement,
  SVGProps,
  ReactNode,
  ComponentType,
  DetailedHTMLProps,
} from 'react';

type AsType = ElementTags | ComponentType<any>;

type ElementTags = keyof JSX.IntrinsicElements;
type ElementsType = {
  [Tag in ElementTags]: MakeElementProps<JSX.IntrinsicElements[Tag]>;
};

//

type GetComponentProps<T> = T extends ComponentType<infer P>
  ? Omit<P, 'asProp'>
  : {};
type GetElementProps<E> = E extends ElementTags ? ElementsType[E] : {};

//

type MakeElementProps<T extends ValueOf<JSX.IntrinsicElements>> =
  T extends DetailedHTMLProps<infer P, any>
    ? P
    : T extends SVGProps<infer P>
    ? SVGProps<P>
    : never;

//

type NothingProps = {}; // eslint-disable-line @typescript-eslint/ban-types

type PropsWithElement<
  DefaultElement extends ElementTags,
  MainProps,
> = MainProps &
  ElementsType[DefaultElement] & {
    // asProp: AsType;
    PolymorphicElement: ComponentType<ElementsType[DefaultElement]>;
  };

type PropsWithAs<MainProps> = MainProps & {
  asProp?: AsType;
};

//

interface PolymorphicComponentBaseProps<As extends AsType> {
  asProp?: As;
  children?: ReactNode;
}

// type ElementProps<As extends ElementTags> = PolymorphicComponentBaseProps<As> &
//   ElementsType[As];
// type ComponentProps<As extends ComponentType<any>> =
//   PolymorphicComponentBaseProps<As> & GetComponentProps<As>;
type ElementProps<As> = GetElementProps<As>;
type ComponentProps<As> = GetComponentProps<As>;

//

interface PolymorphicComponent<DefaultElement extends ElementTags, MainProps> {
  <T extends AsType = DefaultElement>(
    props: MainProps &
      PolymorphicComponentBaseProps<T> &
      (ElementProps<T> | ComponentProps<T>),
  ): JSX.Element | null;
  // <T extends ElementTags>(
  //   props: MainProps & ElementProps<T>,
  // ): JSX.Element | null;
  // <T extends ComponentType<any>>(
  //   props: MainProps & ComponentProps<T>,
  // ): JSX.Element | null;
  // (props: MainProps & ElementProps<DefaultElement>): JSX.Element | null;
}

type PolymorphicComponentElement<
  DefaultElement extends ElementTags,
  MainProps,
> = {
  <T extends ElementTags = DefaultElement>(
    props: MainProps &
      PolymorphicComponentBaseProps<T> &
      (ElementProps<T> | ComponentProps<T>),
  ): JSX.Element | null;
};

const ACCEPT_AS_TYPE = ['string', 'function'];

export function makePolymorphicComponent<
  MainProps = NothingProps,
  DefaultElement extends ElementTags = 'div',
>(
  defaultElement: DefaultElement,
  Component: ComponentType<PropsWithElement<DefaultElement, MainProps>>,
): PolymorphicComponent<DefaultElement, MainProps> {
  const getRenderElement = (element: string): ((props: any) => JSX.Element) => {
    const Element = (providedProps: any): JSX.Element => {
      const props = { ...providedProps };

      delete props.asProp; // eslint-disable-line
      return createElement(element, props);
    };

    return Element;
  };

  function PolymorphicComponent({
    asProp,
    ...allProps
  }: PropsWithAs<MainProps>): JSX.Element {
    const mainProps = {} as MainProps;

    Object.assign(mainProps, allProps);

    let PolymorphicElement: ComponentType<any> =
      getRenderElement(defaultElement);

    if (asProp) {
      if (!ACCEPT_AS_TYPE.includes(typeof asProp)) {
        throw new Error('Invalid "asProp" was provided.');
      }

      if (typeof asProp === 'string') {
        PolymorphicElement = getRenderElement(asProp);
      }

      if (typeof asProp === 'function') {
        PolymorphicElement = asProp;
      }
    }

    return <Component {...mainProps} PolymorphicElement={PolymorphicElement} />;
  }

  return PolymorphicComponent as PolymorphicComponent<
    DefaultElement,
    MainProps
  >;
}

export function makePolymorphicComponentElement<
  MainProps = NothingProps,
  DefaultElement extends ElementTags = 'div',
>(
  defaultElement: DefaultElement,
  Component: ComponentType<PropsWithElement<DefaultElement, MainProps>>,
): PolymorphicComponentElement<DefaultElement, MainProps> {
  return makePolymorphicComponentElement(defaultElement, Component);
}
