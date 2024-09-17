import type {
  Diarist,
  DiaristTransfer,
  DiaristTransferOperationType,
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

@Entity('diarist_transfers')
class DiaristTransferRepository extends BaseEntity implements DiaristTransfer {
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
  operation_type: DiaristTransferOperationType;

  @Column('varchar')
  status: string;

  @Column('varchar')
  bank_data_id: string | null;

  @Column('varchar')
  pix_data_id: string | null;

  @ManyToOne('diarists')
  @JoinColumn({ name: 'diarist_id' })
  diarist: Diarist;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { DiaristTransferRepository };
