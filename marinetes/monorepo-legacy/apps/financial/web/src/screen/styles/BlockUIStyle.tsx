import { Global, css } from '@emotion/react';

export const BlockUIStyle = (): JSX.Element => (
  <Global
    styles={css`
      body {
        overflow: hidden;
      }

      #root {
        filter: blur(3px);
      }
    `}
  />
);
