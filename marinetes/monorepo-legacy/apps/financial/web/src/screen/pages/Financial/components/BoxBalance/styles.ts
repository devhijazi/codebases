import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonSelectProps {
  isSelect?: boolean;
}

interface ArticleProps {
  isNegative?: boolean;
}

export const Box = styled.article`
  width: 100%;
  max-width: 300px;

  border-radius: 15px;

  background: #ffffff;

  display: grid;
  grid-template-rows: 20% auto 56px;
`;

export const BoxHeader = styled.div`
  padding: 15px;

  display: flex;
  justify-content: space-between;

  p {
    font-size: 1.5rem;
    color: #7fbd3b;
  }
`;

export const BoxMain = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Article = styled.article<ArticleProps>`
  color: ${({ isNegative }) => (isNegative ? '#E26868' : '#7fbd3b')};

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

export const BoxFooter = styled.div`
  background: #7fbd3b;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const ButtonSelect = styled.button<ButtonSelectProps>`
  font-size: 15px;
  color: white;

  ${({ isSelect }) =>
    isSelect &&
    css`
      border-top-width: 6px;
      border-top-style: solid;
      border-top-color: #548a19;
    `}
`;
