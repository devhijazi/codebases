import 'dotenv/config';
import 'express-async-errors';

import { connectDatabase } from '../database';
import { startServer } from './server';

(async () => {
  await connectDatabase();

  startServer();
})();
