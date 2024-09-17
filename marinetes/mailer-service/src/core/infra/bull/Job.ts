export abstract class Job<D> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  abstract handle(data: D): Promise<void>;
}
