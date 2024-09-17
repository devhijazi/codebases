import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface CardProps {
  isSelect: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Content = styled.div`
  width: 100%;
`;

export const BoxMenu = styled.section`
  height: 320px;
  background: white;
  border-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.button<CardProps>`
  width: 100%;
  height: 60px;
  padding: 25px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 23px;

  svg {
    width: 28px;
    height: 28px;
    color: var(--color-favorite);
  }

  p {
  }

  &:hover {
    background: var(--color-favorite);

    p {
      color: white;
    }

    svg {
      color: white;
    }
  }

  ${({ isSelect }) =>
    isSelect &&
    css`
      background: var(--color-favorite);

      p {
        color: white;
      }

      svg {
        color: white;
      }
    `}
`;
