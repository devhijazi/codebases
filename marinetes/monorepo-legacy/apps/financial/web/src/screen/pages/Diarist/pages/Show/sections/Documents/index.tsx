import { /* useCallback, */ useRef } from 'react';
// import { AiOutlineUpload } from 'react-icons/ai';

import type { ModalHandles } from '@/screen/components/forward/Modal/types';

// import { Document } from './Document';
import { DocumentRegisterModal } from './DocumentRegisterModal';
import {
  Container,
  /* Header, Input, AddButton, */
  Main,
} from './styles';

export const Documents = (): JSX.Element => {
  const documentRegisterModalRef = useRef<ModalHandles>(null);

  // const openDocumentRegisterModal = useCallback(() => {
  //   documentRegisterModalRef.current?.open();
  // }, []);

  return (
    <>
      <DocumentRegisterModal ref={documentRegisterModalRef} />

      <Container>
        {/* <Header>
          <Input placeholder="Pesquisar..." />

          <AddButton
            onClick={openDocumentRegisterModal}
          >
            Adicionar <AiOutlineUpload size={30} />
          </AddButton>
        </Header> */}

        <Main>
          <div className="warn">
            <p>
              Serviço temporariamente indisponível ou ainda não possui uma
              implementação estável, aguarde os desenvolvedores.
            </p>
          </div>

          {/* <Document /> */}
        </Main>
      </Container>
    </>
  );
};
