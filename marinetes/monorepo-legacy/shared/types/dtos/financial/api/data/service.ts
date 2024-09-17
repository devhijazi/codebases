import type { LeanModel, Service } from '@marinetes/types/model';

type ServiceLean = LeanModel<Service>;

export type ServiceCreateData = ServiceLean;

export type ServiceUpdateData = Pick<ServiceLean, 'icon'>;
