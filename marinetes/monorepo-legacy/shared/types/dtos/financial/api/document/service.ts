import type { Service } from '@marinetes/types/model';

export type ServiceDocument = Pick<Service, 'id' | 'title' | 'icon'>;
