import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserAddressComplementField1694719456303
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('user_adresses', 'comlpement', 'complement');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('user_adresses', 'complement', 'comlpement');
  }
}
