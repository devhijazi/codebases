import styled from '@emotion/styled';

import { Form as FormDefault } from '@/screen/components/forward/Form';

export const Container = styled.div``;

export const Form = styled(FormDefault)`
  display: flex;
  gap: 20px;
`;

export const Group = styled.section`
  max-width: 100%;
  width: 400px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AvatarContainer = styled.div`
  padding: 17px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--wai-main-border-radius);
  background-color: var(--color-white);
`;
