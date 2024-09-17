import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { getExistingColumns } from '../fixtures/getExistingColumns';

export class DiaristStatusAddLastAttendEmailSentDateFieldAdd1660932229719
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarist_status',
      new TableColumn({
        name: 'last_attend_email_sent_date',
        type: 'datetime',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dropColumns = await getExistingColumns(queryRunner, {
      table: 'diarist_status',
      columns: ['last_attend_email_sent_date'],
    });

    await queryRunner.dropColumns('diarist_status', dropColumns);
  }
}
