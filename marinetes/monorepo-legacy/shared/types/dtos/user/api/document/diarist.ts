import type { Diarist } from '@marinetes/types/model';

export type DiaristDocument = Pick<Diarist, 'id' | 'avatar' | 'full_name'>;
