import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  height: 220px;

  background: white;
  border-radius: 20px;

  padding: 15px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const DivData = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-between;

  align-items: flex-start;
`;

export const Title = styled.h1`
  font-weight: normal;
  font-size: 15px;

  color: var(--color-favorite);
`;

export const TotalNumber = styled.h2`
  font-weight: bold;
  font-size: 40px;

  color: var(--color-favorite);
`;

export const DivInfo = styled.div`
  width: 100%;
  max-width: 100px;

  align-items: center;

  padding: 17px 17px 0 17px;
  border-top: 1px solid #f0f0f0;

  display: flex;
  align-items: center;

  justify-content: center;
  gap: 20px;

  article {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    p {
      font-size: 12px;
      color: #bbbbbb;
      font-weight: normal;
    }

    h2 {
      font-size: 15px;
      font-weight: bold;
      color: var(--color-favorite);
    }

    .left {
      color: var(--color-grey);
    }
  }
`;

export const DivGraphic = styled.div`
  max-height: 190px;
  display: flex;

  align-items: center;
  justify-content: center;

  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
`;
