import { css } from '@emotion/css';

import { BaseInput, MainInputProps } from './BaseInput';

export type InputGreenProps = MainInputProps;

export const InputGreen = (props: InputGreenProps): JSX.Element => (
  <BaseInput
    {...props}
    basedClassName={css`
      --icon-color: var(--color-white);
      --error-color: var(--color-error);
      --label-color: var(--color-teen-grey);

      --input-color: var(--color-white);
      --input-placeholder: var(--color-white-grey);
      --input-background: var(--color-light-favorite);
    `}
  />
);
