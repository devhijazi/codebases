import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTableToUserTransfers1694005934194
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user_transfer', 'user_transfers');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user_transfers', 'user_transfer');
  }
}
