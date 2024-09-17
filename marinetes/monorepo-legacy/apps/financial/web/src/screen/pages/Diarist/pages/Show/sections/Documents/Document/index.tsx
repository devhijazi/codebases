import { AiOutlineEye } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

import { Container, Info, Options, ViewButton, DeleteButton } from './styles';

export const Document = (): JSX.Element => {
  return (
    <Container>
      <Info>
        <span>Certidão saúde</span>
        <p>certidao.pdf</p>
      </Info>

      <Options>
        <ViewButton>
          <AiOutlineEye size="25px" />
        </ViewButton>

        <DeleteButton>
          <BiTrash size="25px" />
        </DeleteButton>
      </Options>
    </Container>
  );
};
