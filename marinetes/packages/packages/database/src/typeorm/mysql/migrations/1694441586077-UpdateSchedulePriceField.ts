import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateSchedulePriceField1694441586077
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'schedules',
      'price',
      new TableColumn({
        name: 'price',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'schedules',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal(12, 2)',
      }),
    );
  }
}
