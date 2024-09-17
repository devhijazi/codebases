import styled from '@emotion/styled';

import { Button } from '@/screen/components/ui/Button';

export const Container = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  background-color: var(--color-white);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    font-size: 14px;
    text-decoration: underline;

    color: var(--color-grey);
  }
`;

export const Options = styled.div`
  display: flex;
  gap: 10px;
`;

export const ViewButton = styled(Button)`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: var(--color-light-favorite);
`;

export const DeleteButton = styled(Button)`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: var(--color-error);
`;
