import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class BudgetCreate1654638195948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'budgets',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'date',
            type: 'datetime',
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
            name: 'user_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'address',
            type: 'json',
          },
          {
            name: 'created_timestamp',
            type: 'bigint(20)',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('budgets');
  }
}
