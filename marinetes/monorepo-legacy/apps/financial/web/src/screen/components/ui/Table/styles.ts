import styled from '@emotion/styled';

export const Container = styled.table`
  width: 100%;
  margin-top: 20px;

  border-collapse: collapse;
`;

export const Thead = styled.thead`
  th {
    padding: 15px;

    font-weight: normal;
    color: white;
    text-align: center;

    border-right: 1px solid #dbdbdb;
    background: #7fbd3b;
  }
`;

export const Tbody = styled.tbody`
  tr {
    background: var(--color-white);

    &:nth-child(odd) {
      background: var(--color-white-grey);
    }
  }

  td {
    width: 295px;
    padding: 15px;

    text-align: center;

    border-right: 1px solid #dbdbdb;

    &:last-child {
      border: 0;
    }
  }
`;
