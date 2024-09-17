import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DiaristPaidAsaasFeeField1692823416576
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'diarists',
      new TableColumn({
        name: 'paid_asaas_fee',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('diarists', 'paid_asaas_fee');
  }
}
