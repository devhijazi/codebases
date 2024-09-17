import { make } from './base';

const fileSize = 4 * 1024 * 1024; // 4 MB

export const avatarUploadConfig = make({
  s3Folder: 'avatar',
  tmpFolder: 'avatar',
  fileSize,
  s3Bucket: process.env.AWS_AVATAR_BUCKET,
  allowedMimes: ['image/jpeg', 'image/jpg'],
});
