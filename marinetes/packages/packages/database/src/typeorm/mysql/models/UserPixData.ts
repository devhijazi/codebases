import type {
  User,
  UserPixData,
  UserPixDataKeyType,
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

@Entity('user_pix_data')
class UserPixDataRepository extends BaseEntity implements UserPixData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  key_type: UserPixDataKeyType;

  @Column('varchar')
  key: string;

  @ManyToOne('users')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export { UserPixDataRepository };
