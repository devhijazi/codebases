import type { DiaristCreateData } from '@marinetes/types/dtos/diarist/api';
import type { YupObjectSchemaType } from '@marinetes/types/modules/yup';
import { object, string } from 'yup';

type SchemaType = YupObjectSchemaType<DiaristCreateData>;

export const diaristPreCreateSchema = object<SchemaType>({
  email: string()
    .required('Insira seu e-mail.')
    .email('Insira um e-mail válido.'),
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
