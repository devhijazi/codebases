import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreatePaymentUserRelation1693869778003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'payments',
      new TableColumn({
        name: 'user_id',
        type: 'char(36)',
      }),
    );

    await queryRunner.createForeignKey(
      'payments',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('payments');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('user_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('payments', foreignKey);
      }
    }

    await queryRunner.dropColumn('payments', 'user_id');
  }
}
