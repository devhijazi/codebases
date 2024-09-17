import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class DiaristAsaasIntegration1692212797667
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('diarist_asaas_integration');
  }
}
