import { PasswordHelper } from '@marinetes/password-helper';
import type { Employee } from '@marinetes/types/model';
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
export class EmployeeRepository extends BaseEntity implements Employee {
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
