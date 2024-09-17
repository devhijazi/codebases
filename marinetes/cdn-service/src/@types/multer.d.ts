type MulterFile = Express.Multer.File;

type MulterS3File = Express.MulterS3.File;

type AcceptedMulterFiles = MulterFile | MulterS3File;
