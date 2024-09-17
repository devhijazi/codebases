import { UserWallet } from '@marinetesio/types/model/model';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_wallet')
class UserWalletRepository extends BaseEntity implements UserWallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  balance_available: number;

  @Column('int')
  blocked_balance: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { UserWalletRepository };
