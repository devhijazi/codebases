import { prismaClient } from './client';

export async function connectToDatabase(): Promise<void> {
  console.log('Starting prisma connection...');

  await prismaClient.$connect();

  console.log('Database connection successfully established.');
}

/* eslint no-console: off */
