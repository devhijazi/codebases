import { mergeRefs } from '@hitechline/reactools';
import type { PropsWithChildren } from '@marinetes/types/modules/react';
import { useRef, forwardRef, useCallback, Ref, HTMLAttributes } from 'react';
import { FiX } from 'react-icons/fi';

import { Modal, ModalHandles } from '@screen/components/forward/Modal';

import { Container, Header, CloseButton, Content } from './styles';

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
}

export const ModalWithHeader = forwardRef(
  (
    { title, children, ...props }: PropsWithChildren<Props>,
    ref: Ref<ModalHandles>,
  ): JSX.Element => {
    const modalRef = useRef<ModalHandles>(null);

    const close = useCallback(() => {
      modalRef.current?.close();
    }, [modalRef]);

    return (
      <Modal ref={mergeRefs([ref, modalRef])}>
        <Container {...props}>
          <Header>
            <h1>{title}</h1>

            <CloseButton type="button" onClick={close}>
              <FiX size="2.5rem" color="var(--color-white)" />
            </CloseButton>
          </Header>

          <Content className="scrollbar-custom">{children}</Content>
        </Container>
      </Modal>
    );
  },
);

ModalWithHeader.displayName = 'ModalWithHeader';
