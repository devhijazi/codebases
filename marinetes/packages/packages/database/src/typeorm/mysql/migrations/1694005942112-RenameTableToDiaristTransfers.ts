import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTableToDiaristTransfers1694005942112
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('diarist_transfer', 'diarist_transfers');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('diarist_transfers', 'diarist_transfer');
  }
}
