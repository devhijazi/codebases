import axios, { AxiosInstance } from 'axios';

export const api = makeAPI();

function makeAPI(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DIARIST_API_URL,
  });

  return instance;
}
