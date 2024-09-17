import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: white;
  border-radius: 30px;
  display: grid;
  grid-template-rows: 100px 400px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    p {
      font-size: 20px;
      color: var(--color-favorite);
    }
  }

  section {
    /* overflow-y: auto; */

    display: flex;
    align-items: center;
    justify-content: center;
    .warn {
      p {
        color: var(--color-grey);
      }
    }

    &::-webkit-scrollbar {
      width: 20px;
    }

    &::-webkit-scrollbar-track {
      background: #dcdcdc;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-favorite);
    }
  }
`;

export const Input = styled.input`
  width: 350px;
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
