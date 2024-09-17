import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropDiaristPaidAsaasFeeField1693234554131
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('diarists', 'paid_asaas_fee');
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    //
  }
}
