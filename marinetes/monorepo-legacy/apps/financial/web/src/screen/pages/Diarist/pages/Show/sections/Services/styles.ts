import styled from '@emotion/styled';

import { Button } from '@/screen/components/ui/Button';

export const Container = styled.div`
  display: flex;
  gap: 10px;
`;

export const Icon = styled(Button)`
  width: 120px;
  height: 120px;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border-radius: 10px;
  background-color: var(--color-white);

  svg path {
    width: 50px;
    height: 50px;

    fill: var(--color-light-favorite);
  }

  span {
    display: block;

    font-size: 14px;
    font-weight: normal;
    color: var(--color-light-favorite);
  }

  &.selected {
    background-color: var(--color-light-favorite);

    svg path {
      fill: var(--color-white);
    }

    span {
      color: var(--color-white);
    }
  }
`;
