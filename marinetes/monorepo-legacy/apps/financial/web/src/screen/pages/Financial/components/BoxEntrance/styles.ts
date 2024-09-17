import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonSelectProps {
  isSelect?: boolean;
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

  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;

  div {
    p {
      font-size: 3rem;
      color: #7fbd3b;
      font-weight: bold;

      span {
        font-size: 2rem;
      }
    }

    p.desc {
      font-size: 1.5rem;
      color: #bbbbbb;
      font-weight: normal;
    }
  }

  hr {
    border: 2px solid #f0f0f0;
  }

  div.down {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    padding: 5px 0;

    article {
      p {
        font-size: 1.7rem;

        color: #7fbd3b;
        font-weight: normal;

        span {
          font-size: 1.7rem;
        }
      }

      p.desc {
        font-size: 1.2rem;
        color: #bbbbbb;
        font-weight: normal;
      }

      article.right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }
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
