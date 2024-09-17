import type { Service } from '../../../model';

export type ServiceDocument = Pick<Service, 'id' | 'title' | 'icon'>;
