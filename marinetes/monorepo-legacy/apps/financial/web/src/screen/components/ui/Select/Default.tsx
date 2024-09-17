import { css } from '@emotion/css';

import { BaseSelect, MainSelectProps } from './BaseSelect';

export type SelectProps = MainSelectProps;

export const Select = (props: SelectProps): JSX.Element => (
  <BaseSelect
    {...props}
    basedClassName={css`
      --label-color: var(--color-input-label);
    `}
  />
);
