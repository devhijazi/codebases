import styled from '@emotion/styled';

import { Form as FormDefault } from '@/screen/components/forward/Form';
import { ModalWithHeader } from '@/screen/components/modals/ModalWithHeader';

export const Container = styled(ModalWithHeader)`
  max-width: 500px;
  max-height: 500px;

  position: relative;
`;

export const Form = styled(FormDefault)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
