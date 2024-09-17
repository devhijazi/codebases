import type {
  DiaristDocument,
  DiaristUpdateData,
  DiaristAddressUpdateData,
} from '@marinetes/types/dtos/financial/api';
import { ChangeEvent, createContext } from 'react';

export interface PageContextData {
  retrieving: boolean;
  diarist: DiaristDocument;
  retrieveDiarist(): Promise<void>;
  handlePersonalDataEdit(data: DiaristUpdateData): Promise<void>;
  handleAddressEdit(data: DiaristAddressUpdateData): Promise<void>;
  handleAvatarEdit(data: ChangeEvent<HTMLInputElement>): Promise<void>;
}

export const PageContext = createContext<PageContextData>(
  {} as PageContextData,
);
