import type { LeanModel, Service } from '../../../../model';

type ServiceLean = LeanModel<Service>;

export type ServiceCreateData = ServiceLean;

export type ServiceUpdateData = Pick<ServiceLean, 'icon'>;
