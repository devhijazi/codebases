import { resolve } from 'path';

import firebase from 'firebase-admin';

const serviceAccountPath = resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH as any,
);

export const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountPath),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const database = firebaseApp.firestore();
