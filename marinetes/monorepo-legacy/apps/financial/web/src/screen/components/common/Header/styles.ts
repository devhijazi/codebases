import styled from '@emotion/styled';

export const Container = styled.header`
  --header-height: 6rem;

  padding-top: 0;
  padding-bottom: 0;

  width: 100%;
  height: var(--header-height);

  background: var(--color-favorite);

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 45px;
    height: auto;
  }
`;

export const Button = styled.button`
  display: flex;

  svg {
    width: 35px;
    height: 35px;
  }
`;

export const Group = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;

export const ProfileButton = styled.button`
  width: 50px;
  height: 50px;

  border: none;
  border-radius: 50%;

  background: var(--color-favorite);

  img {
    width: 20px !important;
    height: 20px !important;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;

  align-items: center;
  justify-content: space-between;

  color: var(--color-white);

  img {
    --size: 3rem;

    width: var(--size);
    height: var(--size);

    object-fit: cover;
    border-radius: 50%;
  }
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  max-width: 24rem;

  right: 0;
  top: calc(var(--header-height) + 0.4rem);

  margin-right: var(--box-spacing);
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

  a {
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

    &:hover {
      padding: 1.2rem 0.6rem;
      background-color: rgba(var(--color-white-rgb), 0.15);
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
