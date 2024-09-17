import { UserRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { AcceptedMulterFiles, MulterS3File } from 'multer';

export class UserUpdateAvatarService implements Service {
  async execute(userId: string, file: AcceptedMulterFiles): Promise<void> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const { PORT } = process.env;

    const localFileUrl = `http://localhost:${PORT}/avatar/${file.filename}`;

    let avatar: string = localFileUrl;

    if (file.isS3) {
      avatar = (file as MulterS3File).location;
    }

    await UserRepository.update(user.id, {
      avatar,
    });
  }
}
