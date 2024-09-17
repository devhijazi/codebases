import type { DiaristBankData } from '@marinetes/types/model';
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diarist_bankdata')
export class DiaristBankDataRepository
  extends BaseEntity
  implements DiaristBankData
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  bank_number: string;

  @Column('varchar')
  bank_name: string;

  @Column('varchar')
  agency: string;

  @Column('varchar')
  account: string;

  @Column('char')
  diarist_id: string;
}
