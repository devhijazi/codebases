import { useCallback, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '@/modules/services/api';
import { WizardDataContext } from '@/resources/contexts/WizardData';
import { CEPManager } from '@/resources/managers/CEPManager';
import { diaristAddressCreateSchema } from '@/resources/schemas/diarist/create';
import { FormHandles } from '@/screen/components/forward/Form';
import { WizardContext } from '@/screen/components/forward/Wizard';
import { Input } from '@/screen/components/ui/Input';

import {
  Container,
  Form,
  Cep,
  Street,
  Number,
  Neighborhood,
  State,
  City,
} from './styles';

export const Address = (): JSX.Element => {
  const { push } = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { data: personalData } = useContext(WizardDataContext);
  const { addListener, removeListener } = useContext(WizardContext);

  const handleNext = useCallback(() => {
    formRef.current?.safeSubmit();
  }, []);

  const handleSubmit = useCallback(async () => {
    const addressData = formRef.current?.getData() ?? {};

    try {
      const { data } = await api.post('/diarists', {
        ...personalData,
        address: addressData,
      });

      push(`/diarists/${data.id}`);
    } catch {
      toast.error('Ocorreu um erro!');
    }
  }, [personalData, push]);

  useEffect(() => {
    addListener('next', handleNext);

    return () => {
      removeListener('next', handleNext);
    };
  }, [addListener, removeListener, handleNext]);

  return (
    <Container>
      <Form
        ref={formRef}
        schema={diaristAddressCreateSchema}
        onSubmit={handleSubmit}
      >
        <CEPManager>
          <Cep>
            <Input name="zip_code" label="CEP" placeholder="12345-678" />
          </Cep>

          <Street>
            <Input
              name="street"
              label="Rua"
              placeholder="Rua Martin Rodrigues"
            />
          </Street>

          <Number>
            <Input name="number" label="Número" placeholder="000" />
          </Number>

          <Neighborhood>
            <Input name="neighborhood" label="Bairro" placeholder="Centro" />
          </Neighborhood>

          <State>
            <Input name="state" label="Estado" placeholder="SP" />
          </State>

          <City>
            <Input name="city" label="Cidade" placeholder="Jundiaí" />
          </City>
        </CEPManager>
      </Form>
    </Container>
  );
};
