import 'express-async-errors';
import 'dotenv-defaults/config';

import { connectToDatabase } from '@core/connectToDatabase';
import { APIManager } from '@core/managers/APIManager';

connectToDatabase()
  .then(() => {
    const apiManager = new APIManager();

    apiManager.connect();
  })
  .catch(error => {
    console.log(error.stack || error);
    process.exit(1);
  });

/* eslint no-console: off */
