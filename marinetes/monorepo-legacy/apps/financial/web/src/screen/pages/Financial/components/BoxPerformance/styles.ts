import styled from '@emotion/styled';

export const Box = styled.article`
  width: 100%;
  max-width: 300px;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  background: #ffffff;

  display: grid;
  grid-template-rows: 20% auto 85px;
`;

export const BoxHeader = styled.div`
  padding: 15px;

  display: flex;
  justify-content: space-between;

  p {
    font-size: 1.5rem;
    color: #7fbd3b;
  }
`;

export const BoxMain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const BoxFooter = styled.div`
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 2px solid #f0f0f0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #7fbd3b;

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1.2rem;
      color: #bbbbbb;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3rem;
    color: #7fbd3b;
  }
`;
