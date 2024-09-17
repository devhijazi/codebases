import styled from '@emotion/styled';

import { Button } from '@/screen/components/ui/Button';

export const Container = styled.div`
  margin: 0 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const IconButton = styled(Button)`
  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  svg {
    width: 5.6rem;
    height: auto;

    &.save {
      width: 2.6rem;
    }
  }
`;
