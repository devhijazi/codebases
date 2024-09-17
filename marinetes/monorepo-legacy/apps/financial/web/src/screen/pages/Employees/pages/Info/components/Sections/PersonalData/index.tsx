import { useCallback } from 'react';

import { Avatar } from '@/screen/components/ui/Avatar';
import { Input } from '@/screen/components/ui/Input';

import { Container, Form, Group, AvatarContainer } from './styles';

export const PersonalData = (): JSX.Element => {
  const handleSubmit = useCallback(() => {
    //
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Group>
          <AvatarContainer>
            <Avatar
              name="izakdvlpr"
              size="180"
              color="var(--color-favorite)"
              round
            />
          </AvatarContainer>

          <Input name="full_name" label="Nome" placeholder="Seu Nome" />
        </Group>

        <Group>
          <Input
            name="email"
            label="E-mail"
            placeholder="example@marinetes.com.br"
          />
        </Group>
      </Form>
    </Container>
  );
};
