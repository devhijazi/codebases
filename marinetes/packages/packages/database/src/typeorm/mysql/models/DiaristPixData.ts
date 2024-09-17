import type {
  Diarist,
  DiaristPixData,
  DiaristPixDataKeyType,
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

@Entity('diarist_pix_data')
class DiaristPixDataRepository extends BaseEntity implements DiaristPixData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  key_type: DiaristPixDataKeyType;

  @Column('varchar')
  key: string;

  @ManyToOne('diarists')
  @JoinColumn({ name: 'diarist_id' })
  diarist: Diarist;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { DiaristPixDataRepository };
