export const environment = {
  nodeEnv: process.env.NODE_ENV,

  expressServerPort: process.env.EXPRESS_SERVER_PORT,
  jwtToken: process.env.JWT_TOKEN,

  grpcCdnServiceUrl: process.env.GRPC_CDN_SERVICE_URL,
  grpcNotificationServiceUrl: process.env.GRPC_NOTIFICATION_SERVICE_URL,
  grpcPaymentServiceUrl: process.env.GRPC_PAYMENT_SERVICE_URL,

  kafkaHost: process.env.KAFKA_HOST,
  kafkaUsername: process.env.KAFKA_USERNAME,
  kafkaPassword: process.env.KAFKA_PASSWORD,

  mysqlHost: process.env.MYSQL_HOST,
  mysqlPort: process.env.MYSQL_PORT,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlUsername: process.env.MYSQL_USERNAME,
  mysqlPassword: process.env.MYSQL_PASSWORD,
} as const;
