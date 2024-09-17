import type { UserDocument } from '@marinetes/types/dtos/financial/api';
import { FiChevronRight } from 'react-icons/fi';

import { Container, Row, RowContent, IconButton } from './styles';

interface CustomerTableRowProps {
  customer: UserDocument;
}

export const CustomerTableRow = ({
  customer: { full_name, email, phone, document },
}: CustomerTableRowProps): JSX.Element => {
  return (
    <Container>
      <Row>{full_name}</Row>
      <Row>{email}</Row>
      <Row>{phone}</Row>
      <Row>{document}</Row>
      <Row>
        <RowContent>
          <IconButton>
            <FiChevronRight size="40px" color="var(--color-white)" />
          </IconButton>
        </RowContent>
      </Row>
    </Container>
  );
};
