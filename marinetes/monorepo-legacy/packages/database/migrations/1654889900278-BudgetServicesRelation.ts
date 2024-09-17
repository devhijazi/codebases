import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class BudgetServicesRelation1654889900278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'budgets_services_services',
        columns: [
          {
            name: 'budget_id',
            type: 'char(36)',
            isPrimary: true,
          },
          {
            name: 'service_id',
            type: 'char(36)',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['budget_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'budgets',
          },
          {
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('budgets_services_services');
  }
}
