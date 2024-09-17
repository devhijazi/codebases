import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ContainerProps {
  size: string;
  color: string;
}

export const Container = styled.div<ContainerProps>`
  > span {
    ${({ size }) => css`
      width: ${size};
      height: ${size};
    `}

    display: block;

    border-radius: var(--wai-main-border-radius);

    border: 4px solid rgba(0, 0, 0, 0.09);
    border-left: 4px solid ${({ color }) => color};
    border-radius: 50%;

    animation: spinner 400ms linear infinite;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
