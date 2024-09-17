import { PasswordHelper } from '@marinetes/password-helper';
import type {
  Diarist,
  DiaristAddress,
  DiaristBankData,
  DiaristStatus,
  Service,
} from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('diarists')
export class DiaristRepository extends BaseEntity implements Diarist {
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

  @ManyToOne('diarist_status')
  @JoinColumn({ name: 'status_id' })
  status: DiaristStatus;

  @ManyToOne('diarist_bankdata', { nullable: true })
  @JoinColumn({ name: 'bankdata_id' })
  bank_data: DiaristBankData | null;

  @ManyToOne('diarist_addresses', { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: DiaristAddress | null;

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
