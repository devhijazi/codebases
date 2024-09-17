export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any;

  public authenticated!: EntityData;

  public userAddress!: EntityData;

  public schedule!: EntityData;

  public diarist!: EntityData;

  public setData(data: Record<string, any>): this {
    this.data = data;
    return this;
  }

  public setAuthenticated(data: EntityData): this {
    this.authenticated = data;
    return this;
  }

  public setUserAddress(data: EntityData): this {
    this.userAddress = data;
    return this;
  }

  public setDiarist(data: EntityData): this {
    this.userAddress = data;
    return this;
  }

  public setSchedule(data: EntityData): this {
    this.schedule = data;
    return this;
  }
}
