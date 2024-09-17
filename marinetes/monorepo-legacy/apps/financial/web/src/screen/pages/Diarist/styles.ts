import styled from '@emotion/styled';

import { Button } from '@/screen/components/ui/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Content = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  padding: 5px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const RegisterButton = styled(Button)`
  max-width: 170px;
`;

export const Input = styled.input`
  width: 450px;
  height: 60px;
  padding: 0 25px 0 50px;

  border-radius: 10px;
  font-size: 17px;

  background: #f5f5f5 url('/assets/search.svg') no-repeat;
  background-position: 12.5px 50%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Message = styled.div`
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: var(--color-strong-grey);
`;

export const Main = styled.div`
  height: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 42px;

  display: flex;
  justify-content: flex-end;
`;
