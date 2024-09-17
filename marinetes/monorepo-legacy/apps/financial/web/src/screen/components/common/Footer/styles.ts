import styled from '@emotion/styled';

export const Container = styled.footer`
  width: 100%;
  display: grid;

  grid-template-rows: 50px auto;
  padding-top: 5px;
  background: var(--color-favorite);

  div#main {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    section#left {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  div#footer {
    width: 100%;
    background: var(--color-light-favorite);
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      color: white;
      font-size: 11px;
    }
  }
`;
