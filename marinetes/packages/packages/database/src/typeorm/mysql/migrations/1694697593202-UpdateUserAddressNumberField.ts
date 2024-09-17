import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserAddressNumberField1694697593202
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user_adresses',
      'number',
      new TableColumn({
        name: 'number',
        type: 'varchar(255)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'schedules',
      'number',
      new TableColumn({
        name: 'number',
        type: 'int(3)',
      }),
    );
  }
}
