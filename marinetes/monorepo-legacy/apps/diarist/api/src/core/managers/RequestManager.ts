export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any;

  public authenticated!: EntityData;

  public user!: EntityData;

  public setData(data: Record<string, any>): this {
    this.data = data;
    return this;
  }

  public setAuthenticated(data: EntityData): this {
    this.authenticated = data;
    return this;
  }

  public setUser(data: EntityData): this {
    this.user = data;
    return this;
  }
}
