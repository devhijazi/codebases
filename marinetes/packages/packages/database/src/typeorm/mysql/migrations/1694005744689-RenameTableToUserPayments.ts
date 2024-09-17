import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTableToUserPayments1694005744689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('payments', 'user_payments');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user_payments', 'payments');
  }
}
