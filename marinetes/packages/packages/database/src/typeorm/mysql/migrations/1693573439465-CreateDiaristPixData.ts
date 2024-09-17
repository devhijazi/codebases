import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDiaristPixData1693573439465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_pix_data',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'key_type',
            type: 'varchar(255)',
          },
          {
            name: 'key',
            type: 'varchar(255)',
          },
          {
            name: 'diarist_id',
            type: 'char(36)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'diarist_pix_data',
      new TableForeignKey({
        columnNames: ['diarist_id'],
        referencedTableName: 'diarists',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarist_pix_data');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('diarist_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarist_pix_data', foreignKey);
      }
    }

    await queryRunner.dropTable('diarist_pix_data');
  }
}
