/* eslint-disable */

// @ts-ignore

import { PrismaClient } from '../../../prisma/mongo/generated';

export interface PrismaMongoOptions {
  url: string;
}

export class PrismaMongoClient extends PrismaClient {
  constructor(options: PrismaMongoOptions) {
    const { url } = options;

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }
}
