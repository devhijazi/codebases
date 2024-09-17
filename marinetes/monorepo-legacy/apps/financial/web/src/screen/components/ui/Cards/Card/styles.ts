import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;

  max-width: 280px;
  height: 200px;

  background: white;

  border-radius: 20px;
  padding: 20px;
`;

export const Header = styled.header`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;

  > h1 {
    font-weight: normal;
    font-size: 1rem;

    color: var(--color-teen-grey);
  }
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 15px;

  & + h1 {
    font-weight: bold;
    font-size: 40px;
    color: var(--color-favorite);
  }

  span {
    font-weight: normal;
    font-size: 1.25rem;

    color: #bbbbbb;
  }

  span > .ant-statistic-content-value-int {
    font-size: 5rem;
    color: var(--color-favorite);
  }
  .ant-statistic-content-suffix {
    font-size: 2.5rem;
  }
`;

export const Hr = styled.hr`
  margin: 10px 0;
  border: 1px solid #f0f0f0;
`;

export const Footer = styled.footer`
  width: 100%;

  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    span {
      font-size: 15px;
      font-weight: bold;

      color: var(--color-favorite);
    }

    p {
      font-weight: normal;
      color: #bbbbbb;

      font-size: 12px;
      margin-left: 14px;
    }
  }
`;
