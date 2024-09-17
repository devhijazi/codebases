import type { User } from '@marinetes/types/model';

export type UserDocument = Pick<User, 'id' | 'full_name' | 'avatar'>;
