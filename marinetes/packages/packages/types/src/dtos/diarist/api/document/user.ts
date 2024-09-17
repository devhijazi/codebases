import type { User } from '../../../../model';

export type UserDocument = Pick<User, 'id' | 'full_name' | 'avatar'>;
