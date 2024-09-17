import {
  MigrationInterface,
  TableColumn,
  TableForeignKey,
  QueryRunner,
} from 'typeorm';

export class DiaristBankDataRelation1660082042184
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'bankdata_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'diarists',
      new TableForeignKey({
        referencedTableName: 'diarist_bankdata',
        columnNames: ['bankdata_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarists');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('bankdata_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarists', foreignKey);
      }
    }

    await queryRunner.dropColumn('diarists', 'bankdata_id');
  }
}
