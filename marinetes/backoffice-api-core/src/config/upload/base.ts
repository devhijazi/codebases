import crypto from 'crypto';

import Str from '@supercharge/strings';
import S3 from 'aws-sdk/clients/s3';
import { Request } from 'express';
import multer, {
  MulterFile,
  StorageEngine,
  Options as MulterOptions,
} from 'multer';
import multerS3 from 'multer-s3';

import { getRootPath } from '@/shared/utils/path';

interface Options extends MulterOptions {
  directory: string;
}

interface Config {
  s3Folder: string;
  s3Bucket: string;
  tmpFolder: string;
  fileSize: number;
  allowedMimes: [string, ...string[]];
}

export function make({
  s3Folder,
  s3Bucket,
  tmpFolder,
  fileSize,
  allowedMimes,
}: Config): Options {
  const tmpDirectory = getRootPath('.tmp', 'files', tmpFolder);

  let storage: StorageEngine = multer.diskStorage({
    filename: makeFileName(),
    destination: tmpDirectory,
  });

  if (process.env.STORAGE_TYPE === 's3') {
    storage = multerS3({
      s3: new S3() as any,
      acl: 'public-read',
      bucket: s3Bucket,
      key: makeFileName(s3Folder, true),
      contentType: multerS3.AUTO_CONTENT_TYPE,
    });
  }

  return {
    storage,
    directory: tmpDirectory,
    limits: {
      fileSize,
    },
    fileFilter: (
      _req: Request,
      file: MulterFile,
      callback: (...params: any[]) => any,
    ): void => {
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('Invalid file type.'));
      }
    },
  };
}

function makeFileName(
  folder?: string,
  isS3 = false,
): (
  _req: Request,
  file: MulterFile,
  callback: (...params: any[]) => any,
) => void {
  const parsedFolder = folder ? `${folder}/` : '';

  return (
    _req: Request,
    file: MulterFile,
    callback: (...params: any[]) => any,
  ): void => {
    const splitedName = file.originalname.split(/\./);
    const type = splitedName.pop();
    const name = splitedName.join('.');

    const fileHash = crypto.randomBytes(8).toString('hex');
    const parsedName = Str(name.trim()).slug().get();

    // eslint-disable-next-line no-param-reassign
    file.isS3 = isS3;

    callback(null, `${parsedFolder}${parsedName}-${fileHash}.${type}`);
  };
}
