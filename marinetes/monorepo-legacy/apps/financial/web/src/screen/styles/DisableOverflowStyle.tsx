import { Global, css } from '@emotion/react';

export const DisableOverflowStyle = (): JSX.Element => (
  <Global
    styles={css`
      body {
        overflow: hidden;
      }
    `}
  />
);
