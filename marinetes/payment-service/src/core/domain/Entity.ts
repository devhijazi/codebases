import { v4 as uuid } from 'uuid';

export interface EntityProps {
  createdAt?: Date;
  updatedAt?: Date;
}

export class Entity<T extends EntityProps = any> {
  protected readonly _id: string;

  readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id || uuid();

    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }

  get updatedAt(): Date {
    return this.props.updatedAt as Date;
  }
}
