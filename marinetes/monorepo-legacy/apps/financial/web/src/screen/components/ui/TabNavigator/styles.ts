import styled from '@emotion/styled';

interface MenuProps {
  height?: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-gap: 20px;
  grid-template-columns: 280px auto;
`;

export const Menu = styled.div<MenuProps>`
  height: ${({ height }) => height ?? '360px'};

  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  background-color: var(--color-white);
`;

export const Option = styled.button`
  width: 100%;
  height: 60px;
  padding: 25px;

  display: flex;
  align-items: center;
  gap: 20px;

  font-size: 18px;
  font-weight: normal;
  color: var(--color-favorite);

  &:hover,
  &.active {
    color: var(--color-white);

    background-color: var(--color-favorite);

    .icon svg {
      color: white;
    }
  }

  .icon svg {
    color: var(--color-favorite);
  }
`;

export const Tab = styled.div``;
