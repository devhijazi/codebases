import styled from '@emotion/styled';

import { Form as DefaultForm } from '@screen/components/forward/Form';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(DefaultForm)`
  max-width: 350px;
  height: auto;
  margin: auto;
  padding: 50px;
  background-color: var(--color-favorite);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h3 {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    margin-bottom: 2rem;
    width: 100%;
    text-align: left;
  }

  button {
    width: 100%;
    max-width: 100%;
    height: 50px;

    color: var(--color-favorite);

    border-radius: 5px;
    background-color: var(--color-white);
  }

  > a {
    font-size: 14px;
    color: var(--color-white);
    text-decoration: underline;
  }
`;
