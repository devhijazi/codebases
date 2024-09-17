declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'production' | 'development';

    MYSQL_PORT: number;
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
  }
}
