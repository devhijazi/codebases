import type { DiaristPartialDocument } from '@marinetes/types/dtos/financial/api';
import { useCallback, useMemo } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container, Row, RowContent, Label, IconButton } from './styles';

interface DiaristTableRowProps {
  diarist: DiaristPartialDocument;
}

export const DiaristTableRow = ({
  diarist: { document, id, full_name, email, status },
}: DiaristTableRowProps): JSX.Element => {
  const { push } = useHistory();

  const documentMasked = useMemo(() => {
    let i = 0;

    const pattern = '###.###.###-##';
    const padded = pattern.replace(/#/g, () => document[i++]); // eslint-disable-line no-plusplus

    return padded;
  }, [document]);

  const redirectToDiaristPage = useCallback(
    (diaristId: string) => {
      push(`/diarists/${diaristId}`);
    },
    [push],
  );

  const activated = status.type === 'active';

  return (
    <Container>
      <Row>{full_name}</Row>
      <Row>{documentMasked}</Row>
      <Row>{email}</Row>
      <Row>
        <RowContent>
          <Label status={activated}>{status.type}</Label>
        </RowContent>
      </Row>
      <Row>
        <RowContent>
          <IconButton onClick={() => redirectToDiaristPage(id)}>
            <FiChevronRight size="40px" color="var(--color-white)" />
          </IconButton>
        </RowContent>
      </Row>
    </Container>
  );
};
