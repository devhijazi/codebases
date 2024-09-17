import {
  MigrationInterface,
  TableColumn,
  TableForeignKey,
  QueryRunner,
} from 'typeorm';

export class DiaristStatusRelation1660080123303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'status_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'diarists',
      new TableForeignKey({
        referencedTableName: 'diarist_status',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarists');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('status_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarists', foreignKey);
      }
    }

    await queryRunner.dropColumn('diarists', 'status_id');
  }
}
