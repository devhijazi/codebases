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
    'cep street'
    'number neighborhood'
    'state city';
`;

export const Cep = styled.div`
  grid-area: cep;
`;

export const Street = styled.div`
  grid-area: street;
`;

export const Number = styled.div`
  grid-area: number;
`;

export const Neighborhood = styled.div`
  grid-area: neighborhood;
`;

export const State = styled.div`
  grid-area: state;
`;

export const City = styled.div`
  grid-area: city;
`;
