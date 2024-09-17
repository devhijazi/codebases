declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';

    EXPRESS_SERVER_PORT: string;

    KAFKA_HOST: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;

    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_SECURE: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
  }
}
