import type { AcceptedMulterFiles, MulterS3File } from 'multer';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristAvatarUpdateService implements Service {
  async execute(diaristId: string, file: AcceptedMulterFiles): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { PORT } = process.env;

    const localFileUrl = `http://localhost:${PORT}/files/avatar/${file.filename}`;

    let avatar: string = localFileUrl;

    if (file.isS3) {
      avatar = (file as MulterS3File).location;
    }

    await DiaristRepository.update(diarist.id, {
      avatar,
    });
  }
}
