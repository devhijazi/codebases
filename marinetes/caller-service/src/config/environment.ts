export const environment = {
  nodeEnv: process.env.NODE_ENV,

  expressServerPort: process.env.EXPRESS_SERVER_PORT,
  websocketServerPort: Number(process.env.WEBSOCKET_SERVER_PORT),

  kafkaHost: process.env.KAFKA_HOST,
  kafkaUsername: process.env.KAFKA_USERNAME,
  kafkaPassword: process.env.KAFKA_PASSWORD,

  mysqlHost: process.env.MYSQL_HOST,
  mysqlPort: process.env.MYSQL_PORT,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlUsername: process.env.MYSQL_USERNAME,

  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
} as const;
