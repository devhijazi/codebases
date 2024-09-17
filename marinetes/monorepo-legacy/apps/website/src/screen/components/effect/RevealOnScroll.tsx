import { mergeClassNames } from '@hitechline/reactools';
import {
  createDomMotionComponent,
  HTMLMotionProps,
  ForwardRefComponent,
} from 'framer-motion';
import type { DOMMotionComponents } from 'framer-motion/types/render/dom/types';
import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

type ElementTags = keyof DOMMotionComponents;

type GetProps<E> = E extends (props: infer Props) => any ? Props : never;

type Props<As extends ElementTags> = {
  asProp?: As;
} & Omit<
  GetProps<DOMMotionComponents[As]>,
  'animate' | 'variants' | 'transition'
>;

export const RevealOnScroll = <As extends ElementTags = 'div'>({
  asProp,
  children,
  className,
  ...props
}: Props<As>): JSX.Element => {
  const [loaded, updateLoaded] = useState(false);
  const [viewed, updateViewed] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const Element = useMemo(
    () =>
      createDomMotionComponent(asProp ?? 'div') as ForwardRefComponent<
        any,
        HTMLMotionProps<any>
      >,
    [asProp],
  );

  useEffect(() => {
    setTimeout(() => {
      updateLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (inView && !viewed) {
      updateViewed(true);
    }
  }, [inView, viewed]);

  return (
    <Element
      {...(props as any)}
      ref={ref}
      className={mergeClassNames(className as any, {
        'opacity-0': !loaded,
      })}
      animate={viewed ? 'visible' : 'hidden'}
      variants={{
        visible: {
          opacity: 1,
        },
        hidden: {
          transform: 'translateY(50px)',
          opacity: 0,
        },
      }}
      transition={{
        opacity: {
          duration: 0.6,
        },
        transform: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </Element>
  );
};
