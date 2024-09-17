import type { MarinetesWallet } from '@marinetesio/types/model';

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('marinetes_wallet')
class MarinetesWalletRepository extends BaseEntity implements MarinetesWallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  balance: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { MarinetesWalletRepository };
