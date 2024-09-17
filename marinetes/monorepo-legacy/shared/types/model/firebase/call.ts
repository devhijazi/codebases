import type admin from 'firebase-admin';

export type Call = {
  userId: string;
  budgetId: string;
  acceptedDiaristId: null | string;
  createdAt: admin.firestore.Timestamp;
};
