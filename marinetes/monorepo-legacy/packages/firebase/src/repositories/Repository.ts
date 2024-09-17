/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import firebase from 'firebase-admin';

import { database } from '../firebase';

export type CollectionReference<T> = firebase.firestore.CollectionReference<T>;

export type WhereFilterOp = firebase.firestore.WhereFilterOp;

export type DocumentReference<T> = firebase.firestore.DocumentReference<T>;

export type QueryDocumentSnapshot<T> =
  firebase.firestore.QueryDocumentSnapshot<T>;

export type DocumentSnapshot<T> = firebase.firestore.DocumentSnapshot<T>;

export type WriteResult = firebase.firestore.WriteResult;

export abstract class Repository<T> {
  protected abstract get collectioName(): string;

  protected get collection(): CollectionReference<T> {
    const collection = this.getCollection(this.collectioName);

    return collection;
  }

  public async find(
    fieldPath: string,
    opStr: WhereFilterOp,
    value: any,
  ): Promise<QueryDocumentSnapshot<T>[]> {
    const snapshot = await this.collection.where(fieldPath, opStr, value).get();

    return snapshot.docs;
  }

  public async getDocument(documentId: string): Promise<DocumentSnapshot<T>> {
    const snapshot = await this.collection.doc(documentId).get();

    return snapshot;
  }

  public async add(data: T): Promise<DocumentReference<T>> {
    return this.collection.add(data);
  }

  public async update(documentId: string, updateData: T): Promise<WriteResult> {
    return this.collection.doc(documentId).update(updateData);
  }

  public async has(
    fieldPath: string,
    opStr: WhereFilterOp,
    value: any,
  ): Promise<boolean> {
    const snapshot = await this.collection.where(fieldPath, opStr, value).get();

    return !snapshot.empty;
  }

  private getCollection(collectionPath: string): CollectionReference<T> {
    const collection = database.collection(collectionPath);

    return collection as CollectionReference<T>;
  }
}
