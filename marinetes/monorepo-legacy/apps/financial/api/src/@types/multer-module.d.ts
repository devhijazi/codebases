import 'multer';

declare module 'multer' {
  type AssignedFileProperties = {
    isS3: boolean;
  };

  type MulterFile = Express.Multer.File & AssignedFileProperties;

  type MulterS3File = Express.MulterS3.File & AssignedFileProperties;

  type AcceptedMulterFiles = MulterFile | MulterS3File;
}
