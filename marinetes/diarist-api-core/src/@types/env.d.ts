declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';

    EXPRESS_SERVER_PORT: string;
    JWT_TOKEN: string;

    GRPC_CDN_SERVICE_URL: string;
    GRPC_NOTIFICATION_SERVICE_URL: string;
    GRPC_PAYMENT_SERVICE_URL: string;

    KAFKA_HOST: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;

    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
  }
}
