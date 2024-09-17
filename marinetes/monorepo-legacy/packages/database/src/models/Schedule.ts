import type {
  Schedule,
  Service,
  ScheduleStatus,
  SchedulePayment,
  UserAddress,
} from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('schedules')
export class ScheduleRepository extends BaseEntity implements Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  status: ScheduleStatus;

  @Column('datetime')
  date: string;

  @Column('datetime', { nullable: true })
  end_date: string;

  @Column('decimal')
  price: number;

  @Column('int')
  estimated_time_in_hours: number;

  @Column('boolean')
  verified: boolean;

  @Column('boolean')
  confirmed: boolean;

  @Column('boolean')
  going_to_local: boolean;

  @Column('char')
  user_id: string;

  @Column('char')
  diarist_id: string;

  @Column('char', { nullable: true })
  second_diarist_id: string;

  @Column('varchar')
  verification_code: string;

  @Column('varchar')
  confirmation_code: string;

  @Column('json')
  address: UserAddress;

  @Column('json')
  payment: SchedulePayment;

  @ManyToMany('services')
  @JoinTable({
    name: 'schedules_services_services',
    joinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
  })
  services: Service[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
