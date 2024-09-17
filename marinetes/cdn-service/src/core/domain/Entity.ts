import { v4 as uuid } from 'uuid';

export class Entity<T> {
  protected readonly _id: string;

  readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id || uuid();

    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}
