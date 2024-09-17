import styled from '@emotion/styled';

import { Form as FormDefault } from '@/screen/components/forward/Form';

export const Container = styled(FormDefault)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, auto);
`;

export const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;
