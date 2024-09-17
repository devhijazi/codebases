declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'production' | 'development';

    STORAGE_TYPE: 's3' | 'local';
    JWT_TOKEN: string;
    JWT_RESET_TOKEN: string;

    KAFKA_BROKERS: string;
    KAFKA_CLIENT_ID: string;
    KAFKA_GROUP_ID: string;
    KAFKA_TOPIC_ISSUE_EMAIL: string;
    KAFKA_TOPIC_EMAIL_RESPONSE: string;

    AWS_AVATAR_BUCKET: string;
    AWS_DEFAULT_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;

    MYSQL_PORT: string;
    MYSQL_HOST: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
  }
}
