import type { CloneObject } from '@marinetes/types/all';
import type { Budget } from '@marinetes/types/model';

import type { ServiceDocument } from './service';
import type { UserAddressDocument } from './user';

export type BudgetDocument = CloneObject<
  Pick<Budget, 'id' | 'date' | 'price' | 'user_id'> & {
    address: UserAddressDocument;
    services: ServiceDocument[];
  }
>;
