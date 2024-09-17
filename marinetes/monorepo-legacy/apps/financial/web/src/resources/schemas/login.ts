import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  password: yup.string().required('Informe sua senha'),
  email: yup
    .string()
    .required('Insira seu email')
    .email('Insira um email válido'),
});
