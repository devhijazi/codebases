import styled from '@emotion/styled';

import { Form as DefaultForm } from '@screen/components/forward/Form';

export const Container = styled.main`
  display: flex;
`;

export const Content = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(DefaultForm)`
  width: 100%;

  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  text-align: center;

  h3 {
    font-size: 17px;
    color: ${({ theme }) => theme.colors.lemon};
    font-weight: 700;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    p {
      font-size: 15px;
      color: #64b60a;
      font-weight: 400;
    }
  }

  button {
    background-color: var(--color-favorite);
    border-radius: 5px;
  }
`;
