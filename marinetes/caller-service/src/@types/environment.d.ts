declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';

    EXPRESS_SERVER_PORT: string;
    WEBSOCKET_SERVER_PORT: string;

    KAFKA_HOST: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;

    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
  }
}
