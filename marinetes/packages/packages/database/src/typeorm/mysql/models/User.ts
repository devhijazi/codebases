import type {
  UserPayment,
  User,
  UserAddress,
  UserPixData,
  UserTransfer,
  UserWallet,
} from '@marinetesio/types/model';

import { PasswordHelper } from '@marinetesio/password-helper';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { UserPaymentRepository } from './UserPayment';
import { UserPixDataRepository } from './UserPixData';
import { UserTransferRepository } from './UserTransfer';

@Entity('users')
class UserRepository extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  document: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @Column('varchar', { nullable: true })
  avatar: string | null;

  @Column('varchar', { select: false })
  password: string;

  @OneToOne('user_wallet', { nullable: true })
  @JoinColumn({ name: 'wallet_id' })
  wallet: UserWallet | null;

  @OneToMany(() => UserPixDataRepository, pixData => pixData.user)
  pixes: UserPixData[];

  @OneToMany(() => UserPaymentRepository, payment => payment.user)
  payments: UserPayment[];

  @OneToMany(() => UserTransferRepository, transfer => transfer.user)
  transfers: UserTransfer[];

  @ManyToMany('user_adresses')
  @JoinTable({
    name: 'user_addresses_user_addresses',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: UserAddress[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await PasswordHelper.generate(this.password);
    }
  }
}

export { UserRepository };
