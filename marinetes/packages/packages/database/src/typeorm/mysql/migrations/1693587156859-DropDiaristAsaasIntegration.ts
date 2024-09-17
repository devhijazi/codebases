import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class DropDiaristAsaasIntegration1693587156859
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('diarists');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        ({ columnNames }) => columnNames.indexOf('asaas_integration_id') !== -1,
      );

      if (foreignKey) {
        await queryRunner.dropForeignKey('diarists', foreignKey);
      }
    }

    await queryRunner.dropColumn('diarists', 'asaas_integration_id');

    await queryRunner.dropTable('diarist_asaas_integration');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_asaas_integration',
        columns: [
          {
            name: 'id',
            type: 'char(36)',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'account_id',
            type: 'varchar(255)',
          },
          {
            name: 'wallet_id',
            type: 'varchar(255)',
          },
          {
            name: 'api_key',
            type: 'varchar(255)',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'asaas_integration_id',
        type: 'char(36)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'diarists',
      new TableForeignKey({
        referencedTableName: 'diarist_asaas_integration',
        columnNames: ['asaas_integration_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }
}
