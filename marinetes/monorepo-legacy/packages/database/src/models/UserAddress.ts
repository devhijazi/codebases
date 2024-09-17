import type {
  UserAddress,
  UserAddressCategory,
  UserAddressType,
} from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_adresses')
export class UserAddressRepository extends BaseEntity implements UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  type: UserAddressType;

  @Column('varchar')
  category: UserAddressCategory;

  @Column('int')
  rooms: number;

  @Column('numeric')
  square_meters: number;

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
