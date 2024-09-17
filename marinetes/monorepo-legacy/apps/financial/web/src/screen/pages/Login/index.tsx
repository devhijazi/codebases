import { SessionLoginData } from '@marinetes/types/dtos/financial/api';
import { useCallback } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { GoKey } from 'react-icons/go';
// import { Link } from 'react-router-dom';

import { SubmitButton } from '@/screen/components/ui/SubmitButton';
import { apply } from '@resources/cases/apply';
import { NotLogged } from '@resources/cases/NotLogged';
import { useAuth } from '@resources/hooks/useAuth';
import { loginSchema } from '@resources/schemas/login';
import { InputGreen } from '@screen/components/ui/Input';

import { Container, Form } from './styles';

export const Login = apply(
  (): JSX.Element => {
    const { signIn } = useAuth();

    const handleSubmit = useCallback(
      ({ email, password }: SessionLoginData) =>
        signIn({
          email,
          password,
        }),
      [signIn],
    );

    return (
      <Container>
        <Form schema={loginSchema} onSubmit={handleSubmit}>
          <h3>Login</h3>

          <InputGreen name="email" icon={BiUserCircle} placeholder="E-mail" />

          <InputGreen
            name="password"
            type="password"
            icon={GoKey}
            placeholder="Senha"
          />

          <SubmitButton type="submit">Acessar</SubmitButton>

          {/*
          <Link to="/forgot-password">
            <b>Esqueci a minha senha</b>
          </Link> */}
        </Form>
      </Container>
    );
  },
  {
    cases: [NotLogged],
  },
);
