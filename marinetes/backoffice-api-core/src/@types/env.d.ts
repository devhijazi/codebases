declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';

    EXPRESS_SERVER_PORT: string;
    JWT_TOKEN: string;

    KAFKA_HOST: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;

    AWS_PRIVATE_BUCKET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_DEFAULT_REGION: string;
    AWS_SECRET_ACCESS_KEY: string;

    MYSQL_PORT: number;
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
  }
}
