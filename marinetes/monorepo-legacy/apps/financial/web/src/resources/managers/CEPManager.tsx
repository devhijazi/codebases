import type { PropsWithChildren } from '@marinetes/types/modules/react';
import { useContext, useEffect, useCallback } from 'react';

import { getCep } from '@modules/services/cep';
import { useUI } from '@resources/hooks/useUI';
import { FormContext } from '@screen/components/forward/Form';

interface Props extends PropsWithChildren {
  scoped?: boolean;
}

export const CEPManager = ({
  children,
  scoped = false,
}: Props): JSX.Element => {
  const { setLoading } = useUI();
  const { getUnformRef } = useContext(FormContext);

  const parseName = useCallback(
    (name: string): string => {
      if (scoped) {
        return `address.${name}`;
      }

      return name;
    },
    [scoped],
  );

  const getInput = useCallback(
    (inputName: string): HTMLInputElement | null => {
      const unformRef = getUnformRef();

      const input = unformRef.current?.getFieldRef(inputName);

      if (!input) {
        throw new Error(`Nenhum input com o nome "${inputName}" encontrado.`);
      }

      return input.current;
    },
    [getUnformRef],
  );

  const handleChange = useCallback(async () => {
    const unformRef = getUnformRef();

    if (!unformRef || !unformRef.current) {
      throw new Error('Nenhum formulário foi provido.');
    }

    const cepValue = unformRef.current.getFieldValue(parseName('zip_code'));

    if (!cepValue || cepValue.length < 8) {
      return;
    }

    getInput(parseName('zip_code'))?.blur();

    setLoading(true);

    const cep = await getCep(cepValue);

    if (!cep) {
      setLoading(false);

      return;
    }

    const inputs: [string, string?, boolean?][] = [
      [parseName('city'), cep.city],
      [parseName('state'), cep.state],
      [parseName('zip_code'), cep.cep, true],
      [parseName('street'), cep.street],
      [parseName('neighborhood'), cep.neighborhood],
    ];

    inputs.forEach(([inputName, inputValue, ignoreDisable]) => {
      const input = getInput(inputName);

      if (input && inputValue) {
        input.value = inputValue;

        unformRef.current?.setFieldError(inputName, '');
        unformRef.current?.setFieldValue(inputName, inputValue);

        if (!ignoreDisable) {
          input.setAttribute('disabled', 'true');
        }
      }
    });

    setLoading(false);
  }, [parseName, getUnformRef, getInput, setLoading]);

  useEffect(() => {
    const CEPInput = getInput(parseName('zip_code'));

    CEPInput?.addEventListener('input', handleChange);

    return () => {
      CEPInput?.removeEventListener('input', handleChange);
    };
  }, [parseName, getInput, handleChange]);

  return <>{children}</>;
};
