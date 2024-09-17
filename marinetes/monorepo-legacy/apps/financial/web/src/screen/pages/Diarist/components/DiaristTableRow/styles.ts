import styled from '@emotion/styled';

interface StatusLabelProps {
  status: boolean;
}

export const Container = styled.tr``;

export const Row = styled.td``;

export const RowContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const Label = styled.span<StatusLabelProps>`
  max-width: 150px;
  height: 30px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: var(--color-white);

  border-radius: 30px;
  background-color: ${({ status }) =>
    status ? 'var(--color-light-favorite)' : 'var(--color-error)'};
`;

export const IconButton = styled.button`
  width: 35px;
  height: 35px;

  border-radius: 10px;
  background: var(--color-light-favorite);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
  }
`;
