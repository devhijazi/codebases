import axios from 'axios';

interface AxiosResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const getCep = async (cep: string): Promise<AxiosResponse> => {
  const response = await axios.get<AxiosResponse>(
    `https://viacep.com.br/ws/${cep}/json/`,
  );

  const data_cep = response.data;

  return data_cep;
};
