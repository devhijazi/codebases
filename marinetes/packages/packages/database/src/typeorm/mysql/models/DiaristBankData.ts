import type {
  Diarist,
  DiaristBankData,
  DiaristBankDataAccountType,
} from '@marinetesio/types/model';

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('diarist_bank_data')
class DiaristBankDataRepository extends BaseEntity implements DiaristBankData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  account_name: string;

  @Column('varchar')
  owner_name: string;

  @Column('varchar')
  document: string;

  @Column('varchar')
  agency: string;

  @Column('varchar')
  account: string;

  @Column('varchar')
  account_digit: string;

  @Column('varchar')
  bank_account_type: DiaristBankDataAccountType;

  @ManyToOne('diarists')
  @JoinColumn({ name: 'diarist_id' })
  diarist: Diarist;

  @Column('varchar')
  ispb: string | null;

  @Column('varchar')
  bank_code: string | null;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { DiaristBankDataRepository };
