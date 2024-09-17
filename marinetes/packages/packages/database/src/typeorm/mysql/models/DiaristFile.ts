import type { DiaristFile } from '@marinetesio/types/model';

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('diarist_files')
class DiaristFileRepository extends BaseEntity implements DiaristFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  extension: string;

  @Column('float')
  size_in_mb: number;

  @Column('varchar')
  url: string;

  @Column('char')
  diarist_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { DiaristFileRepository };
