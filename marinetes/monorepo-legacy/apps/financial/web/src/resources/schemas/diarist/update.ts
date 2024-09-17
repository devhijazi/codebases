import type { DiaristUpdateData } from '@marinetes/types/dtos/financial/api';
import type { DiaristAddress, LeanModel } from '@marinetes/types/model';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string, number } from 'yup';

type DiaristUpdateSchemaType = YupObjectSchemaType<DiaristUpdateData>;

type DiaristAddressUpdateSchemaType = YupObjectSchemaType<
  LeanModel<DiaristAddress>
>;

export const diaristUpdateSchema = object<DiaristUpdateSchemaType>({
  full_name: string()
    .required('Insira seu nome.')
    .trim()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      'Insira caracteres válidos.',
    )
    .matches(
      /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
      'Insira seu nome completo.',
    ),
  birthdate: string().required('Insira a data de nascimento.'),
  document: string().required('Insira seu CPF.'),
  phone: string().required('Insira seu telefone.'),
  general_register: string().required('Insira seu RG.'),
});

export const diaristAddressUpdateSchema =
  object<DiaristAddressUpdateSchemaType>({
    street: string().required('Informe a rua.'),
    state: string().default('Mato Grosso do Sul'),
    number: number()
      .required('Informe o número.')
      .transform((currentValue, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined;
        }

        return currentValue;
      }),
    neighborhood: string().required('Informe o bairro.'),
    zip_code: string().required('Informe o CEP do local.'),
    city: string().required('Informe a cidade.'),
  });
