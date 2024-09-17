declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';

    PORT: string;

    MONGO_URL: string;
  }
}
