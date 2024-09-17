import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  max-width: 500px;
  margin: 0 auto;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 20px;
  box-shadow: var(--box-shadow);
  background: var(--color-white-grey);
`;

export const Header = styled.header`
  width: 100%;
  padding: 30px;
  position: sticky;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2rem;
    font-weight: 400;
    color: var(--color-white);
  }

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: var(--color-favorite);
`;

export const CloseButton = styled.button`
  padding: 5px;
  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;

  border-radius: 4px;
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
  overflow-x: hidden;

  flex-grow: 1;
`;
