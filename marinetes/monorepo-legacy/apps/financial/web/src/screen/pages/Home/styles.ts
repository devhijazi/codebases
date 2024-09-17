import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  flex-grow: 1;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  justify-content: center;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;

  flex-flow: row wrap;
  align-items: center;

  justify-content: center;

  padding: 10px;
  gap: 46px;
  margin-bottom: 15px;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

export const DivInfo = styled.div`
  width: 100%;
  display: flex;

  align-items: flex-start;
  justify-content: center;

  padding: 10px;
  gap: 20px;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

export const BoxSearch = styled.div`
  width: 100%;

  overflow: hidden;

  border-radius: 15px;
  margin: 0 10px;

  background: white;
  border: 1px solid #efefef;

  display: grid;
  grid-template-rows: 100px 320px;

  header {
    padding: 15px;
    display: flex;

    align-items: center;
    justify-content: space-between;

    p {
      font-size: 1.8rem;
      color: var(--color-favorite);
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    .warn {
      p {
        color: var(--color-grey);
      }
    }

    /* overflow-y: auto; */

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #dcdcdc;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-favorite);
    }
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

export const Button = styled.button`
  width: 150px;
  height: 40px;

  background: var(--color-favorite);
  border-radius: 5px;

  font-weight: bold;
  color: white;
  font-size: 1.5rem;

  &:hover {
    background: var(--color-favorite);
    transition: background 0.7s;
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 500px;
  height: 40px;

  padding: 10px 50px;

  border-radius: 10px;
  font-size: 1.5rem;

  background: #f5f5f5 url('/assets/search.svg') no-repeat;
  background-position: 12.5px 50%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
