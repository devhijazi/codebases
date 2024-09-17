import { PasswordHelper } from '@marinetes/password-helper';
import type { User, UserAddress } from '@marinetes/types/model';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class UserRepository extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  full_name: string;

  @Column('varchar')
  document: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @Column('varchar', { nullable: true })
  avatar: string | null;

  @Column('varchar', { select: false })
  password: string;

  @ManyToMany('user_adresses')
  @JoinTable({
    name: 'user_addresses_user_addresses',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: UserAddress[];

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
