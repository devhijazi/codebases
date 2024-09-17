import crypto from 'node:crypto';

import { Str } from '@supercharge/strings';

export interface ImageOrFile {
  name: string;
  type: string;
  size: number;
  chunk: Buffer;
}

export interface UploadImageData {
  name: string;
  type: string;
  size: number;
  chunk: Buffer;
}

export interface UploadImageResponse {
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface GetImageData {
  name: string;
}

export interface GetImageResponse {
  name: string;
  type: string;
  size: number;
  chunk: Buffer;
}

export abstract class Provider {
  readonly name: string;

  abstract uploadImage(data: UploadImageData): Promise<UploadImageResponse>;

  abstract getImage(data: GetImageData): Promise<GetImageResponse | null>;

  constructor(name: string) {
    this.name = name;
  }

  makeFileName(originalName: string): string {
    const splitedName = originalName.split(/\./);
    const type = splitedName.pop();
    const name = splitedName.join('.');

    const fileHash = crypto.randomBytes(8).toString('hex');
    const parsedName = Str(name.trim()).slug().get();

    return `${parsedName}-${fileHash}.${type}`;
  }
}
