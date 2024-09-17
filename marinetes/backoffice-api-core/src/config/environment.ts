export const environment = {
  nodeEnv: process.env.NODE_ENV,

  expressServerPort: process.env.EXPRESS_SERVER_PORT,
  jwtToken: process.env.JWT_TOKEN,

  kafkaHost: process.env.KAFKA_HOST,
  kafkaUsername: process.env.KAFKA_USERNAME,
  kafkaPassword: process.env.KAFKA_PASSWORD,

  awsPrivateBucket: process.env.AWS_PRIVATE_BUCKET,
  awsDefaultRegion: process.env.AWS_DEFAULT_REGION,
  awsAccessKey_id: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  mysqlPort: process.env.MYSQL_PORT,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlUsername: process.env.MYSQL_USERNAME,
  mysqlPassword: process.env.MYSQL_PASSWORD,
};
