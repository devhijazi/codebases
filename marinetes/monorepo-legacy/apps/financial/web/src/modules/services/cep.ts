import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://brasilapi.com.br/api/cep/v1',
});

export async function getCep(value: string): Promise<CEP | undefined> {
  try {
    const { data } = await api.get<Data>(value);

    if (data.type && data.type === 'service_error') {
      return undefined;
    }

    return data;
  } catch {
    return undefined;
  }
}

interface Data extends CEP {
  type?: string;
}

interface CEP {
  cep: string;
  city: string;
  state: string;
  street?: string;
  neighborhood?: string;
}
