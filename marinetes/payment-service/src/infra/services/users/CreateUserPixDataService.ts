import {
  UserPixDataRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  UserPixKeyRateLimitError,
  UserNotFoundError,
  DiaristPixKeyAlreadyExistsError as UserPixKeyAlreadyExistsError,
} from '@marinetesio/errors';
import { UserPixDataKeyType } from '@marinetesio/types/model/model';

export interface CreateUserPixDataServiceRequest {
  userId: string;
  data: {
    key: string;
    keyType: UserPixDataKeyType;
  };
}

export interface CreateUserPixDataServiceResponse {
  pixDataId: string;
}

export class CreateUserPixDataService {
  async execute(
    request: CreateUserPixDataServiceRequest,
  ): Promise<CreateUserPixDataServiceResponse> {
    const {
      userId,
      data: { key, keyType },
    } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['pixes'],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.pixes.length === 2) {
      throw new UserPixKeyRateLimitError();
    }

    const pixKeyAlreadyExists = await UserPixDataRepository.findOne({
      where: {
        key,
        user: {
          id: user.id,
        },
      },
    });

    if (pixKeyAlreadyExists) {
      throw new UserPixKeyAlreadyExistsError();
    }

    const pixData = await UserPixDataRepository.create({
      key,
      key_type: keyType,
      user: {
        id: user.id,
      },
    }).save();

    user.pixes.push(pixData);

    await user.save();

    return {
      pixDataId: pixData.id,
    };
  }
}
