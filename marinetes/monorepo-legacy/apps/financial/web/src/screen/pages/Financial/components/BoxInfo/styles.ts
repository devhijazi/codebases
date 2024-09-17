import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface SelectProps {
  isSelect?: boolean;
}

interface ButtonSelectProps {
  isSelect?: boolean;
}

export const Box = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;

  border-radius: 15px;

  display: flex;
  flex-direction: column;
`;

export const BoxHeader = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

export const DivSelect = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Select = styled.button<SelectProps>`
  width: 100%;
  height: 100%;

  color: #7fbd3b;

  ${({ isSelect }) =>
    isSelect &&
    css`
      border-bottom: 6px solid #548a19;
    `}
`;

export const DivInfo = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: #7fbd3b;
  }

  button {
    width: 132px;
    height: 38px;
    border-radius: 10px;
    background: #7fbd3b;
    color: white;
  }
`;

export const BoxMain = styled.div`
  width: 100%;
  height: 492px;
  min-height: 492px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background: #dcdcdc;
  }

  ::-webkit-scrollbar-thumb {
    background: #7fbd3b;
  }
`;

export const Info = styled.article`
  width: 100%;
  height: 65px;
  min-height: 65px;

  border-bottom: 2px solid #f0f0f0;

  padding: 35px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InfoDate = styled.span`
  color: #bbbbbb;
  font-size: 15px;
`;

export const InfoTitle = styled.p`
  color: black;
  font-size: 15px;
`;

export const InfoPrice = styled.span`
  color: #7fbd3b;
  font-size: 15px;
`;

export const BoxFooter = styled.div`
  background: #7fbd3b;
  height: 58px;

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

export const Input = styled.input`
  width: 350px;
  height: 60px;
  padding: 0 25px 0 50px;

  border-radius: 10px;
  font-size: 17px;

  background: #f5f5f5 url('/assets/search.svg') no-repeat;
  background-position: 12.5px 50%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
