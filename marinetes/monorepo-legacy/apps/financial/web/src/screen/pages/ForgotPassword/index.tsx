import { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

import { api } from '@/modules/services/api';
import { SubmitButton } from '@/screen/components/ui/SubmitButton';
import { Toast } from '@/screen/components/ui/Toast';
import { apply } from '@resources/cases/apply';
import { NotLogged } from '@resources/cases/NotLogged';
import { Input } from '@screen/components/ui/Input';

import { Container, Content, Form } from './styles';

interface HandleSubmitProps {
  email: string;
}

export const ForgotPassword = apply(
  (): JSX.Element => {
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async ({
      email,
    }: HandleSubmitProps): Promise<void> => {
      setDisabled(true);
      try {
        await api.post('/forgot-password/create', { email });

        Toast({ message: 'E-mail enviado com sucesso!' });

        history.push('/');
      } catch (error) {
        Toast({
          type: 'error',
          message: 'Houve um erro, tente novamente mais tarde!',
        });
      } finally {
        setDisabled(false);
      }
    };

    return (
      <Container>
        <Content>
          <Form onSubmit={handleSubmit}>
            <h3>
              Insira seu e-mail para fazer <br /> a recuperação de senha!
            </h3>

            <Input
              icon={HiOutlineMail}
              name="email"
              placeholder="Insira o seu e-mail"
            />

            <SubmitButton type="submit" disabled={disabled}>
              Enviar e-mail
            </SubmitButton>
          </Form>
        </Content>
      </Container>
    );
  },
  {
    cases: [NotLogged],
  },
);
