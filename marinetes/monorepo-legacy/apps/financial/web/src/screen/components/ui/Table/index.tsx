import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { Container, Thead, Tbody } from './styles';

type TableBody = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

interface TableProps {
  headers: (ReactNode | string)[];
  rows: TableBody[];
}

export const Table = ({ headers, rows }: TableProps): JSX.Element => {
  return (
    <Container>
      <Thead>
        <tr>
          {headers.map((header, index) => {
            const key = index + 1;

            return <th key={key}>{header}</th>;
          })}
        </tr>
      </Thead>
      <Tbody>{rows}</Tbody>
    </Container>
  );
};
