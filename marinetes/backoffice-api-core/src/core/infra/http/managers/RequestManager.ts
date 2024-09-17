export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any = {};

  public diarist!: EntityData;

  public service!: EntityData;

  public employee!: EntityData;

  public authenticated!: EntityData;

  public setData(data: Record<string, any>): this {
    this.data = data;
    return this;
  }

  public setAuthenticated(data: EntityData): this {
    this.authenticated = data;
    return this;
  }

  public setDiarist(data: EntityData): this {
    this.diarist = data;
    return this;
  }

  public setService(data: EntityData): this {
    this.service = data;
    return this;
  }

  public setEmployee(data: EntityData): this {
    this.employee = data;
    return this;
  }
}
