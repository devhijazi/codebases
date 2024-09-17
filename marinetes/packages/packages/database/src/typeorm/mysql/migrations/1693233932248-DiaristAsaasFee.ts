import {
  MigrationInterface,
  Table,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class DiaristAsaasFee1693233932248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_asaas_fee',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'charge_id',
            type: 'varchar(255)',
          },
          {
            name: 'paid',
            type: 'boolean',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'asaas_fee_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'diarists',
      new TableForeignKey({
        referencedTableName: 'diarist_asaas_fee',
        columnNames: ['asaas_fee_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarists');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('asaas_fee_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarists', foreignKey);
      }
    }

    await queryRunner.dropColumn('diarists', 'asaas_fee_id');

    await queryRunner.dropTable('diarist_asaas_fee');
  }
}
