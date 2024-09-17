import { mergeClassNames } from '@hitechline/reactools';

import { makePolymorphicComponent } from '@/screen/components/forward/makePolymorphicComponent';

import styles from './styles.module.css';

export const BaseButton = makePolymorphicComponent(
  'button',
  ({ PolymorphicElement, className, children, ...props }) => (
    <PolymorphicElement
      {...props}
      type="button"
      className={mergeClassNames(styles.wrapper, className)}
    >
      {children}
    </PolymorphicElement>
  ),
);
