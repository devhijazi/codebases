import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { getExistingColumns } from '../fixtures/getExistingColumns';

export class DiaristBankDataFieldsUpdate1667246678167
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dropColumns = await getExistingColumns(queryRunner, {
      table: 'diarist_bankdata',
      columns: ['bank_name'],
    });

    await queryRunner.dropColumns('diarist_bankdata', dropColumns);

    await queryRunner.addColumn(
      'diarist_bankdata',
      new TableColumn({
        name: 'stripe_account_id',
        type: 'varchar(255)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dropColumns = await getExistingColumns(queryRunner, {
      table: 'diarist_bankdata',
      columns: ['stripe_account_id'],
    });

    await queryRunner.dropColumns('diarist_bankdata', dropColumns);

    await queryRunner.addColumn(
      'diarist_bankdata',
      new TableColumn({
        name: 'bank_name',
        type: 'varchar(255)',
      }),
    );
  }
}
