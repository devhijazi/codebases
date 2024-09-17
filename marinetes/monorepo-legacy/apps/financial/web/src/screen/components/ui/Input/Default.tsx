import { css } from '@emotion/css';

import { BaseInput, MainInputProps } from './BaseInput';

export type InputProps = MainInputProps;

export const Input = (props: InputProps): JSX.Element => (
  <BaseInput
    {...props}
    basedClassName={css`
      --icon-color: var(--color-white);
      --error-color: var(--color-error);
      --label-color: var(--color-input-label);

      --input-color: var(--color-grey);
      --input-placeholder: var(--color-teen-grey);
      --input-background: var(--color-white);
    `}
  />
);
