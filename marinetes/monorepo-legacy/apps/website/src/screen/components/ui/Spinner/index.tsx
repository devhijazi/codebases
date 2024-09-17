import { mergeClassNames } from '@hitechline/reactools';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Spinner = ({ className, ...props }: Props): JSX.Element => (
  <div {...props} className={mergeClassNames(styles.container, className)} />
);
