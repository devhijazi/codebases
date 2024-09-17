declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'production' | 'development';

    USER_JWT_TOKEN: string;
    DIARIST_JWT_TOKEN: string;

    FIREBASE_SERVICE_ACCOUNT_PATH?: string;

    MYSQL_PORT: number;
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
  }
}
