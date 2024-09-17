import { forwardRef, Ref, useCallback } from 'react';

import type { ModalHandles } from '@/screen/components/forward/Modal';
import { Input } from '@/screen/components/ui/Input';
import { SubmitButton } from '@/screen/components/ui/SubmitButton';

import { Container, Form } from './styles';

export const DocumentRegisterModal = forwardRef(
  (_: any, ref: Ref<ModalHandles>): JSX.Element => {
    const handleSubmit = useCallback(() => {
      //
    }, []);

    return (
      <Container ref={ref} title="Cadastro de certidão">
        <Form onSubmit={handleSubmit}>
          <Input name="title" label="Título" placeholder="Título" />

          <SubmitButton type="submit">Salvar</SubmitButton>
        </Form>
      </Container>
    );
  },
);

DocumentRegisterModal.displayName = 'DocumentRegisterModal';
