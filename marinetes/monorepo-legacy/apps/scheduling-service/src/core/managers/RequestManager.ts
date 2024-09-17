export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any = {};

  public authenticatedUser!: EntityData;

  public authenticatedDiarist!: EntityData;

  public setData(data: Record<string, any>): this {
    this.data = data;
    return this;
  }

  public setAuthenticatedUser(data: EntityData): this {
    this.authenticatedUser = data;
    return this;
  }

  public setAuthenticatedDiarist(data: EntityData): this {
    this.authenticatedDiarist = data;
    return this;
  }
}
