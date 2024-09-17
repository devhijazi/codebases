import { useContext } from 'react';
import { FiCamera } from 'react-icons/fi';
// import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';

import { SubmitButton } from '@/screen/components/ui/SubmitButton';
import { diaristUpdateSchema } from '@resources/schemas/diarist/update';
import { Avatar } from '@screen/components/ui/Avatar';
import { Input } from '@screen/components/ui/Input';

import { PageContext } from '../../PageContext';
import {
  Container,
  Content,
  AvatarContainer,
  AvatarContent,
  FullName,
  Birthdate,
  Email,
  Phone,
  Document,
  GenerealRegister,
} from './styles';

export const PersonalData = (): JSX.Element => {
  const { diarist, handlePersonalDataEdit, handleAvatarEdit } =
    useContext(PageContext);

  return (
    <Container
      initialData={diarist}
      schema={diaristUpdateSchema}
      onSubmit={handlePersonalDataEdit}
    >
      <Content>
        <AvatarContainer>
          <AvatarContent>
            <Avatar
              name={diarist.full_name}
              src={diarist.avatar ?? undefined}
              size="150"
              color="var(--color-grey)"
              round
            />

            <label htmlFor="avatar">
              <FiCamera size="20px" color="var(--color-white)" />

              <input type="file" id="avatar" onChange={handleAvatarEdit} />
            </label>
          </AvatarContent>
        </AvatarContainer>

        <FullName>
          <Input name="full_name" label="Nome" placeholder="Seu Nome" />
        </FullName>

        <Birthdate>
          <Input
            name="birthdate"
            type="date"
            label="Data de nascimento"
            placeholder="dd/mm/yyyy"
          />
        </Birthdate>

        {/* <AvaliationContainer>
              <span>Avaliação</span>

              <div>
                <ImStarFull size="14px" color="var(--color-favorite)" />
                <ImStarFull size="14px" color="var(--color-favorite)" />
                <ImStarFull size="14px" color="var(--color-favorite)" />
                <ImStarHalf size="14px" color="var(--color-favorite)" />
                <ImStarEmpty size="14px" color="var(--color-favorite)" />
              </div>
            </AvaliationContainer> */}

        <Email>
          <Input
            name="email"
            label="E-mail"
            placeholder="example@marinetes.com.br"
            disabled
          />
        </Email>

        <Phone>
          <Input
            name="phone"
            label="Telefone"
            mask="(00) 0 0000-0000" // eslint-disable-line no-nonoctal-decimal-escape
            placeholder="Telefone"
          />
        </Phone>

        <Document>
          <Input
            name="document"
            label="CPF"
            mask="000.000.000-00"
            placeholder="CPF"
          />
        </Document>

        <GenerealRegister>
          <Input name="general_register" label="RG" placeholder="RG" />
        </GenerealRegister>
      </Content>

      <SubmitButton type="submit">Salvar</SubmitButton>
    </Container>
  );
};
