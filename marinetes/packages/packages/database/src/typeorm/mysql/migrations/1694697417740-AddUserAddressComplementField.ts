import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserAddressComplementField1694697417740
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_adresses',
      new TableColumn({
        name: 'comlpement',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_adresses', 'comlpement');
  }
}
