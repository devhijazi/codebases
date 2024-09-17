declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';

    EXPRESS_SERVER_PORT: string;
    WEBSOCKET_SERVER_PORT: string;
    GRPC_SERVER_URL: string;

    ASAAS_MODE: 'production' | 'sandbox';
    ASAAS_MARINETES_API_KEY: string;
    ASAAS_MARINETES_WEBHOOK_AUTH_TOKEN: string;

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
