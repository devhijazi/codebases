import { RequestManager } from '../core/managers/RequestManager';

interface MyRequest {
  manager: RequestManager;
}

declare module 'express' {
  interface Request extends MyRequest {}
}

declare module '@types/express-serve-static-core' {
  interface Request extends MyRequest {}
}

declare module '@types/express-serve-static-core' {
  interface Request extends MyRequest {
    file: AcceptedMulterFiles;
  }
}
