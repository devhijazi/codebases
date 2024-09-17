import { CdnService, ICdnService } from '@hitechline/marinetes-protos/protobuf';
import { adaptService } from '@protobuf-ts/grpc-backend';

import { storageConfig } from '@/config/storage';
import { UploadImageService } from '@/infra/http/services/UploadImageService';
import { Storage } from '@/infra/storage';

const storage = new Storage(storageConfig);

const implementation: ICdnService = {
  uploadImage: async request => {
    const { name, size, type, chunk: chunkInBytes } = request;

    const chunk = Buffer.from(chunkInBytes);

    const uploadImage = new UploadImageService(storage);

    const image = await uploadImage.execute({
      name,
      size,
      type,
      chunk,
    });

    return { image };
  },
};

const [cdnService, cdnImplementation] = adaptService(
  CdnService,
  implementation,
);

export { cdnService, cdnImplementation };
