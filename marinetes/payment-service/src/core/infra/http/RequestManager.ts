export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any = {};

  public authenticated!: EntityData;

  public diarist!: EntityData;

  public setDiarist(data: EntityData): this {
    this.diarist = data;

    return this;
  }

  public setData(data: Record<string, any>): this {
    this.data = data;

    return this;
  }

  public setAuthenticated(data: EntityData): this {
    this.authenticated = data;

    return this;
  }
}
