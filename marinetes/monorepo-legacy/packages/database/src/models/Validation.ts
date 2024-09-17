import type { Validation } from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('validations')
export class ValidationRepository extends BaseEntity implements Validation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  validation: string;

  @Column('varchar')
  subject: string;

  @Column('int')
  expiration_time_in_minutes: number;

  @Column('bigint')
  created_timestamp: number;

  @BeforeInsert()
  public setCreatedTimestamp(): void {
    this.created_timestamp = Date.now();
  }
}
