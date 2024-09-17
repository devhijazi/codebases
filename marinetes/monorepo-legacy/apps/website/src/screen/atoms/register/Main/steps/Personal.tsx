import { useWizard } from '@hitechline/react-wizard';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { WizardDataContext } from '@/engine/contexts/WizardData';
import { diaristPreCreateSchema } from '@/modules/schemas/diarist/pre-create';
import { api } from '@/modules/services/api';
import { Form, FormHandles } from '@/screen/components/forward/Form';
import { WizardContext } from '@/screen/components/forward/Wizard';
import { Input } from '@/screen/components/ui/Input';

const DATE_REGEX = /([0-9]{2})([0-9]{2})([0-9]{4})/;

export const RegisterPersonal = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const { next } = useWizard();

  const { setData, data: initialData } = useContext(WizardDataContext);
  const { updateLoading, addListener, removeListener } =
    useContext(WizardContext);

  const handleNext = useCallback(() => {
    formRef.current?.safeSubmit();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const data = formRef.current?.getData() ?? {};

    try {
      const birthdateArray = DATE_REGEX.exec(data.birthdate);

      if (!birthdateArray) {
        throw new Error();
      }

      const [_, day, month, year] = birthdateArray;
      const birthdate = `${year}-${month}-${day}`;

      updateLoading(true);

      await api.post('/diarists/pre-register', {
        ...data,
        birthdate,
      });

      updateLoading(false);

      next();

      setData(data);
    } catch (err) {
      updateLoading(false);

      toast.error('Ocorreu um erro!');
    }
  };

  useEffect(() => {
    addListener('next', handleNext);

    return () => {
      removeListener('next', handleNext);
    };
  }, [addListener, removeListener, handleNext]);

  return (
    <div className="bowl-content mt-10 flex flex-col gap-10">
      <h4 className="text-[22px] text-black font-normal">
        Informações pessoais
      </h4>

      <Form
        ref={formRef}
        className="flex flex-col md:grid md:grid-cols-2 gap-4"
        initialData={initialData}
        schema={diaristPreCreateSchema}
        onSubmit={handleSubmit}
      >
        <Input
          name="full_name"
          label="Nome"
          placeholder="Evandro Marques Ribeiro"
        />

        <Input
          name="email"
          label="E-mail"
          placeholder="evandromarques@gmail.com"
        />

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <Input
            name="document"
            label="CPF"
            mask="000.000.000-00"
            placeholder="123.456.789.01"
          />

          <Input name="general_register" label="RG" placeholder="1234567" />
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <Input
            name="phone"
            label="Telefone"
            mask="(00) 0 0000-0000"
            placeholder="(12) 12323-2323"
          />

          <Input
            name="birthdate"
            label="Data de nascimento"
            mask="00/00/0000"
            placeholder="00/00/0000"
          />
        </div>
      </Form>
    </div>
  );
};
