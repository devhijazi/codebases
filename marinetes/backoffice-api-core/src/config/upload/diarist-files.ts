import { make } from './base';

const fileSize = 6 * 1024 * 1024; // 6 MB

export const diaristFilesConfig = make({
  fileSize,
  s3Folder: 'diarist',
  tmpFolder: 'diarist',
  s3Bucket: process.env.AWS_PRIVATE_BUCKET,
  allowedMimes: ['image/jpeg', 'image/jpg'],
});
