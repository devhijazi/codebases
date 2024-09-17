import { make } from './base';

const fileSize = 4 * 1024 * 1024; // 4 MB

export const avatarConfig = make({
  fileSize,
  s3Folder: 'avatar',
  tmpFolder: 'avatar',
  s3Bucket: process.env.AWS_PUBLIC_BUCKET,
  allowedMimes: ['image/jpeg', 'image/jpg'],
});
