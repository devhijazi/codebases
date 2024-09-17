export type EntityData = {
  id: string;
};

export class RequestManager {
  public data: any = {};

  public setData(data: Record<string, any>): this {
    this.data = data;

    return this;
  }
}
