import styled from '@emotion/styled';

import { Form as FormDefault } from '@/screen/components/forward/Form';

export const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
`;

export const Form = styled(FormDefault)`
  width: 100%;

  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'full_name full_name email email'
    'document general_register phone birthdate';
`;

export const FullName = styled.div`
  grid-area: full_name;
`;

export const Email = styled.div`
  grid-area: email;
`;

export const Document = styled.div`
  grid-area: document;
`;

export const GeneralRegister = styled.div`
  grid-area: general_register;
`;

export const Phone = styled.div`
  grid-area: phone;
`;

export const Birthdate = styled.div`
  grid-area: birthdate;
`;
