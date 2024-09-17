import { useWizard } from '@hitechline/react-wizard';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { WizardDataContext } from '@/resources/contexts/WizardData';
import { diaristCreateSchema } from '@/resources/schemas/diarist/create';
import { FormHandles } from '@/screen/components/forward/Form';
import { WizardContext } from '@/screen/components/forward/Wizard';
import { Input } from '@/screen/components/ui/Input';

import {
  Container,
  Form,
  FullName,
  Email,
  Document,
  GeneralRegister,
  Phone,
  Birthdate,
} from './styles';

export const PersonalData = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const { next } = useWizard();

  const { setData, data: initialData } = useContext(WizardDataContext);
  const { addListener, removeListener } = useContext(WizardContext);

  const handleNext = useCallback(() => {
    formRef.current?.safeSubmit();
  }, []);

  const handleSubmit = useCallback(async () => {
    const data = formRef.current?.getData() ?? {};

    next();

    setData(data);
  }, [next, setData]);

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
        initialData={initialData}
        schema={diaristCreateSchema}
        onSubmit={handleSubmit}
      >
        <FullName>
          <Input
            name="full_name"
            label="Nome"
            placeholder="Marinete Clean House"
          />
        </FullName>

        <Email>
          <Input
            name="email"
            label="E-mail"
            placeholder="marinetes@hitechline.com"
          />
        </Email>

        <Document>
          <Input
            name="document"
            label="CPF"
            mask="000.000.000-00"
            placeholder="123.456.789.01"
          />
        </Document>

        <GeneralRegister>
          <Input name="general_register" label="RG" placeholder="1.234.567" />
        </GeneralRegister>

        <Phone>
          <Input
            name="phone"
            label="Telefone"
            mask="(00) 0 0000-0000" // eslint-disable-line no-nonoctal-decimal-escape
            placeholder="(69) 9 0000-0000"
          />
        </Phone>

        <Birthdate>
          <Input name="birthdate" type="date" label="Data de nascimento" />
        </Birthdate>
      </Form>
    </Container>
  );
};
