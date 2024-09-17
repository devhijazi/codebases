import type { ScheduleDocument } from '@marinetes/types/dtos/financial/api';

import { Container, Row } from './styles';

interface ServiceTableRowProps {
  service: ScheduleDocument;
}

export const ServiceTableRow = ({
  service: { date, status },
}: ServiceTableRowProps): JSX.Element => {
  return (
    <Container>
      <Row>{date}</Row>
      <Row>{status}</Row>
    </Container>
  );
};
