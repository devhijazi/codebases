import type { Employee } from '@marinetesio/types/model';

import { PasswordHelper } from '@marinetesio/password-helper';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('employees')
class EmployeeRepository extends BaseEntity implements Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { select: false })
  password: string;

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

export { EmployeeRepository };
