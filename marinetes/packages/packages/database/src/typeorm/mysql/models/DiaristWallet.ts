import { DiaristWallet } from '@marinetesio/types/model/model';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('diarist_wallet')
class DiaristWalletRepository extends BaseEntity implements DiaristWallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  balance: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { DiaristWalletRepository };
