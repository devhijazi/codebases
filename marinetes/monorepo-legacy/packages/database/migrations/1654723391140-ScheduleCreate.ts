import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class ScheduleCreate1654723391140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'status',
            type: 'varchar(255)',
          },
          {
            name: 'date',
            type: 'datetime',
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal(12, 2)',
          },
          {
            name: 'estimated_time_in_hours',
            type: 'int(2)',
          },
          {
            name: 'verified',
            type: 'boolean',
          },
          {
            name: 'confirmed',
            type: 'boolean',
          },
          {
            name: 'going_to_local',
            type: 'boolean',
          },
          {
            name: 'user_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'diarist_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'second_diarist_id',
            type: 'char(36)',
            isNullable: true,
          },
          {
            name: 'verification_code',
            type: 'varchar(255)',
          },
          {
            name: 'confirmation_code',
            type: 'varchar(255)',
          },
          {
            name: 'address',
            type: 'json',
          },
          {
            name: 'payment',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
          },
          {
            referencedTableName: 'diarists',
            columnNames: ['diarist_id'],
            referencedColumnNames: ['id'],
          },
          {
            referencedTableName: 'diarists',
            columnNames: ['second_diarist_id'],
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedules');
  }
}
