import type { DiaristAddress } from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('diarist_addresses')
export class DiaristAddressRepository
  extends BaseEntity
  implements DiaristAddress
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  zip_code: string;

  @Column('varchar')
  state: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  neighborhood: string;

  @Column('varchar')
  street: string;

  @Column('int')
  number: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
