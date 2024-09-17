import type { RefreshToken } from '@marinetesio/types/model';

import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
class RefreshTokenRepository extends BaseEntity implements RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  subject_id: string;

  @Column('varchar')
  token: string;
}

export { RefreshTokenRepository };
