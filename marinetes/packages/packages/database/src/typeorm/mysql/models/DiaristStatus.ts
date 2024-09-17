import type {
  DiaristStatus,
  DiaristStatusType,
} from '@marinetesio/types/model';

import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diarist_status')
class DiaristStatusRepository extends BaseEntity implements DiaristStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: DiaristStatusType;

  @Column('boolean')
  approved: boolean;

  @Column('datetime', { nullable: true })
  last_attend_email_sent_date: string | null;

  @Column('datetime', { nullable: true })
  disable_date: string | null;

  @Column('varchar', { nullable: true })
  disable_reason: string | null;
}

export { DiaristStatusRepository };
