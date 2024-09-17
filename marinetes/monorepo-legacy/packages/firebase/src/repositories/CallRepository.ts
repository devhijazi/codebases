import type { Call } from '@marinetes/types/model/firebase';
import firebaseAdmin from 'firebase-admin';

import { Repository, DocumentReference } from './Repository';

export type CallSkeleton = Omit<Call, 'createdAt' | 'acceptedDiaristId'>;

export class CallRepository extends Repository<Call> {
  protected get collectioName(): string {
    return 'calls';
  }

  public async add(data: CallSkeleton): Promise<DocumentReference<Call>> {
    return super.add({
      ...data,
      acceptedDiaristId: null,
      createdAt: firebaseAdmin.firestore.Timestamp.fromDate(new Date()),
    });
  }
}
