import { useContext } from 'react';

import { CEPManager } from '@/resources/managers/CEPManager';
import { diaristAddressUpdateSchema } from '@/resources/schemas/diarist/update';
import { SubmitButton } from '@/screen/components/ui/SubmitButton';
import { Input } from '@screen/components/ui/Input';

import { PageContext } from '../../PageContext';
import { Container, Content } from './styles';

export const Address = (): JSX.Element => {
  const { diarist, handleAddressEdit } = useContext(PageContext);

  return (
    <Container
      initialData={diarist.address ?? {}}
      schema={diaristAddressUpdateSchema}
      onSubmit={handleAddressEdit}
    >
      <Content>
        <CEPManager>
          <Input name="zip_code" label="CEP" placeholder="12345-678" />

          <Input name="street" label="Rua" placeholder="Rua Martin Rodrigues" />

          <Input name="number" label="Número" placeholder="000" />

          <Input name="neighborhood" label="Bairro" placeholder="Centro" />

          <Input name="state" label="Estado" placeholder="SP" />

          <Input name="city" label="Cidade" placeholder="Jundiaí" />
        </CEPManager>
      </Content>

      <SubmitButton type="submit">Salvar</SubmitButton>
    </Container>
  );
};
