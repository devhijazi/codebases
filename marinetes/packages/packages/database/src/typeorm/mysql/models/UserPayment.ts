import type {
  UserPayment,
  UserPaymentMethod,
  UserPaymentStatus,
  User,
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

@Entity('user_payments')
class UserPaymentRepository extends BaseEntity implements UserPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  asaas_payment_id: string;

  @Column('varchar')
  method: UserPaymentMethod;

  @Column('varchar')
  total_value: number;

  @Column('varchar')
  net_value: number;

  @Column('varchar')
  status: UserPaymentStatus;

  @Column('varchar')
  pix_qr_code_base64: string;

  @Column('varchar')
  pix_copy_and_paste: string;

  @ManyToOne('users')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { UserPaymentRepository };
