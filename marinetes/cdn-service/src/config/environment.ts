export const environment = {
  nodeEnv: process.env.NODE_ENV,

  expressServerPort: process.env.EXPRESS_SERVER_PORT,
  expressServerUrl: process.env.EXPRESS_SERVER_URL,
  grpcServerUrl: process.env.GRPC_SERVER_URL,
  storageType: process.env.STORAGE_TYPE,

  awsRegion: process.env.AWS_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
} as const;
