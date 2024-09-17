import styled from '@emotion/styled';

import { Button } from '../Button';

export const Container = styled.div``;

export const Content = styled(Button)`
  max-width: 40px;
  height: 40px;
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  max-width: 20rem;

  left: 40px;
  margin-top: 10px;

  margin-left: var(--box-spacing);
`;

export const Dropdown = styled.section`
  color: var(--color-white);

  width: 100%;
  max-height: 24rem;

  padding: 1.4rem;
  display: flex;

  overflow-y: auto;

  flex-direction: column;
  gap: 0.4rem 0;

  border-radius: 1rem;
  box-shadow: var(--main-bottom-box-shadow);
  background-color: var(--color-favorite);

  button {
    width: 100%;

    display: flex;
    align-items: center;

    border-radius: 0.8rem;
    gap: 0.8rem;
    padding: 1.2rem 0;

    transition: padding 200ms;

    svg {
      width: 2rem;
      height: auto;
    }
  }

  &::-webkit-scrollbar {
    width: 1.6rem;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-white-rgb), 0.3);
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border-radius: 999px;

    border: 0.4rem solid transparent;
    background-clip: padding-box;
  }
`;
