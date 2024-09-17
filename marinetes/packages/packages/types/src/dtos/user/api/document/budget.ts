import type { CloneObject } from '../../../../all';
import type { Budget } from '../../../../model';
import type { ServiceDocument } from './service';
import type { UserAddressDocument } from './user';

export type BudgetDocument = CloneObject<
  Pick<Budget, 'id' | 'date' | 'price' | 'user_id'> & {
    address: UserAddressDocument;
    services: ServiceDocument[];
  }
>;
