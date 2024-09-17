import styled from '@emotion/styled';

export const Container = styled.tr``;

export const Row = styled.td``;

export const RowContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  width: 30px;
  height: 30px;

  border-radius: 10px;
  background: var(--color-light-favorite);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
  }
`;
