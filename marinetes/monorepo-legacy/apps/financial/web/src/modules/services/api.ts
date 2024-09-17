import axios, { AxiosInstance } from 'axios';

export const api = makeAPI();

function makeAPI(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? '',
  });

  return instance;
}
