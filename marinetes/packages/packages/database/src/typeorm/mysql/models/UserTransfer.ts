import type {
  User,
  UserTransfer,
  UserTransferOperationType,
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

@Entity('user_transfers')
class UserTransferRepository extends BaseEntity implements UserTransfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  asaas_transfer_id: string;

  @Column('int')
  total_value: number;

  @Column('int')
  net_value: number;

  @Column('int')
  trasnsfer_fee: number | null;

  @Column('varchar')
  operation_type: UserTransferOperationType;

  @Column('varchar')
  status: string;

  @Column('varchar')
  bank_data_id: string | null;

  @Column('varchar')
  pix_data_id: string | null;

  @ManyToOne('users')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { UserTransferRepository };
