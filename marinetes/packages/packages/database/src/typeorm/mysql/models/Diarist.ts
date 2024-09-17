import type {
  Diarist,
  DiaristAddress,
  DiaristBankData,
  DiaristPixData,
  DiaristStatus,
  Service,
  DiaristWallet,
  DiaristTransfer,
} from '@marinetesio/types/model';

import { PasswordHelper } from '@marinetesio/password-helper';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { DiaristBankDataRepository } from './DiaristBankData';
import { DiaristPixDataRepository } from './DiaristPixData';
import { DiaristTransferRepository } from './DiaristTransfer';

@Entity('diarists')
class DiaristRepository extends BaseEntity implements Diarist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  full_name: string;

  @Column('date')
  birthdate: string;

  @Column('varchar')
  document: string;

  @Column('varchar')
  general_register: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('boolean')
  accepting_services: boolean;

  @Column('varchar', { nullable: true })
  avatar: string | null;

  @Column('varchar', { select: false })
  password: string;

  @OneToOne('diarist_status')
  @JoinColumn({ name: 'status_id' })
  status: DiaristStatus;

  @OneToOne('diarist_addresses', { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: DiaristAddress | null;

  @OneToOne('diarist_wallet', { nullable: true })
  @JoinColumn({ name: 'wallet_id' })
  wallet: DiaristWallet | null;

  @OneToMany(() => DiaristTransferRepository, transfer => transfer.diarist)
  transfers: DiaristTransfer[];

  @OneToMany(() => DiaristPixDataRepository, pixData => pixData.diarist)
  pixes: DiaristPixData[];

  @OneToMany(() => DiaristBankDataRepository, bankData => bankData.diarist)
  banks: DiaristBankData[];

  @ManyToMany('services')
  @JoinTable({
    name: 'diarists_accepted_services_services',
    joinColumn: {
      name: 'diarist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
  })
  accepted_services: Service[];

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

export { DiaristRepository };
