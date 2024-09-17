import styled from '@emotion/styled';

import { Form as FormDefault } from '@/screen/components/forward/Form';

export const Container = styled(FormDefault)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Content = styled.div`
  display: grid;
  width: 100%;

  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'avatar email'
    'avatar phone'
    'full_name document'
    'birthdate general_register';
`;

export const AvatarContainer = styled.div`
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: avatar;

  border-radius: var(--wai-main-border-radius);
  background-color: var(--color-white);
`;

export const AvatarContent = styled.div`
  position: relative;

  input {
    display: none;
  }

  label {
    display: flex;
    position: absolute;

    right: 8px;
    bottom: 5px;

    width: 40px;
    height: 40px;

    cursor: pointer;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: var(--color-favorite);
  }
`;

export const FullName = styled.div`
  grid-area: full_name;
`;

export const Birthdate = styled.div`
  grid-area: birthdate;
`;

export const AvaliationContainer = styled.div`
  width: 100%;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: var(--wai-main-border-radius);
  background-color: var(--color-white);

  span {
    display: block;

    font-size: 16px;
    color: var(--color-teen-grey);
  }
`;

export const Email = styled.div`
  grid-area: email;
`;

export const Phone = styled.div`
  grid-area: phone;
`;

export const Document = styled.div`
  grid-area: document;
`;

export const GenerealRegister = styled.div`
  grid-area: general_register;
`;
