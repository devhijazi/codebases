import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
  column-gap: 30px;

  align-items: flex-end;
  justify-content: center;
  align-content: space-between;
`;
