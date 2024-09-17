import styled from '@emotion/styled';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  animation: is-rotating 1s infinite;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 6px solid var(--color-favorite);
  border-top-color: ${({ color }) => color || '#045307'};

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
