import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Z_INDEX } from './config';

interface AlphaStyleProps {
  base?: keyof typeof Z_INDEX | number;
}

export const AlphaStyle = styled.div<AlphaStyleProps>`
  position: fixed;

  height: 100vh;
  width: 100%;

  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);

  ${({ base }) => {
    if (typeof base === 'string') {
      return css`
        z-index: ${Z_INDEX[base] - 1};
      `;
    }
    if (typeof base === 'number') {
      return css`
        z-index: ${base - 1};
      `;
    }
    return undefined;
  }}
`;
