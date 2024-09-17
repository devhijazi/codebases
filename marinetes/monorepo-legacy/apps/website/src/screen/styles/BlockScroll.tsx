import { css, Global } from '@emotion/react';

export const BlockScroll = (): JSX.Element => (
  <Global
    styles={css`
      body {
        overflow: hidden;
      }
      /* stylelint-disable-next-line */
    `}
  />
);
