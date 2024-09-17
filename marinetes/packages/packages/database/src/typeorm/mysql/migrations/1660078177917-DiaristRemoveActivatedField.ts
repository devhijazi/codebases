import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { getExistingColumns } from '../fixtures/getExistingColumns';

export class DiaristRemoveActivatedField1660078177917
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dropColumns = await getExistingColumns(queryRunner, {
      table: 'diarists',
      columns: ['activated'],
    });

    await queryRunner.dropColumns('diarists', dropColumns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'activated',
        type: 'boolean',
      }),
    );
  }
}
