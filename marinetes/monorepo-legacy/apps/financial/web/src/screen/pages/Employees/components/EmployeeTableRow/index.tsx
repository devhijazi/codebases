import type { EmployeeDocument } from '@marinetes/types/dtos/financial/api';
import { useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container, Row, RowContent, IconButton } from './styles';

interface EmployeeTableRowProps {
  employee: EmployeeDocument;
}

export const EmployeeTableRow = ({
  employee: { full_name, email, id },
}: EmployeeTableRowProps): JSX.Element => {
  const { push } = useHistory();

  const redirectToEmployeeInfo = useCallback(
    (employeeId: string) => {
      push(`/employees/${employeeId}/info`);
    },
    [push],
  );

  return (
    <Container>
      <Row>{full_name}</Row>
      <Row>{email}</Row>
      <Row>
        <RowContent />
      </Row>
      <Row>
        <RowContent>
          <IconButton onClick={() => redirectToEmployeeInfo(id)}>
            <FiChevronRight size="40px" color="var(--color-white)" />
          </IconButton>
        </RowContent>
      </Row>
    </Container>
  );
};
