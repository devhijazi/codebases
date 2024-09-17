import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class DiaristStripeIntegrationCreate1667418512147
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'diarist_stripe_integration',
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('diarist_stripe_integration');
  }
}
