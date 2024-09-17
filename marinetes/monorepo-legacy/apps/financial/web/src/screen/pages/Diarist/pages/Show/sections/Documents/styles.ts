import styled from '@emotion/styled';

import { Button } from '@/screen/components/ui/Button';

export const Container = styled.div`
  .warn {
    p {
      color: var(--color-grey);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const Input = styled.input`
  width: 450px;
  height: 60px;
  padding: 0 25px 0 50px;

  border-radius: 10px;
  font-size: 17px;

  background: var(--color-white) url('/assets/search.svg') no-repeat;
  background-position: 12.5px 50%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const AddButton = styled(Button)`
  max-width: 170px;
`;

export const Main = styled.div`
  height: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
