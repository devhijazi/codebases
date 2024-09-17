import type { Budget, Service, UserAddress } from '@marinetesio/types/model';

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('budgets')
class BudgetRepository extends BaseEntity implements Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  date: string;

  @Column('int')
  price: number;

  @Column('int')
  estimated_time_in_hours: number;

  @Column('char')
  user_id: string;

  @Column('json')
  address: UserAddress;

  @ManyToMany('services')
  @JoinTable({
    name: 'budgets_services_services',
    joinColumn: {
      name: 'budget_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
  })
  services: Service[];

  @Column('bigint')
  created_timestamp: number;

  @BeforeInsert()
  public setCreatedTimestamp(): void {
    this.created_timestamp = Date.now();
  }
}

export { BudgetRepository };
