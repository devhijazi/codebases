require('dotenv').config();

const http = require('node:http');

const { Logger } = require('@marinetesio/logger');
const kafkajs = require('kafkajs');

const kafka = new kafkajs.Kafka({
  brokers: [process.env.KAFKA_HOST],
  clientId: 'api-example',
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer({
  createPartitioner: kafkajs.Partitioners.DefaultPartitioner,
});

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/send-email') {
    await producer.send({
      topic: 'marinetes-mailer.issue-email',
      messages: [
        {
          value: JSON.stringify({
            subject: 'Email Test',
            to: 'Izak <izakdvlpr@gmail.com>',
            template: {
              name: 'forgot-password',
              group: 'user',
              context: {
                name: 'Izak',
                code: '123456',
              },
            },
          }),
        },
      ],
    });

    return res.writeHead(200).end();
  }

  return res.writeHead(404).end();
});

async function main() {
  await producer.connect();

  server.listen(3333, () => {
    const logger = new Logger('Server');

    logger.success('Server is running on port "3333".');
  });
}

main().catch(console.error);
