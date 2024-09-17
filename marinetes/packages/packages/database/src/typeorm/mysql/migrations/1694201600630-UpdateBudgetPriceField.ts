import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateBudgetPriceField1694201600630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'budgets',
      'price',
      new TableColumn({
        name: 'price',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'budgets',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal(12, 2)',
      }),
    );
  }
}
