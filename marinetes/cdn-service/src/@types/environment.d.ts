declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';

    EXPRESS_SERVER_PORT: string;
    EXPRESS_SERVER_URL: string;
    GRPC_SERVER_URL: string;
    STORAGE_TYPE: 'local' | 'aws';

    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET_NAME: string;
  }
}
