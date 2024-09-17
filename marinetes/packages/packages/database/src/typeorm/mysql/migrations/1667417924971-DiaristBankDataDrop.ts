import {
  MigrationInterface,
  Table,
  TableColumn,
  TableForeignKey,
  QueryRunner,
} from 'typeorm';

export class DiaristBankDataDrop1667417924971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.dropTable('diarist_bankdata');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_bankdata',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'stripe_account_id',
            type: 'varchar(255)',
          },
          {
            name: 'bank_number',
            type: 'varchar(255)',
          },
          {
            name: 'agency',
            type: 'varchar(255)',
          },
          {
            name: 'account',
            type: 'varchar(255)',
          },
        ],
      }),
      true,
    );

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
}
