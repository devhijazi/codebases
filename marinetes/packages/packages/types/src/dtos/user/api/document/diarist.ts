import type { Diarist } from '../../../../model';

export type DiaristDocument = Pick<Diarist, 'id' | 'avatar' | 'full_name'>;
