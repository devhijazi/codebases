import { useEffect, useState } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useHistory, useLocation } from 'react-router-dom';

import { api } from '@/modules/services/api';
import { Button } from '@/screen/components/ui/Button';
import { Toast } from '@/screen/components/ui/Toast';
import { apply } from '@resources/cases/apply';
import { NotLogged } from '@resources/cases/NotLogged';
import { Input } from '@screen/components/ui/Input';
import { DefaultLayout } from '@screen/layouts/DefaultLayout';

import { Container, Content, Form } from './styles';

interface HandleSubmitProps {
  password: string;
  password_confirm: string;
}

export const ResetPassword = apply(
  (): JSX.Element => {
    const history = useHistory();
    const location = useLocation();
    const [token, setToken] = useState('');

    useEffect(() => {
      if (location.search) {
        setToken(location.search.split('=')[1]);
      }
    }, [location.search]);

    const handleSubmit = async ({
      password,
      password_confirm,
    }: HandleSubmitProps): Promise<void> => {
      if (password !== password_confirm) {
        Toast({
          type: 'error',
          message: 'As senhas não coincidem, tente novamente mais tarde!',
        });
      } else {
        try {
          await api.post('/forgot-password/reset', {
            token,
            password,
          });

          Toast({ message: 'Senha alterada com sucesso!' });

          history.push('/');
        } catch (error) {
          Toast({
            type: 'error',
            message: 'Houve um erro, tente novamente mais tarde!',
          });
        }
      }
    };

    return (
      <Container>
        <Content>
          <Form onSubmit={handleSubmit}>
            <h3>Insira a nova senha!</h3>
            <Input
              icon={HiOutlineLockClosed}
              name="password"
              type="password"
              placeholder="Insira a senha"
            />

            <Input
              icon={HiOutlineLockClosed}
              name="password_confirm"
              type="password"
              placeholder="Repita a senha "
            />

            <Button type="submit">Concluir</Button>
          </Form>
        </Content>
      </Container>
    );
  },
  {
    layout: DefaultLayout,
    cases: [NotLogged],
  },
);
